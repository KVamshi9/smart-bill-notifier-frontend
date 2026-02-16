# Smart Bill Notifier — Frontend

A React dashboard that allows users to manage recurring bills and receive automated WhatsApp reminders powered by a cloud backend scheduler.

---

## Live Application

https://smart-bill-notifier.vercel.app

Backend API
https://smart-bill-backend-1.onrender.com

---

## Features

• Add recurring bills
• Edit and delete bills
• Automatic next due date handling
• Real-time bill list updates
• Cloud connected backend
• Responsive dashboard UI

---

## How It Works

The frontend collects bill information and sends it to the backend API.

All scheduling and reminder logic runs on the server, ensuring reminders work even if the browser is closed.

Frontend responsibilities:

• User interaction
• Display bill data
• Trigger API requests
• Show updates instantly

---

## Tech Stack

React (Class Components)
Fetch API
CSS
Environment Variables
Vercel Hosting

---

## Environment Setup

Create `.env` file in project root:

REACT_APP_API=https://smart-bill-backend-1.onrender.com

---

## Run Locally

npm install
npm start

App runs on:
http://localhost:3000

---

## Build Production Version

npm run build

---

## Design Decision

The frontend is intentionally lightweight and stateless.
All reminder logic lives in the backend cron scheduler to ensure reliability and continuous execution.

---

## Folder Structure

src/
components/ → UI components
App.js → main dashboard logic
index.js → app entry point

---

## Author

Vamshi K
