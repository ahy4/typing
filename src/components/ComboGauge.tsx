interface Props {
  combo: number;
}

export function ComboGauge({ combo }: Props) {
  const milestone = 100;
  const pct = ((combo % milestone) / milestone) * 100;
  const level = Math.floor(combo / milestone);
  const colors = ["#00ffff", "#00ff88", "#ffaa00", "#ff6600", "#ff3366", "#cc00ff"];
  const color = colors[level % colors.length] ?? "#00ffff";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
        <span>COMBO</span>
        <span style={{ color }}>{combo}x</span>
      </div>
      <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
        <div
          className="h-full rounded-full transition-all duration-75"
          style={{
            width: `${combo === 0 ? 0 : pct === 0 ? 100 : pct}%`,
            background: color,
            boxShadow: combo > 0 ? `0 0 8px ${color}88` : "none",
          }}
        />
      </div>
    </div>
  );
}
