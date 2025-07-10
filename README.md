# resilient-email-service

Hey there! I’m Bhushan Ingale, and this is a fault-tolerant, backend-focused email service built using **Node.js** and **Express**. This project was developed as part of an internship assignment to simulate a real-world email system with key reliability features.

---

## Live Project

- **Live Demo**: [https://resilient-email-service.onrender.com](https://resilient-email-service-u3sl.onrender.com)
- **GitHub Repo**: [https://github.com/ingalebhushan/resilient-email-service](https://github.com/ingalebhushan/resilient-email-service)

---

## About the Project

This service mimics a reliable email-sending system using **two mock email providers**. It’s designed to be robust — meaning if one provider fails, the system retries with exponential backoff and switches to the second provider if needed.

It also supports:
- ✅ Idempotency (avoiding duplicate sends)
- ✅ Rate limiting (to prevent spamming)
- ✅ Status tracking for every email
- ✅ Clean code that follows SOLID principles
- ✅ Fully deployed to the cloud

---

## Key Features

- Retry mechanism with exponential backoff
- Fallback between mock email providers
- Idempotent delivery (based on `to + subject`)
- Rate limiting (1 email per recipient per 10 seconds)
- Real-time status tracking
- Minimal external libraries
- Cloud deployment (Render)

---

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- Render (for deployment)
- Postman / curl (for API testing)

---

## API Endpoints

### `POST /send` — Send an Email

Sends an email using the resilient mechanism.

**Request Body:**
```json
{
  "to": "ash@example.com",
  "subject": "Hey Ash!",
  "body": "Just saying hi from the cloud ☁️"
}
Success Response:

{
  "success": true,
  "status": "SUCCESS"
}
GET /status — Check Email Status
Use this to check whether an email was successfully sent.

Example Request:

GET /status?to=ash@example.com&subject=Hey%20Ash!
Response:

{
  "to": "ash@example.com",
  "subject": "Hey Ash!",
  "status": "SUCCESS"
}

🏗 Folder Structure
email-service/
├── providers/        # Mock email providers
├── services/         # Email logic (fallback, retry, send)
├── utils/            # Helper functions (rate limiter, backoff)
├── statusStore.js    # In-memory status tracking
├── server.js         # Main Express server
├── package.json
└── README.md
🧪 How to Run Locally
To try it out on your local machine:

git clone https://github.com/ingalebhushan/resilient-email-service
cd resilient-email-service
npm install
node server.js
Then test using Postman:

POST http://localhost:3000/send

GET http://localhost:3000/status?to=...&subject=...

🧠 Testing Tips
Try sending the same email twice — it won't be resent due to idempotency.

Send two emails to the same address quickly — rate limiter will block the second.

Simulate failure in one provider — retry and fallback will kick in.

Use /status to track what happened to your email.
