import type { TypingState } from "../lib/romaji";
import { getDisplayRomaji } from "../lib/romaji";
import type { Sentence } from "../lib/types";

interface Props {
	sentence: Sentence;
	typingState: TypingState;
	lastWrong?: boolean;
}

export function TypingDisplay({
	sentence,
	typingState,
	lastWrong = false,
}: Props) {
	const { done, current, pending } = getDisplayRomaji(typingState);
	const typed = typingState.typed;
	const remainingInCurrent = current.slice(typed.length);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				alignItems: "center",
				userSelect: "none",
			}}
		>
			{/* Japanese */}
			<div
				style={{
					fontSize: "40px",
					letterSpacing: "6px",
					color: lastWrong ? "#ff6666" : "#aaaaaa",
					textShadow: lastWrong
						? "0 0 12px #ff333388"
						: "0 0 20px rgba(255,255,255,0.1)",
					transition: "color 0.1s",
					fontFamily: "'Share Tech Mono', monospace",
				}}
			>
				{sentence.japanese}
			</div>

			{/* Romaji */}
			<div
				style={{
					display: "flex",
					alignItems: "baseline",
					gap: "0",
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "28px",
					flexWrap: "wrap",
					justifyContent: "center",
					lineHeight: 1.7,
				}}
			>
				<span
					style={{
						color: "#00ffff",
						textShadow: "0 0 12px #00ffff, 0 0 24px rgba(0,255,255,0.5)",
					}}
				>
					{done}
				</span>
				<span
					style={{
						color: "#88ffff",
						textShadow: "0 0 8px #00ffff",
					}}
				>
					{typed}
				</span>
				<span
					style={{
						color: lastWrong ? "#ff4444" : "#cccccc",
						borderBottom: `3px solid ${lastWrong ? "#ff4444" : "#00ffff"}`,
						paddingBottom: "2px",
						minWidth: "1ch",
						textShadow: lastWrong ? "0 0 8px #ff444488" : "none",
						animation: lastWrong ? "wrongShake 0.18s ease" : "none",
					}}
				>
					{remainingInCurrent}
				</span>
				<span style={{ color: "#333" }}>{pending}</span>
			</div>

			{/* Kana pills */}
			<div
				style={{
					display: "flex",
					gap: "6px",
					flexWrap: "wrap",
					justifyContent: "center",
				}}
			>
				{typingState.segments.map((seg, i) => {
					const isDone = i < typingState.segIdx;
					const isCurrent = i === typingState.segIdx;
					return (
						<span
							key={typingState.segments
								.slice(0, i + 1)
								.map((s) => s.kana)
								.join("")}
							style={{
								padding: "4px 10px",
								border: `1px solid ${isDone ? "#00cccc" : isCurrent ? "#00ffff" : "#333"}`,
								fontSize: "14px",
								fontFamily: "'Share Tech Mono', monospace",
								background: isDone
									? "rgba(0,255,255,0.15)"
									: isCurrent
										? "rgba(0,255,255,0.08)"
										: "transparent",
								color: isDone ? "#00ffff" : isCurrent ? "#88ffff" : "#333",
								boxShadow: isDone
									? "0 0 6px rgba(0,255,255,0.4)"
									: isCurrent
										? "0 0 4px rgba(0,255,255,0.3)"
										: "none",
							}}
						>
							{seg.kana}
						</span>
					);
				})}
			</div>
		</div>
	);
}
