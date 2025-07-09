const express = require('express');
const { sendEmail } = require('./services/emailService');
const statusStore = require('./statusStore');

const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON body

// Health check
app.get('/', (req, res) => {
  res.send('✅ Email Service is running!');
});

// Send email endpoint
app.post('/send', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing fields: to, subject, body' });
  }

  const result = await sendEmail(to, subject, body);
  res.json(result);
});

// Check email status
app.get('/status', (req, res) => {
  const { to, subject } = req.query;
  if (!to || !subject) {
    return res.status(400).json({ error: 'Missing to or subject' });
  }

  const status = statusStore.getStatus(to, subject);
  res.json({ to, subject, status });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});