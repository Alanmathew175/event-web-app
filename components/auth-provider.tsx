"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// With Auth.js v5, we can still use the SessionProvider from next-auth/react
// but we also have access to the new Server Components approach
