"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { apiRequest, getErrorMessage } from "@/lib/api";
import type { DashboardReview, HealthResponse, ReviewsResponse } from "@/lib/dashboard-types";

export default function MonitorPage() {
  const { data: session } = useSession();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [reviews, setReviews] = useState<DashboardReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = session?.user?.access_token;

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const [healthData, reviewData] = await Promise.all([
        apiRequest<HealthResponse>("/health", token),
        apiRequest<ReviewsResponse>("/telegram/reviews", token),
      ]);
      setHealth(healthData);
      setReviews(reviewData.pending_reviews || []);
      setError("");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const pending = reviews.filter((r) => r.status === "pending").length;
  const resolved = reviews.filter((r) => r.status === "resolved").length;

  if (loading) return <div className="dash-loading">Loading...</div>;

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Monitor</h1>
        <p className="dash-page-sub">Live system status — refreshes every 15 seconds</p>
      </div>

      {error && <div className="dash-error">{error}</div>}

      {/* Stats */}
      <div className="dash-stat-grid">
        <div className="dash-stat">
          <div className={`dash-stat-value ${health?.status === "ok" ? "green" : "red"}`}>
            {health?.status === "ok" ? "Online" : "Degraded"}
          </div>
          <div className="dash-stat-label">System status</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value amber">{pending}</div>
          <div className="dash-stat-label">Pending reviews</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value blue">{resolved}</div>
          <div className="dash-stat-label">Resolved today</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value green">{reviews.length}</div>
          <div className="dash-stat-label">Total cases</div>
        </div>
      </div>

      {/* Recent activity */}
      <p className="dash-section-title">Recent review activity</p>
      <div className="dash-table-wrap">
        {reviews.length === 0 ? (
          <div className="dash-empty">No activity yet — system is monitoring</div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Chat</th>
                <th>Threats</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {reviews.slice(0, 20).map((r) => (
                <tr key={r.review_id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                    {r.user_info?.username
                      ? `@${r.user_info.username}`
                      : r.user_info?.id || "—"}
                  </td>
                  <td style={{ color: "#9aa0a6", fontSize: "0.8rem" }}>
                    {r.chat_info?.title || r.chat_info?.id || "—"}
                  </td>
                  <td>
                    {(r.threat_categories || []).length > 0 ? (
                      <span className="badge badge-red">
                        {r.threat_categories.join(", ")}
                      </span>
                    ) : (
                      <span className="badge badge-gray">none</span>
                    )}
                  </td>
                  <td style={{ fontSize: "0.8rem" }}>
                    {r.action?.confidence
                      ? `${(r.action.confidence * 100).toFixed(0)}%`
                      : "—"}
                  </td>
                  <td>
                    <span className={`badge ${r.status === "pending" ? "badge-amber" : "badge-green"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ color: "#9aa0a6", fontSize: "0.75rem" }}>
                    {r.created_at
                      ? new Date(r.created_at).toLocaleString()
                      : "—"}
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
