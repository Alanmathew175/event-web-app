import { auth } from "@/auth";
import { LoginButton } from "@/components/login-button";
import { SignOutButton } from "@/components/signout-button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="container">
      <header className="header">
        <h1>Google Calendar Call Reminder</h1>
        {session && (
          <div>
            <Link href="/dashboard" className="button">
              Dashboard
            </Link>
            <span style={{ margin: "0 10px" }}></span>
            <SignOutButton />
          </div>
        )}
      </header>

      <main>
        {session ? (
          <div className="card">
            <h2>Welcome, {session.user?.name}</h2>
            <p>You are signed in with Google!</p>
            <Link href="/dashboard">
              <button className="button">Go to Dashboard</button>
            </Link>
          </div>
        ) : (
          <div className="card">
            <h2>Sign in to get started</h2>
            <p>
              This application allows you to set up automatic phone call
              reminders for your Google Calendar events.
            </p>
            <LoginButton />
          </div>
        )}
      </main>
    </div>
  );
}
