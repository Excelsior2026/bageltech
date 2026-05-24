"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
  user: { name: string; email: string; role: string };
}

const navItems = [
  { href: "/dashboard", label: "Monitor", icon: "◉", roles: ["super_admin", "reviewer", "observer"] },
  { href: "/dashboard/reviews", label: "Reviews", icon: "⚑", roles: ["super_admin", "reviewer"] },
  { href: "/dashboard/repository", label: "Repository", icon: "□", roles: ["super_admin"] },
  { href: "/dashboard/config", label: "Config", icon: "⚙", roles: ["super_admin"] },
  { href: "/dashboard/users", label: "Users", icon: "◈", roles: ["super_admin"] },
];

const roleLabel: Record<string, string> = {
  super_admin: "Super Admin",
  reviewer: "Reviewer",
  observer: "Observer",
};

const roleBadgeColor: Record<string, string> = {
  super_admin: "badge-red",
  reviewer: "badge-blue",
  observer: "badge-gray",
};

export default function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();

  const visibleItems = navItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside style={{
      width: "220px",
      minWidth: "220px",
      background: "#13151e",
      borderRight: "1px solid #2d3142",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 0",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: "1px solid #2d3142" }}>
        <p style={{ fontSize: "0.7rem", color: "#9aa0a6", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.25rem" }}>
          TruePresence
        </p>
        <p style={{ fontSize: "1rem", fontWeight: 500, color: "#e8eaed", margin: 0 }}>
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem" }}>
        {visibleItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.6rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                color: isActive ? "#e8eaed" : "#9aa0a6",
                background: isActive ? "#1a1d27" : "transparent",
                textDecoration: "none",
                marginBottom: "0.125rem",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "0.75rem" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #2d3142" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "#e8eaed", margin: "0 0 0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.name}
        </p>
        <p style={{ fontSize: "0.7rem", color: "#9aa0a6", margin: "0 0 0.625rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.email}
        </p>
        <span className={`badge ${roleBadgeColor[user.role] || "badge-gray"}`} style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          {roleLabel[user.role] || user.role}
        </span>
        <br />
        <button
          onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
          style={{
            background: "none",
            border: "1px solid #2d3142",
            color: "#9aa0a6",
            borderRadius: "5px",
            padding: "0.35rem 0.75rem",
            fontSize: "0.75rem",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
