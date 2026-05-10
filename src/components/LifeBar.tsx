interface Props {
  life: number; // 0-100
}

export function LifeBar({ life }: Props) {
  const pct = Math.max(0, Math.min(100, life));
  const color =
    pct > 60 ? "#00ff88" : pct > 30 ? "#ffaa00" : "#ff3333";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
        <span>LIFE</span>
        <span style={{ color }}>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${pct}%`,
            background: color,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}
