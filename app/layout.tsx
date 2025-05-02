import { auth } from "@/auth";
import { SessionProvider } from "@/components/session-provider";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Google Calendar Call Reminder",
  description: "Get phone call reminders for your Google Calendar events",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
