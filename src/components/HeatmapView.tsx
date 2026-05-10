import type { InputEvent, SessionRecord } from "../lib/types";

interface Props {
  sessions?: SessionRecord[];
  replayEvents?: InputEvent[];
}

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

type KeyData = { count: number; errors: number; totalMs: number };

function buildFromSessions(sessions: SessionRecord[]): Map<string, KeyData> {
  const combined = new Map<string, KeyData>();
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
  return combined;
}

function buildFromEvents(events: InputEvent[]): Map<string, KeyData> {
  const combined = new Map<string, KeyData>();
  let lastTime = 0;
  for (const ev of events) {
    const interval = lastTime > 0 ? ev.time - lastTime : 0;
    lastTime = ev.time;
    const existing = combined.get(ev.key) ?? { count: 0, errors: 0, totalMs: 0 };
    combined.set(ev.key, {
      count: existing.count + 1,
      errors: existing.errors + (ev.correct ? 0 : 1),
      totalMs: existing.totalMs + interval,
    });
  }
  return combined;
}

export function HeatmapView({ sessions, replayEvents }: Props) {
  const combined = replayEvents
    ? buildFromEvents(replayEvents)
    : buildFromSessions(sessions ?? []);

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
    return `${key}: ${d.count}回, エラー率${errPct}%, 平均${avg}ms`;
  }

  const isEmpty = replayEvents ? replayEvents.length === 0 : (sessions ?? []).length === 0;

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
              const d = combined.get(key);
              const errPct = d && d.count > 0 ? Math.round((d.errors / d.count) * 100) : null;
              const avgMs = d && d.count > 0 ? Math.round(d.totalMs / d.count) : null;
              return (
                <div
                  key={key}
                  title={tooltip(key)}
                  className="w-12 h-12 flex flex-col items-center justify-center rounded text-sm font-mono font-bold border border-gray-800 cursor-default gap-0.5"
                  style={{ background: bg, color: text }}
                >
                  <span>{key}</span>
                  {errPct !== null && (
                    <span className="text-[7px] opacity-70" style={{ color: errPct > 25 ? "#ff8888" : "#aaa" }}>
                      {errPct}%err
                    </span>
                  )}
                  {avgMs !== null && errPct !== null && errPct <= 25 && (
                    <span className="text-[7px] opacity-60 text-gray-400">{avgMs}ms</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 rounded border border-gray-800 flex flex-col gap-3" style={{ background: "#0a0a0a" }}>
        <h4 className="text-xs uppercase tracking-widest text-gray-500">見方 / Legend</h4>
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold"
              style={{ background: "rgba(220,50,50,0.7)", color: "#ff8888", border: "1px solid #555" }}>
              a
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-red-400">エラーが多い</span>
              <span className="text-gray-600">error rate &gt; 25%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold"
              style={{ background: "rgba(0,220,240,0.55)", color: "rgba(100,255,255,0.9)", border: "1px solid #555" }}>
              a
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-cyan-400">速い</span>
              <span className="text-gray-600">fast (&lt;100ms avg)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold"
              style={{ background: "rgba(0,100,150,0.2)", color: "rgba(100,200,255,0.6)", border: "1px solid #555" }}>
              a
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-blue-400">遅い</span>
              <span className="text-gray-600">slow (&gt;400ms avg)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold"
              style={{ background: "#111", color: "#333", border: "1px solid #333" }}>
              a
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-500">データなし</span>
              <span className="text-gray-600">no data yet</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-600">各キーにカーソルを当てると詳細 (回数・エラー率・平均ms) を表示</p>
      </div>

      {isEmpty && (
        <p className="text-gray-600 text-sm text-center">まだデータがありません。ゲームをプレイしてください。</p>
      )}
    </div>
  );
}
