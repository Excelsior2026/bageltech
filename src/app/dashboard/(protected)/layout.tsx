import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSessionProvider from "@/components/dashboard/DashboardSessionProvider";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import "@/app/dashboard/dashboard.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/dashboard/login");
  const user = session.user;

  return (
    <DashboardSessionProvider session={session}>
      <div className="dash-root">
        <DashboardSidebar
          user={{
            name: user?.name ?? "",
            email: user?.email ?? "",
            role: user?.role ?? "observer",
          }}
        />
        <main className="dash-main">{children}</main>
      </div>
    </DashboardSessionProvider>
  );
}
