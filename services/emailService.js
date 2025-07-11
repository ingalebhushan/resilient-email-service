const ProviderA = require('../providers/providerA');
const ProviderB = require('../providers/providerB');
const Logger = require('../utils/logger');
const RateLimiter = require('../utils/rateLimiter');
const statusStore = require('../statusStore');

const rateLimiter = new RateLimiter(1, 10000); // max 5 emails per 10 sec
const providers = [ProviderA, ProviderB];

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendEmail(to, subject, body) {
  const key = `${to}:${subject}`;

  // Check for idempotency
  if (statusStore.isDuplicate(to, subject)) {
    Logger.warn(`[IDEMPOTENT] Email already sent to ${to}`);
    return { success: false, status: 'DUPLICATE' };
  }

  // Rate limiting
  if (!rateLimiter.allow()) {
    Logger.error(`[RATE LIMIT] Too many requests`);
    return { success: false, status: 'RATE_LIMITED' };
  }

  statusStore.setStatus(to, subject, 'PENDING');

  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    Logger.info(`Using Provider ${i + 1}`);

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const success = await provider.sendEmail(to, subject, body);

        if (success) {
          Logger.success(`Email sent to ${to} via Provider ${i + 1}`);
          statusStore.setStatus(to, subject, 'SUCCESS');
          statusStore.markSent(to, subject);
          return { success: true, status: 'SUCCESS' };
        } else {
          Logger.warn(`Provider ${i + 1} failed attempt ${attempt + 1}`);
        }
      } catch (err) {
        Logger.error(`Error on Provider ${i + 1}: ${err.message}`);
      }

      const backoffTime = Math.pow(2, attempt) * 100;
      Logger.info(`Retrying after ${backoffTime}ms`);
      await wait(backoffTime);
    }

    Logger.warn(`Provider ${i + 1} failed all attempts. Switching...`);
  }

  Logger.error(`All providers failed. Email not sent.`);
  statusStore.setStatus(to, subject, 'FAILED');
  return { success: false, status: 'FAILED' };
}

module.exports = {
  sendEmail,
};