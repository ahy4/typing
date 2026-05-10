import { useState } from "react";
import { loadReplays } from "../lib/storage";
import type { ReplayData, SessionRecord } from "../lib/types";
import { HeatmapView } from "./HeatmapView";
import { ReplayPlayer } from "./ReplayPlayer";

interface Props {
	sessions: SessionRecord[];
	onBack: () => void;
	onClear: () => void;
	onStartWithGhost: (replayId: string) => void;
	onDeleteReplay: (replayId: string) => void;
}

export function StatsScreen({
	sessions,
	onBack,
	onClear,
	onStartWithGhost,
	onDeleteReplay,
}: Props) {
	const [tab, setTab] = useState<"heatmap" | "replays">("heatmap");
	const [watchingReplayId, setWatchingReplayId] = useState<string | null>(null);
	const [heatmapReplay, setHeatmapReplay] = useState<ReplayData | null>(null);
	const [replays, setReplays] = useState<ReplayData[]>(() => loadReplays());

	const watchingReplay = watchingReplayId
		? replays.find((r) => r.id === watchingReplayId)
		: null;

	if (watchingReplay) {
		return (
			<ReplayPlayer
				replay={watchingReplay}
				onClose={() => setWatchingReplayId(null)}
			/>
		);
	}

	const avgWpm =
		sessions.length > 0
			? sessions.reduce((a, s) => a + s.wpm, 0) / sessions.length
			: 0;
	const avgAcc =
		sessions.length > 0
			? sessions.reduce((a, s) => a + s.accuracy, 0) / sessions.length
			: 0;

	function handleDeleteReplay(id: string) {
		if (!confirm("この履歴を削除しますか？")) return;
		onDeleteReplay(id);
		setReplays((prev) => prev.filter((r) => r.id !== id));
		if (heatmapReplay?.id === id) setHeatmapReplay(null);
	}

	return (
		<div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-4 border-b border-gray-900">
				<button
					type="button"
					onClick={onBack}
					className="text-gray-500 hover:text-gray-200 font-mono text-sm transition-colors flex items-center gap-2"
				>
					← 戻る
				</button>
				<h1 className="font-mono text-lg text-gray-300 uppercase tracking-widest">
					統計
				</h1>
				<button
					type="button"
					onClick={() => {
						if (confirm("全データを消去しますか？")) onClear();
					}}
					className="text-red-800 hover:text-red-400 font-mono text-xs transition-colors"
				>
					データリセット
				</button>
			</div>

			{/* Summary row */}
			<div className="flex gap-8 px-8 py-4 border-b border-gray-900">
				{[
					{ label: "回数", value: sessions.length, color: "#888" },
					{ label: "平均 打/秒", value: avgWpm.toFixed(1), color: "#00ff88" },
					{
						label: "平均精度",
						value: `${Math.round(avgAcc * 100)}%`,
						color: "#ffaa00",
					},
				].map((item) => (
					<div key={item.label}>
						<div
							className="font-mono text-2xl font-bold"
							style={{ color: item.color }}
						>
							{item.value}
						</div>
						<div className="text-xs text-gray-600 uppercase tracking-widest">
							{item.label}
						</div>
					</div>
				))}
			</div>

			{/* Tabs */}
			<div className="flex gap-0 border-b border-gray-900">
				{(["heatmap", "replays"] as const).map((t) => (
					<button
						type="button"
						key={t}
						onClick={() => {
							setTab(t);
							setHeatmapReplay(null);
						}}
						className="px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors border-b-2"
						style={{
							borderColor: tab === t ? "#00ffff" : "transparent",
							color: tab === t ? "#00ffff" : "#555",
						}}
					>
						{t === "heatmap" ? "ヒートマップ" : "履歴"}
					</button>
				))}
			</div>

			{/* Content */}
			<div className="flex-1 overflow-y-auto px-8 py-6">
				{tab === "heatmap" && (
					<div>
						{/* Heatmap source selector */}
						<div className="flex gap-2 mb-4">
							<button
								type="button"
								onClick={() => setHeatmapReplay(null)}
								className="px-3 py-1 font-mono text-xs rounded border transition-colors"
								style={{
									borderColor: heatmapReplay === null ? "#00ffff" : "#333",
									color: heatmapReplay === null ? "#00ffff" : "#555",
								}}
							>
								全セッション
							</button>
							{[...replays]
								.reverse()
								.slice(0, 8)
								.map((r) => (
									<button
										type="button"
										key={r.id}
										onClick={() => setHeatmapReplay(r)}
										className="px-3 py-1 font-mono text-xs rounded border transition-colors"
										style={{
											borderColor:
												heatmapReplay?.id === r.id ? "#cc44ff" : "#333",
											color: heatmapReplay?.id === r.id ? "#cc44ff" : "#555",
										}}
									>
										{new Date(r.timestamp).toLocaleDateString()}{" "}
										{r.wpm.toFixed(1)}打/秒
									</button>
								))}
						</div>
						{heatmapReplay ? (
							<HeatmapView replay={heatmapReplay} />
						) : (
							<HeatmapView sessions={sessions} />
						)}
					</div>
				)}
				{tab === "replays" && (
					<div className="flex flex-col gap-2">
						<h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
							履歴一覧
						</h3>
						{replays.length === 0 && (
							<p className="text-gray-600 text-sm">履歴がありません。</p>
						)}
						{[...replays].reverse().map((r) => (
							<div
								key={r.id}
								className="flex justify-between items-center py-3 px-4 bg-gray-950 border border-gray-800 rounded"
							>
								<span className="text-gray-500 text-xs font-mono">
									{new Date(r.timestamp).toLocaleString()}
								</span>
								<span className="text-cyan-400 font-mono">
									{r.wpm.toFixed(1)} 打/秒
								</span>
								<span className="text-green-400 font-mono">
									{Math.round(r.accuracy * 100)}%
								</span>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => {
											setHeatmapReplay(r);
											setTab("heatmap");
										}}
										className="text-xs font-mono text-purple-500 hover:text-purple-300 border border-purple-900 hover:border-purple-600 rounded px-2 py-1 transition-colors"
									>
										ヒートマップ
									</button>
									<button
										type="button"
										onClick={() => setWatchingReplayId(r.id)}
										className="text-xs font-mono text-gray-500 hover:text-gray-200 border border-gray-700 hover:border-gray-500 rounded px-2 py-1 transition-colors"
									>
										▶ 再生
									</button>
									<button
										type="button"
										onClick={() => onStartWithGhost(r.id)}
										className="text-xs font-mono text-cyan-600 hover:text-cyan-300 border border-cyan-900 hover:border-cyan-600 rounded px-2 py-1 transition-colors"
									>
										⚔ 対戦
									</button>
									<button
										type="button"
										onClick={() => handleDeleteReplay(r.id)}
										className="text-xs font-mono text-red-800 hover:text-red-400 border border-red-900 hover:border-red-700 rounded px-2 py-1 transition-colors"
									>
										削除
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
