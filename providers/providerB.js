const ProviderB = {
  sendEmail: async (to, subject, body) => {
    console.log(`[Provider B] Trying to send email to ${to}`);
    const success = Math.random() > 0.3; // 70% chance of success
    await new Promise((res) => setTimeout(res, 500)); // simulate delay
    return success;
  },
};

module.exports = ProviderB;