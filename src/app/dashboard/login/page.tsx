"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f1117",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "380px",
        background: "#1a1d27",
        border: "1px solid #2d3142",
        borderRadius: "12px",
        padding: "2.5rem 2rem",
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: "#9aa0a6", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.375rem" }}>
            TruePresence
          </p>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 500, color: "#e8eaed", margin: 0 }}>
            Admin sign in
          </h1>
        </div>

        {error && (
          <div style={{
            background: "rgba(234,67,53,0.12)",
            border: "1px solid rgba(234,67,53,0.3)",
            color: "#f28b82",
            borderRadius: "7px",
            padding: "0.75rem 1rem",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#9aa0a6", marginBottom: "0.375rem" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                background: "#13151e",
                border: "1px solid #2d3142",
                borderRadius: "6px",
                padding: "0.625rem 0.875rem",
                color: "#e8eaed",
                fontSize: "0.875rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#9aa0a6", marginBottom: "0.375rem" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                background: "#13151e",
                border: "1px solid #2d3142",
                borderRadius: "6px",
                padding: "0.625rem 0.875rem",
                color: "#e8eaed",
                fontSize: "0.875rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#4285f4",
              color: "#fff",
              border: "none",
              borderRadius: "7px",
              padding: "0.75rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
