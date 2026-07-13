"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { apiRequest, getErrorMessage } from "@/lib/api";

type Thresholds = {
  ban: number;
  kick: number;
  review: number;
};

type DetectorConfiguration = Record<string, { enabled?: boolean }>;

interface ConfigResponse {
  tenant_id?: string;
  configuration?: {
    detectors?: DetectorConfiguration;
    response_thresholds?: Partial<Thresholds>;
  };
}

const DETECTORS = [
  { key: "copyright_violation", label: "Copyright violation", tier: "policy" },
  { key: "torrent_sharing",     label: "Torrent sharing",     tier: "policy" },
  { key: "crypto_mining",       label: "Crypto mining",       tier: "policy" },
  { key: "remote_access",       label: "Remote access / VNC", tier: "policy" },
];

const CORE = [
  { key: "child_exploitation", label: "Child exploitation (CSAM)" },
  { key: "illegal_content",    label: "Illegal content" },
];

export default function ConfigPage() {
  const { data: session } = useSession();
  const [config, setConfig] = useState<ConfigResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [detectorState, setDetectorState] = useState<Record<string, boolean>>({});
  const [thresholds, setThresholds] = useState({ ban: 0.8, kick: 0.6, review: 0.4 });

  const token = session?.user?.access_token;

  const fetchConfig = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiRequest<ConfigResponse>("/telegram/config", token);
      setConfig(data);
      const detectors = data.configuration?.detectors || {};
      const state: Record<string, boolean> = {};
      DETECTORS.forEach((d) => {
        state[d.key] = detectors[d.key]?.enabled ?? true;
      });
      setDetectorState(state);
      const t = data.configuration?.response_thresholds || {};
      setThresholds({
        ban:    t.ban    ?? 0.8,
        kick:   t.kick   ?? 0.6,
        review: t.review ?? 0.4,
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  async function handleSave() {
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      const detectors: Record<string, { enabled: boolean }> = {};
      DETECTORS.forEach((d) => {
        detectors[d.key] = { enabled: detectorState[d.key] };
      });
      await apiRequest("/telegram/config/detectors", token, {
        method: "POST",
        body: JSON.stringify({ detectors, response_thresholds: thresholds }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="dash-loading">Loading config...</div>;

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Configuration</h1>
        <p className="dash-page-sub">Detector settings and action thresholds · Tenant: {config?.tenant_id || "default"}</p>
      </div>

      {error && <div className="dash-error">{error}</div>}

      {/* Core detectors — always on */}
      <p className="dash-section-title">Core detectors — always enabled</p>
      <div className="dash-table-wrap" style={{ marginBottom: "2rem" }}>
        {CORE.map((d) => (
          <div key={d.key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.875rem 1.25rem", borderBottom: "1px solid #1e2130",
          }}>
            <div>
              <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500 }}>{d.label}</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#9aa0a6" }}>Cannot be disabled — required by policy</p>
            </div>
            <span className="badge badge-red">Always on</span>
          </div>
        ))}
      </div>

      {/* Policy detectors */}
      <p className="dash-section-title">Policy detectors — configurable</p>
      <div className="dash-table-wrap" style={{ marginBottom: "2rem" }}>
        {DETECTORS.map((d, i) => (
          <div key={d.key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.875rem 1.25rem",
            borderBottom: i < DETECTORS.length - 1 ? "1px solid #1e2130" : "none",
          }}>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>{d.label}</p>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.8rem", color: "#9aa0a6" }}>
              <input
                type="checkbox"
                checked={detectorState[d.key] ?? true}
                onChange={(e) => setDetectorState({ ...detectorState, [d.key]: e.target.checked })}
                style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
              />
              {detectorState[d.key] ? "Enabled" : "Disabled"}
            </label>
          </div>
        ))}
      </div>

      {/* Thresholds */}
      <p className="dash-section-title">Action thresholds</p>
      <div className="dash-table-wrap" style={{ marginBottom: "2rem" }}>
        {(["ban", "kick", "review"] as const).map((key, i, arr) => (
          <div key={key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.875rem 1.25rem", gap: "1rem",
            borderBottom: i < arr.length - 1 ? "1px solid #1e2130" : "none",
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 0.2rem", fontSize: "0.875rem", fontWeight: 500, textTransform: "capitalize" }}>{key}</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#9aa0a6" }}>
                Confidence must exceed {(thresholds[key] * 100).toFixed(0)}% to trigger {key}
              </p>
            </div>
            <input
              type="range"
              min={0.1} max={1.0} step={0.05}
              value={thresholds[key]}
              onChange={(e) => setThresholds({ ...thresholds, [key]: parseFloat(e.target.value) })}
              style={{ width: "140px" }}
            />
            <span style={{ fontSize: "0.875rem", fontWeight: 500, minWidth: "2.5rem", textAlign: "right" }}>
              {(thresholds[key] * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button className="btn btn-blue" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save configuration"}
        </button>
        {saved && <span style={{ fontSize: "0.8rem", color: "#81c995" }}>✓ Saved</span>}
      </div>
    </div>
  );
}
