# Smart Bill Notifier — Frontend

A React dashboard that allows users to manage recurring bills with secure login and automated WhatsApp reminders powered by a cloud backend scheduler.

---

## Live Application

Frontend
https://smart-bill-notifier.vercel.app

Backend API
https://smart-bill-backend-1.onrender.com

---

## Features

• User login authentication
• Protected dashboard access
• Add recurring bills
• Edit and delete bills
• Automatic next due date calculation
• Per-user bill isolation
• Cloud-based WhatsApp reminders
• Responsive interface

---

## Authentication Behavior

After login, the backend returns a JWT token.

The frontend stores the token in localStorage and attaches it to every API request:

Authorization: Bearer <token>

If the token is missing or invalid → backend rejects the request → user redirected to login.

So the server controls access, not the UI.

---

## How It Works

The frontend sends bill actions to the backend API.

All scheduling and reminder logic runs on the server, ensuring reminders work even when the browser is closed.

Frontend responsibilities:

• Collect user input
• Attach authentication token
• Display user-specific bills
• React to authorization failures

---

## Tech Stack

React (Class Components)
Fetch API
JWT Authentication
CSS
Environment Variables
Vercel Hosting

---

## Environment Setup

Create `.env` in project root:

REACT_APP_API=https://smart-bill-backend-1.onrender.com

---

## Run Locally

npm install
npm start

App runs on
http://localhost:3000

---

## Build Production Version

npm run build

---

## Design Decision

The frontend is intentionally lightweight and stateless.
Authentication and scheduling are fully handled by the backend to ensure reliability and continuous execution.

---

## Folder Structure

src/
Login.js
Register.js
Dashboard.js
App.js
index.js

---

## System Concept

Browser = interface
Server = authority

Reminders continue even if the user logs out because the scheduler runs independently in the backend.

---

## Author

Vamshi K

