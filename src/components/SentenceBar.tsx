interface Props {
  current: number;
  total: number;
}

export function SentenceBar({ current, total }: Props) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
        <span>PROGRESS</span>
        <span className="text-gray-400">
          {current}/{total}
        </span>
      </div>
      <div className="h-1 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #00ffff, #0088ff)",
            boxShadow: "0 0 6px #00ffff44",
          }}
        />
      </div>
    </div>
  );
}
