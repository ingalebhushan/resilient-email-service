const ProviderA = {
  sendEmail: async (to, subject, body) => {
    console.log(`[Provider A] Trying to send email to ${to}`);
    const success = Math.random() > 0.2; // 80% chance of success
    await new Promise((res) => setTimeout(res, 500)); // simulate delay
    return success;
  },
};

module.exports = ProviderA;