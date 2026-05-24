import { auth } from "@/lib/auth";
import RepositoryManager from "@/components/dashboard/RepositoryManager";

type RepositorySessionUser = {
  role?: string;
};

export default async function DashboardRepositoryPage() {
  const session = await auth();
  const user = session?.user as RepositorySessionUser | undefined;

  if (user?.role !== "super_admin") {
    return (
      <div>
        <div className="dash-page-header">
          <h1 className="dash-page-title">Document repository</h1>
          <p className="dash-page-sub">Upload access is limited to super admins.</p>
        </div>
        <div className="dash-empty">You do not have permission to manage repository documents.</div>
      </div>
    );
  }

  return <RepositoryManager />;
}
