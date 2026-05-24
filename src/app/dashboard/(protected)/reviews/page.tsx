"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { apiRequest } from "@/lib/api";

const DECISIONS = ["allow", "warn", "kick", "ban"];

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acting, setActing] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const token = (session?.user as any)?.access_token;

  const fetchReviews = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiRequest("/telegram/reviews", token);
      setReviews(data.pending_reviews || []);
      setError("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 10000);
    return () => clearInterval(interval);
  }, [fetchReviews]);

  async function handleDecision(reviewId: string, decision: string) {
    if (!token) return;
    setActing(reviewId);
    try {
      await apiRequest(`/telegram/reviews/${reviewId}/resolve`, token, {
        method: "POST",
        body: JSON.stringify({ decision, notes: notes[reviewId] || "" }),
      });
      await apiRequest(`/telegram/reviews/${reviewId}/execute`, token, {
        method: "POST",
      });
      await fetchReviews();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setActing(null);
    }
  }

  const pending = reviews.filter((r) => r.status === "pending");
  const resolved = reviews.filter((r) => r.status === "resolved");

  if (loading) return <div className="dash-loading">Loading reviews...</div>;

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Review queue</h1>
        <p className="dash-page-sub">
          {pending.length} pending · {resolved.length} resolved
        </p>
      </div>

      {error && <div className="dash-error">{error}</div>}

      {/* Pending */}
      <p className="dash-section-title">Pending action</p>
      <div className="dash-table-wrap" style={{ marginBottom: "2rem" }}>
        {pending.length === 0 ? (
          <div className="dash-empty">No pending reviews — queue is clear</div>
        ) : (
          pending.map((r) => (
            <div key={r.review_id} style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid #1e2130",
            }}>
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <p style={{ margin: "0 0 0.2rem", fontWeight: 500, fontSize: "0.9rem" }}>
                    {r.user_info?.username
                      ? `@${r.user_info.username}`
                      : `User ${r.user_info?.id || "unknown"}`}
                    {r.user_info?.first_name ? ` · ${r.user_info.first_name}` : ""}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#9aa0a6" }}>
                    {r.chat_info?.title || "Unknown group"} · {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                  {(r.threat_categories || []).map((t: string) => (
                    <span key={t} className="badge badge-red">{t.replace(/_/g, " ")}</span>
                  ))}
                  {(r.risk_factors || []).map((f: string) => (
                    <span key={f} className="badge badge-amber">{f.replace(/_/g, " ")}</span>
                  ))}
                </div>
              </div>

              {/* Message preview */}
              {r.message_text && (
                <div style={{
                  background: "#13151e",
                  border: "1px solid #2d3142",
                  borderRadius: "6px",
                  padding: "0.625rem 0.875rem",
                  fontSize: "0.8rem",
                  color: "#9aa0a6",
                  marginBottom: "0.875rem",
                  fontFamily: "var(--font-mono)",
                  wordBreak: "break-word",
                }}>
                  {r.message_text.slice(0, 300)}{r.message_text.length > 300 ? "..." : ""}
                </div>
              )}

              {/* Confidence */}
              <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", color: "#9aa0a6" }}>
                Confidence: <strong style={{ color: "#e8eaed" }}>{r.action?.confidence ? `${(r.action.confidence * 100).toFixed(0)}%` : "—"}</strong>
                &nbsp;· Action suggested: <strong style={{ color: "#e8eaed" }}>{r.action?.action || "—"}</strong>
              </p>

              {/* Notes */}
              <input
                type="text"
                placeholder="Optional notes..."
                value={notes[r.review_id] || ""}
                onChange={(e) => setNotes({ ...notes, [r.review_id]: e.target.value })}
                style={{
                  width: "100%",
                  background: "#13151e",
                  border: "1px solid #2d3142",
                  borderRadius: "5px",
                  padding: "0.5rem 0.75rem",
                  color: "#e8eaed",
                  fontSize: "0.8rem",
                  marginBottom: "0.75rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button className="btn btn-green" disabled={acting === r.review_id} onClick={() => handleDecision(r.review_id, "allow")}>Allow</button>
                <button className="btn btn-amber" disabled={acting === r.review_id} onClick={() => handleDecision(r.review_id, "warn")}>Warn</button>
                <button className="btn btn-ghost" disabled={acting === r.review_id} onClick={() => handleDecision(r.review_id, "kick")}>Kick</button>
                <button className="btn btn-red" disabled={acting === r.review_id} onClick={() => handleDecision(r.review_id, "ban")}>Ban</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <>
          <p className="dash-section-title">Resolved</p>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Decision</th>
                  <th>Notes</th>
                  <th>Resolved</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map((r) => (
                  <tr key={r.review_id}>
                    <td style={{ fontSize: "0.8rem" }}>
                      {r.user_info?.username ? `@${r.user_info.username}` : r.user_info?.id || "—"}
                    </td>
                    <td>
                      <span className={`badge ${
                        r.admin_decision === "ban" ? "badge-red" :
                        r.admin_decision === "kick" ? "badge-amber" :
                        r.admin_decision === "allow" ? "badge-green" : "badge-gray"
                      }`}>{r.admin_decision}</span>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#9aa0a6" }}>{r.admin_notes || "—"}</td>
                    <td style={{ fontSize: "0.75rem", color: "#9aa0a6" }}>
                      {r.resolved_at ? new Date(r.resolved_at).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
