const statusMap = new Map();
const sentEmails = new Set();

function getKey(to, subject) {
  return `${to}:${subject}`;
}

module.exports = {
  setStatus: (to, subject, status) => {
    statusMap.set(getKey(to, subject), status);
  },
  getStatus: (to, subject) => {
    return statusMap.get(getKey(to, subject)) || 'NOT_FOUND';
  },
  isDuplicate: (to, subject) => {
    return sentEmails.has(getKey(to, subject));
  },
  markSent: (to, subject) => {
    sentEmails.add(getKey(to, subject));
  },
};