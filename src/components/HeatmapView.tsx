import type { SessionRecord } from "../lib/types";

interface Props {
  sessions: SessionRecord[];
}

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export function HeatmapView({ sessions }: Props) {
  // Aggregate all key stats across sessions
  const combined = new Map<string, { count: number; errors: number; totalMs: number }>();
  for (const s of sessions) {
    for (const ks of s.keyStats) {
      const existing = combined.get(ks.key) ?? { count: 0, errors: 0, totalMs: 0 };
      combined.set(ks.key, {
        count: existing.count + ks.count,
        errors: existing.errors + ks.errors,
        totalMs: existing.totalMs + ks.totalMs,
      });
    }
  }

  function getColor(key: string) {
    const d = combined.get(key);
    if (!d || d.count === 0) return { bg: "#111", text: "#333" };
    const errRate = d.errors / d.count;
    const avgMs = d.totalMs / Math.max(d.count, 1);
    const speed = Math.max(0, Math.min(1, 1 - avgMs / 500));
    if (errRate > 0.25)
      return { bg: `rgba(220,50,50,${0.3 + errRate * 0.6})`, text: "#ff8888" };
    return {
      bg: `rgba(0,${Math.round(100 + speed * 155)},${Math.round(150 + speed * 105)},${0.15 + speed * 0.5})`,
      text: `rgba(100,${Math.round(200 + speed * 55)},255,${0.6 + speed * 0.4})`,
    };
  }

  function tooltip(key: string) {
    const d = combined.get(key);
    if (!d || d.count === 0) return key;
    const avg = d.count > 0 ? Math.round(d.totalMs / d.count) : 0;
    const errPct = d.count > 0 ? Math.round((d.errors / d.count) * 100) : 0;
    return `${key}: ${d.count} hits, ${errPct}% err, ${avg}ms avg`;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm uppercase tracking-widest text-gray-500">Key Heatmap</h3>
      <div className="flex flex-col items-center gap-1.5">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            {ri === 1 && <div style={{ width: "20px" }} />}
            {ri === 2 && <div style={{ width: "40px" }} />}
            {row.map((key) => {
              const { bg, text } = getColor(key);
              return (
                <div
                  key={key}
                  title={tooltip(key)}
                  className="w-10 h-10 flex items-center justify-center rounded text-sm font-mono font-bold border border-gray-800 cursor-default"
                  style={{ background: bg, color: text }}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {sessions.length === 0 && (
        <p className="text-gray-600 text-sm text-center">No session data yet. Play some games!</p>
      )}
    </div>
  );
}
