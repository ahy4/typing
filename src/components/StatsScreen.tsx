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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				background: "var(--bg)",
				overflow: "hidden",
				position: "relative",
			}}
		>
			{/* HEADER */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "16px 32px",
					borderBottom: "2px solid #ff00aa",
					boxShadow: "0 0 20px #ff00aa44",
					background: "rgba(13,0,26,0.9)",
					flexShrink: 0,
				}}
			>
				<button
					type="button"
					onClick={onBack}
					style={{
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "10px",
						color: "#555",
						background: "none",
						border: "1px solid #2a0050",
						padding: "10px 20px",
						cursor: "pointer",
						letterSpacing: "1px",
						transition: "all 0.15s",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.color = "#00ffff";
						e.currentTarget.style.borderColor = "#00ffff";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "#555";
						e.currentTarget.style.borderColor = "#2a0050";
					}}
				>
					← 戻る
				</button>

				<div
					style={{
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "18px",
						color: "#00ffff",
						textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
						letterSpacing: "4px",
					}}
				>
					STATS
				</div>

				<button
					type="button"
					onClick={() => {
						if (confirm("全データを消去しますか？")) onClear();
					}}
					style={{
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "9px",
						color: "#441111",
						background: "none",
						border: "1px solid #440000",
						padding: "10px 16px",
						cursor: "pointer",
						letterSpacing: "1px",
						transition: "all 0.15s",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.color = "#ff2244";
						e.currentTarget.style.borderColor = "#ff2244";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "#441111";
						e.currentTarget.style.borderColor = "#440000";
					}}
				>
					データリセット
				</button>
			</div>

			{/* SUMMARY ROW */}
			<div
				style={{
					display: "flex",
					gap: "0",
					borderBottom: "1px solid var(--border)",
					background: "rgba(13,0,26,0.6)",
					flexShrink: 0,
				}}
			>
				{[
					{
						label: "セッション数",
						value: String(sessions.length),
						color: "#888",
					},
					{
						label: "平均 打/秒",
						value: avgWpm.toFixed(1),
						color: "#00ff66",
					},
					{
						label: "平均精度",
						value: `${Math.round(avgAcc * 100)}%`,
						color: "#ffee00",
					},
				].map((item, idx) => (
					<div
						key={item.label}
						style={{
							flex: 1,
							padding: "24px 32px",
							borderRight: idx < 2 ? "1px solid var(--border)" : "none",
						}}
					>
						<div
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "32px",
								color: item.color,
								textShadow: `0 0 12px ${item.color}88`,
								marginBottom: "10px",
							}}
						>
							{item.value}
						</div>
						<div
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								color: "#444",
								textTransform: "uppercase",
								letterSpacing: "2px",
							}}
						>
							{item.label}
						</div>
					</div>
				))}
			</div>

			{/* TABS */}
			<div
				style={{
					display: "flex",
					borderBottom: "1px solid var(--border)",
					background: "rgba(13,0,26,0.4)",
					flexShrink: 0,
				}}
			>
				{(["heatmap", "replays"] as const).map((t) => (
					<button
						type="button"
						key={t}
						onClick={() => {
							setTab(t);
							setHeatmapReplay(null);
						}}
						style={{
							padding: "16px 32px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							letterSpacing: "2px",
							textTransform: "uppercase",
							background: "none",
							border: "none",
							borderBottom: `3px solid ${tab === t ? "#00ffff" : "transparent"}`,
							color: tab === t ? "#00ffff" : "#444",
							textShadow: tab === t ? "0 0 8px #00ffff44" : "none",
							cursor: "pointer",
							transition: "all 0.15s",
							marginBottom: "-1px",
						}}
					>
						{t === "heatmap" ? "ヒートマップ" : "履歴"}
					</button>
				))}
			</div>

			{/* CONTENT */}
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "28px 32px",
				}}
			>
				{tab === "heatmap" && (
					<div>
						{/* Heatmap source selector */}
						<div
							style={{
								display: "flex",
								gap: "10px",
								marginBottom: "24px",
								flexWrap: "wrap",
							}}
						>
							<button
								type="button"
								onClick={() => setHeatmapReplay(null)}
								style={{
									padding: "8px 16px",
									fontFamily: "'Press Start 2P', monospace",
									fontSize: "9px",
									border: `1px solid ${heatmapReplay === null ? "#00ffff" : "#2a0050"}`,
									color: heatmapReplay === null ? "#00ffff" : "#555",
									background:
										heatmapReplay === null
											? "rgba(0,255,255,0.08)"
											: "transparent",
									cursor: "pointer",
									letterSpacing: "1px",
									transition: "all 0.15s",
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
										style={{
											padding: "8px 14px",
											fontFamily: "'Share Tech Mono', monospace",
											fontSize: "12px",
											border: `1px solid ${heatmapReplay?.id === r.id ? "#ff00aa" : "#2a0050"}`,
											color: heatmapReplay?.id === r.id ? "#ff00aa" : "#555",
											background:
												heatmapReplay?.id === r.id
													? "rgba(255,0,170,0.08)"
													: "transparent",
											cursor: "pointer",
											transition: "all 0.15s",
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
					<div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
						<div
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "10px",
								color: "#333",
								letterSpacing: "3px",
								textTransform: "uppercase",
								marginBottom: "20px",
							}}
						>
							履歴一覧
						</div>
						{replays.length === 0 && (
							<p
								style={{
									fontFamily: "'Share Tech Mono', monospace",
									fontSize: "14px",
									color: "#444",
									padding: "24px 0",
								}}
							>
								履歴がありません。
							</p>
						)}
						{[...replays].reverse().map((r, idx) => (
							<div
								key={r.id}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "20px 24px",
									background:
										idx % 2 === 0 ? "rgba(13,0,26,0.6)" : "rgba(0,0,0,0.3)",
									borderBottom: "1px solid var(--border)",
								}}
							>
								<span
									style={{
										fontFamily: "'Share Tech Mono', monospace",
										fontSize: "13px",
										color: "#555",
										minWidth: "180px",
									}}
								>
									{new Date(r.timestamp).toLocaleString()}
								</span>
								<span
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "16px",
										color: "#00ffff",
										textShadow: "0 0 8px #00ffff44",
										minWidth: "120px",
										textAlign: "center",
									}}
								>
									{r.wpm.toFixed(1)}{" "}
									<span
										style={{
											fontSize: "10px",
											color: "#444",
										}}
									>
										打/秒
									</span>
								</span>
								<span
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "16px",
										color: "#00ff66",
										textShadow: "0 0 8px #00ff6644",
										minWidth: "80px",
										textAlign: "center",
									}}
								>
									{Math.round(r.accuracy * 100)}%
								</span>
								<div style={{ display: "flex", gap: "10px" }}>
									{(
										[
											{
												label: "ヒートマップ",
												color: "#ff00aa",
												borderColor: "#440033",
												action: () => {
													setHeatmapReplay(r);
													setTab("heatmap");
												},
											},
											{
												label: "▶ 再生",
												color: "#888",
												borderColor: "#333",
												action: () => setWatchingReplayId(r.id),
											},
											{
												label: "⚔ 対戦",
												color: "#00ffff",
												borderColor: "#004444",
												action: () => onStartWithGhost(r.id),
											},
											{
												label: "削除",
												color: "#441111",
												borderColor: "#330000",
												action: () => handleDeleteReplay(r.id),
											},
										] as const
									).map((btn) => (
										<button
											type="button"
											key={btn.label}
											onClick={btn.action}
											style={{
												padding: "8px 14px",
												fontFamily: "'Press Start 2P', monospace",
												fontSize: "9px",
												color: btn.color,
												background: "none",
												border: `1px solid ${btn.borderColor}`,
												cursor: "pointer",
												letterSpacing: "1px",
												transition: "all 0.15s",
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.borderColor = btn.color;
												e.currentTarget.style.boxShadow = `0 0 6px ${btn.color}44`;
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.borderColor = btn.borderColor;
												e.currentTarget.style.boxShadow = "none";
											}}
										>
											{btn.label}
										</button>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
