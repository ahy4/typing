import { useState } from "react";
import { loadReplays } from "../lib/storage";
import type { Difficulty, ReplayData, SessionRecord } from "../lib/types";
import { HeatmapView } from "./HeatmapView";
import { OverviewChart } from "./OverviewChart";
import { ReplayPlayer } from "./ReplayPlayer";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
	easy: "EASY",
	normal: "NORMAL",
	hard: "HARD",
};
const DIFFICULTY_COLORS: Record<Difficulty, string> = {
	easy: "#00ff66",
	normal: "#00ffff",
	hard: "#ff4466",
};

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
	const [tab, setTab] = useState<"overview" | "replays">("overview");
	const [diffFilter, setDiffFilter] = useState<Difficulty | "all">("all");
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

	const filteredSessions =
		diffFilter === "all"
			? sessions
			: sessions.filter((s) => s.difficulty === diffFilter);

	const avgWpm =
		filteredSessions.length > 0
			? filteredSessions.reduce((a, s) => a + s.wpm, 0) /
				filteredSessions.length
			: 0;
	const avgAcc =
		filteredSessions.length > 0
			? filteredSessions.reduce((a, s) => a + s.accuracy, 0) /
				filteredSessions.length
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
				height: "100vh",
				background: "var(--bg)",
				overflow: "hidden",
				position: "relative",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "1100px",
					height: "100%",
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
							color: "#bbb",
							background: "none",
							border: "1px solid #7a30c0",
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
							e.currentTarget.style.color = "#bbb";
							e.currentTarget.style.borderColor = "#7a30c0";
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
							color: "#cc5555",
							background: "none",
							border: "1px solid #883333",
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
							e.currentTarget.style.color = "#cc5555";
							e.currentTarget.style.borderColor = "#883333";
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
							value: String(filteredSessions.length),
							color: "#aaa",
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
									color: "#999",
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
					{(["overview", "replays"] as const).map((t) => (
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
								color: tab === t ? "#00ffff" : "#999",
								textShadow: tab === t ? "0 0 8px #00ffff44" : "none",
								cursor: "pointer",
								transition: "all 0.15s",
								marginBottom: "-1px",
							}}
						>
							{t === "overview" ? "オーバービュー" : "履歴"}
						</button>
					))}
				</div>

				{/* DIFFICULTY FILTER */}
				<div
					style={{
						display: "flex",
						gap: "8px",
						padding: "12px 32px",
						borderBottom: "1px solid var(--border)",
						background: "rgba(13,0,26,0.3)",
						flexShrink: 0,
						alignItems: "center",
					}}
				>
					<span
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "8px",
							color: "#666",
							letterSpacing: "2px",
							marginRight: "4px",
						}}
					>
						難易度:
					</span>
					{(["all", "easy", "normal", "hard"] as const).map((d) => {
						const isActive = diffFilter === d;
						const color = d === "all" ? "#aaa" : DIFFICULTY_COLORS[d];
						const label = d === "all" ? "ALL" : DIFFICULTY_LABELS[d];
						return (
							<button
								type="button"
								key={d}
								onClick={() => setDiffFilter(d)}
								style={{
									fontFamily: "'Press Start 2P', monospace",
									fontSize: "8px",
									padding: "6px 14px",
									background: isActive ? `${color}22` : "none",
									border: `1px solid ${isActive ? color : "#444"}`,
									color: isActive ? color : "#666",
									cursor: "pointer",
									letterSpacing: "1px",
									transition: "all 0.15s",
								}}
							>
								{label}
							</button>
						);
					})}
				</div>

				{/* CONTENT */}
				<div
					style={{
						flex: 1,
						overflowY: "auto",
						padding: "28px 32px",
					}}
				>
					{tab === "overview" && (
						<div
							style={{ display: "flex", flexDirection: "column", gap: "40px" }}
						>
							<OverviewChart sessions={filteredSessions} />
							{filteredSessions.length > 0 && (
								<div>
									<div
										style={{
											fontFamily: "'Press Start 2P', monospace",
											fontSize: "10px",
											color: "#999",
											letterSpacing: "3px",
											textTransform: "uppercase",
											marginBottom: "24px",
										}}
									>
										キーヒートマップ — 全セッション平均
									</div>
									<HeatmapView sessions={filteredSessions} />
								</div>
							)}
						</div>
					)}

					{tab === "replays" && (
						<div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
							<div
								style={{
									fontFamily: "'Press Start 2P', monospace",
									fontSize: "10px",
									color: "#999",
									letterSpacing: "3px",
									textTransform: "uppercase",
									marginBottom: "20px",
								}}
							>
								履歴一覧
							</div>
							{heatmapReplay && (
								<div
									style={{
										marginBottom: "28px",
										padding: "20px",
										border: "1px solid #882255",
										background: "rgba(255,0,170,0.04)",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "16px",
											marginBottom: "16px",
										}}
									>
										<span
											style={{
												fontFamily: "'Press Start 2P', monospace",
												fontSize: "9px",
												color: "#ff00aa",
												letterSpacing: "2px",
											}}
										>
											ヒートマップ —{" "}
											{new Date(heatmapReplay.timestamp).toLocaleString()}
										</span>
										<button
											type="button"
											onClick={() => setHeatmapReplay(null)}
											style={{
												fontFamily: "'Press Start 2P', monospace",
												fontSize: "8px",
												color: "#888",
												background: "none",
												border: "1px solid #555",
												padding: "4px 10px",
												cursor: "pointer",
											}}
										>
											閉じる
										</button>
									</div>
									<HeatmapView replay={heatmapReplay} />
								</div>
							)}
							{filteredSessions.length === 0 && (
								<p
									style={{
										fontFamily: "'Share Tech Mono', monospace",
										fontSize: "14px",
										color: "#888",
										padding: "24px 0",
									}}
								>
									履歴がありません。
								</p>
							)}
							{[...replays]
								.reverse()
								.filter((r) =>
									filteredSessions.some((s) => s.replay.id === r.id),
								)
								.map((r, idx) => {
									const matchingSession = sessions.find(
										(s) => s.replay.id === r.id,
									);
									const diff = matchingSession?.difficulty;
									return (
										<div
											key={r.id}
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												padding: "20px 24px",
												background:
													idx % 2 === 0
														? "rgba(13,0,26,0.6)"
														: "rgba(0,0,0,0.3)",
												borderBottom: "1px solid var(--border)",
											}}
										>
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													gap: "4px",
													minWidth: "180px",
												}}
											>
												<span
													style={{
														fontFamily: "'Share Tech Mono', monospace",
														fontSize: "13px",
														color: "#aaa",
													}}
												>
													{new Date(r.timestamp).toLocaleString()}
												</span>
												{diff && (
													<span
														style={{
															fontFamily: "'Press Start 2P', monospace",
															fontSize: "7px",
															color: DIFFICULTY_COLORS[diff],
															letterSpacing: "1px",
														}}
													>
														{DIFFICULTY_LABELS[diff]}
													</span>
												)}
											</div>
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
														color: "#999",
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
															borderColor: "#882255",
															action: () =>
																setHeatmapReplay(
																	heatmapReplay?.id === r.id ? null : r,
																),
														},
														{
															label: "▶ 再生",
															color: "#cccccc",
															borderColor: "#666666",
															action: () => setWatchingReplayId(r.id),
														},
														{
															label: "⚔ 対戦",
															color: "#00ffff",
															borderColor: "#006666",
															action: () => onStartWithGhost(r.id),
														},
														{
															label: "削除",
															color: "#cc5555",
															borderColor: "#882222",
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
															e.currentTarget.style.borderColor =
																btn.borderColor;
															e.currentTarget.style.boxShadow = "none";
														}}
													>
														{btn.label}
													</button>
												))}
											</div>
										</div>
									);
								})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
