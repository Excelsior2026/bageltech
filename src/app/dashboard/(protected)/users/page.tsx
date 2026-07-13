"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { apiRequest, getErrorMessage } from "@/lib/api";
import type { DashboardUser } from "@/lib/dashboard-types";

const ROLES = ["super_admin", "reviewer", "observer"];

type UserForm = {
  email: string;
  name: string;
  password: string;
  role: string;
  tenant_id: string;
};

type UserFormField = {
  key: keyof Pick<UserForm, "name" | "email" | "password" | "tenant_id">;
  label: string;
  type: string;
};

const USER_FORM_FIELDS: UserFormField[] = [
  { key: "name", label: "Full name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "password", label: "Password", type: "password" },
  { key: "tenant_id", label: "Tenant ID", type: "text" },
];

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<UserForm>({ email: "", name: "", password: "", role: "reviewer", tenant_id: "default" });
  const [showForm, setShowForm] = useState(false);

  const token = session?.user?.access_token;
  const currentUserId = session?.user?.id;

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiRequest<DashboardUser[]>("/auth/users", token);
      setUsers(data);
      setError("");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setCreating(true);
    try {
      await apiRequest("/auth/users", token, {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ email: "", name: "", password: "", role: "reviewer", tenant_id: "default" });
      setShowForm(false);
      await fetchUsers();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setCreating(false);
    }
  }

  async function handleRoleChange(userId: string | number, role: string) {
    if (!token) return;
    try {
      await apiRequest(`/auth/users/${userId}`, token, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      await fetchUsers();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  }

  async function handleDeactivate(userId: string | number) {
    if (!token || !confirm("Deactivate this user?")) return;
    try {
      await apiRequest(`/auth/users/${userId}`, token, { method: "DELETE" });
      await fetchUsers();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  }

  if (loading) return <div className="dash-loading">Loading users...</div>;

  return (
    <div>
      <div className="dash-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="dash-page-title">Users</h1>
          <p className="dash-page-sub">{users.length} accounts · Manage roles and access</p>
        </div>
        <button className="btn btn-blue" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add user"}
        </button>
      </div>

      {error && <div className="dash-error">{error}</div>}

      {/* Create form */}
      {showForm && (
        <div style={{
          background: "#1a1d27", border: "1px solid #2d3142", borderRadius: "10px",
          padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <p className="dash-section-title" style={{ marginBottom: "1.25rem" }}>New user</p>
          <form onSubmit={handleCreate}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {USER_FORM_FIELDS.map(({ key, label, type }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#9aa0a6", marginBottom: "0.3rem" }}>{label}</label>
                  <input
                    type={type}
                    required={key !== "tenant_id"}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: "100%", background: "#13151e", border: "1px solid #2d3142",
                      borderRadius: "5px", padding: "0.5rem 0.75rem", color: "#e8eaed",
                      fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", color: "#9aa0a6", marginBottom: "0.3rem" }}>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{
                  background: "#13151e", border: "1px solid #2d3142", borderRadius: "5px",
                  padding: "0.5rem 0.75rem", color: "#e8eaed", fontSize: "0.85rem", outline: "none",
                }}
              >
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-blue" disabled={creating}>
              {creating ? "Creating..." : "Create user"}
            </button>
          </form>
        </div>
      )}

      {/* Users table */}
      <div className="dash-table-wrap">
        {users.length === 0 ? (
          <div className="dash-empty">No users yet</div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Tenant</th>
                <th>Last login</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500, fontSize: "0.875rem" }}>{u.name}</td>
                  <td style={{ fontSize: "0.8rem", color: "#9aa0a6" }}>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      disabled={String(u.id) === String(currentUserId)}
                      style={{
                        background: "#13151e", border: "1px solid #2d3142", borderRadius: "4px",
                        padding: "0.25rem 0.5rem", color: "#e8eaed", fontSize: "0.78rem",
                      }}
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td style={{ fontSize: "0.78rem", color: "#9aa0a6" }}>{u.tenant_id}</td>
                  <td style={{ fontSize: "0.75rem", color: "#9aa0a6" }}>
                    {u.last_login ? new Date(u.last_login).toLocaleString() : "Never"}
                  </td>
                  <td>
                    <span className={`badge ${u.active ? "badge-green" : "badge-gray"}`}>
                      {u.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {u.active && String(u.id) !== String(currentUserId) && (
                      <button
                        className="btn btn-ghost"
                        style={{ fontSize: "0.75rem", padding: "0.25rem 0.625rem" }}
                        onClick={() => handleDeactivate(u.id)}
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
