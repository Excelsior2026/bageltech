"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

interface DashboardSessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export default function DashboardSessionProvider({ children, session }: DashboardSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
