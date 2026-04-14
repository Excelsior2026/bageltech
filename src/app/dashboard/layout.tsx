import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import "@/app/dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "TruePresence Admin",
  description: "TruePresence administration dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/dashboard/login");

  return (
    <div className="dash-root">
      <DashboardSidebar
        user={{
          name: session.user?.name ?? "",
          email: session.user?.email ?? "",
          role: (session.user as any)?.role ?? "observer",
        }}
      />
      <main className="dash-main">{children}</main>
    </div>
  );
}
