import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PhoneNumberForm } from "./phone-number-form";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Dashboard</h1>
        <Link href="/" className="button">
          Back to Home
        </Link>
      </header>

      <main>
        <div className="card">
          <h2>Set Up Call Reminders</h2>
          <p>
            Enter your phone number below to receive call reminders 5 minutes
            before your Google Calendar events.
          </p>

          <PhoneNumberForm
            userEmail={session.user.email as string}
            accessToken={session.idToken as string}
            refreshToken={session.refreshToken as string}
          />
        </div>

        <div className="card">
          <h2>How It Works</h2>
          <ol style={{ marginLeft: "20px", lineHeight: "1.6" }}>
            <li>We have access to read your Google Calendar events (only)</li>
            <li>Our system checks for upcoming events every 5 minutes</li>
            <li>
              When an event is about to start, you'll receive a phone call
              reminder
            </li>
            <li>
              You can update your phone number anytime from this dashboard
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
