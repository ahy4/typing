import { useState } from "react";
import { loadReplays } from "../lib/storage";
import type { SessionRecord } from "../lib/types";
import { HeatmapView } from "./HeatmapView";
import { ReplayPlayer } from "./ReplayPlayer";
import { SessionChart } from "./SessionChart";

interface Props {
  sessions: SessionRecord[];
  onBack: () => void;
  onClear: () => void;
}

export function StatsScreen({ sessions, onBack, onClear }: Props) {
  const [tab, setTab] = useState<"overview" | "heatmap" | "replays">("overview");
  const [selectedReplayId, setSelectedReplayId] = useState<string | null>(null);

  const replays = loadReplays();
  const selectedReplay = selectedReplayId ? replays.find((r) => r.id === selectedReplayId) : null;

  if (selectedReplay) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0a] p-8">
        <ReplayPlayer replay={selectedReplay} onClose={() => setSelectedReplayId(null)} />
      </div>
    );
  }

  const bestWpm = sessions.length > 0 ? Math.max(...sessions.map((s) => s.wpm)) : 0;
  const avgWpm = sessions.length > 0 ? sessions.reduce((a, s) => a + s.wpm, 0) / sessions.length : 0;
  const avgAcc = sessions.length > 0 ? sessions.reduce((a, s) => a + s.accuracy, 0) / sessions.length : 0;

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-200 font-mono text-sm transition-colors flex items-center gap-2"
        >
          ← BACK
        </button>
        <h1 className="font-mono text-lg text-gray-300 uppercase tracking-widest">Statistics</h1>
        <button
          onClick={() => { if (confirm("Clear all data?")) onClear(); }}
          className="text-red-800 hover:text-red-400 font-mono text-xs transition-colors"
        >
          RESET DATA
        </button>
      </div>

      {/* Summary row */}
      <div className="flex gap-8 px-8 py-4 border-b border-gray-900">
        {[
          { label: "Sessions", value: sessions.length, color: "#888" },
          { label: "Best WPM", value: Math.round(bestWpm), color: "#00ffff" },
          { label: "Avg WPM", value: Math.round(avgWpm), color: "#00ff88" },
          { label: "Avg Acc", value: `${Math.round(avgAcc * 100)}%`, color: "#ffaa00" },
        ].map((item) => (
          <div key={item.label}>
            <div className="font-mono text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-900">
        {(["overview", "heatmap", "replays"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors border-b-2"
            style={{
              borderColor: tab === t ? "#00ffff" : "transparent",
              color: tab === t ? "#00ffff" : "#555",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {tab === "overview" && (
          <div className="max-w-lg">
            <SessionChart sessions={sessions} />
            {sessions.length > 0 && (
              <div className="mt-8 flex flex-col gap-2">
                <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Recent Sessions</h3>
                {[...sessions].reverse().slice(0, 10).map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between items-center py-2 border-b border-gray-900 text-sm font-mono"
                  >
                    <span className="text-gray-600">
                      {new Date(s.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-cyan-400">{Math.round(s.wpm)} WPM</span>
                    <span className="text-green-400">{Math.round(s.accuracy * 100)}%</span>
                    <span className="text-gray-600">{s.sentences} sent</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === "heatmap" && <HeatmapView sessions={sessions} />}
        {tab === "replays" && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Saved Replays</h3>
            {replays.length === 0 && (
              <p className="text-gray-600 text-sm">No replays yet.</p>
            )}
            {[...replays].reverse().map((r) => (
              <div
                key={r.id}
                className="flex justify-between items-center py-3 px-4 bg-gray-950 border border-gray-800 rounded cursor-pointer hover:border-gray-600 transition-colors"
                onClick={() => setSelectedReplayId(r.id)}
              >
                <span className="text-gray-500 text-xs font-mono">
                  {new Date(r.timestamp).toLocaleString()}
                </span>
                <span className="text-cyan-400 font-mono">{Math.round(r.wpm)} WPM</span>
                <span className="text-green-400 font-mono">{Math.round(r.accuracy * 100)}%</span>
                <span className="text-gray-500 text-xs font-mono">▶ WATCH</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
