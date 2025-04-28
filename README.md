📞 Google OAuth Event Reminder App
This is a full-stack application built with Next.js and Auth.js (formerly NextAuth) that enables users to log in using Google OAuth (v3). After logging in, users can enter their mobile number, which is then used to notify them about upcoming events via Twilio phone calls. The app uses MongoDB Atlas for data persistence and a Node.js + Express.js backend to manage background jobs and calling logic.

🚀 Features
🔐 Google OAuth (v3) authentication with Auth.js

📱 Users can add their mobile number once after login

📅 Display of latest upcoming events on the login success page

☎️ Twilio integration to make automated calls 5 minutes before an event

💾 User details including refresh tokens and phone numbers stored in MongoDB Atlas

🔄 Refresh token-based login session management

🕐 A cron job runs every minute to check for upcoming events and trigger Twilio calls

🛠️ Tech Stack
Frontend: Next.js, Auth.js (Google OAuth v3)

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: Google OAuth

Phone Calls: Twilio

Job Scheduler: Node-Cron (runs every 1 minute)

🧠 How It Works
Login Flow

Users log in using Google.

On successful login, a refresh token is stored in MongoDB.

The user is prompted to enter their mobile number (one-time entry).

The homepage shows upcoming events after login.

User Restrictions

A user can only submit their phone number once.

This is enforced through database checks.

Event Notification

A cron job runs every 1 minute using Node.js and Express.js.

If a user has:

A valid refresh token

A registered phone number

And an event in the next 5 minutes

➡️ A Twilio call is triggered to the user’s phone.

Logout

On logout, the refresh token is removed from the database.

📦 Installation

git clone https://github.com/yourusername/google-oauth-event-reminder.git
cd google-oauth-event-reminder
Frontend Setup (Next.js)

cd frontend
npm install
Create a .env.local file in the frontend directory with:

env

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
NEXT_PUBLIC_API_ENDPOINT=
AUTH_TRUST_HOST=
Run the development server:

npm run dev
Backend Setup (Node.js + Express.js)

cd backend
npm install
Create a .env file in the backend directory:

env

DBURL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
TWILIO_SID=
TWILIO_TOKEN=
TWILIO_PHONE=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_REDIRCT_URL=

Start the backend server:

node index.js
The cron job will now run every 1 minute and trigger calls as needed.

📌 Notes
Ensure you have events stored with proper timestamps in your MongoDB collection.

Mobile numbers should be stored in E.164 format (e.g., +15558675309) for Twilio compatibility.

You can modify the Twilio call script to suit your event details.

✅ TODO / Improvements
Add SMS support as fallback

Admin dashboard to manage events

Email notifications
