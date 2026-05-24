import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSessionProvider from "@/components/dashboard/DashboardSessionProvider";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import "@/app/dashboard/dashboard.css";

type DashboardUser = {
  name?: string | null;
  email?: string | null;
  role?: string;
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/dashboard/login");
  const user = session.user as DashboardUser | undefined;

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
