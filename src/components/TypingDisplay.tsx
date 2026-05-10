import type React from "react";
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
		<div className="flex flex-col gap-3 items-center select-none">
			{/* Japanese */}
			<div
				className="text-2xl font-bold tracking-wider transition-colors duration-100"
				style={{
					color: lastWrong ? "#ff6666" : "#e5e7eb",
					textShadow: lastWrong ? "0 0 12px #ff333388" : "none",
				}}
			>
				{sentence.japanese}
			</div>

			{/* Romaji */}
			<div className="font-mono text-xl tracking-widest flex items-center gap-0 flex-wrap justify-center">
				{/* completed segments */}
				<span
					className="text-cyan-400"
					style={{ textShadow: "0 0 8px #00ffff88" }}
				>
					{done}
				</span>
				{/* current segment: typed part */}
				<span className="text-cyan-300">{typed}</span>
				{/* current segment: remaining — shake + red when wrong */}
				<span
					className={`border-b-2 ${lastWrong ? "border-red-400 text-red-400" : "border-cyan-600 text-gray-400"}`}
					style={{
						minWidth: "1ch",
						textShadow: lastWrong ? "0 0 8px #ff444488" : "none",
						animation: lastWrong ? "wrongShake 0.18s ease" : "none",
					}}
				>
					{remainingInCurrent}
				</span>
				{/* pending segments */}
				<span className="text-gray-600">{pending}</span>
			</div>

			{/* kana progress indicators */}
			<div className="flex gap-1 flex-wrap justify-center">
				{
					typingState.segments.reduce<{
						offset: number;
						nodes: React.ReactNode[];
					}>(
						(acc, seg, i) => {
							const key = `${acc.offset}`;
							acc.nodes.push(
								<span
									key={key}
									className={`text-xs px-1 py-0.5 rounded border ${
										i < typingState.segIdx
											? "border-cyan-800 text-cyan-600 bg-cyan-950/30"
											: i === typingState.segIdx
												? "border-cyan-400 text-cyan-300 bg-cyan-900/30"
												: "border-gray-800 text-gray-600"
									}`}
								>
									{seg.kana}
								</span>,
							);
							acc.offset += seg.kana.length;
							return acc;
						},
						{ offset: 0, nodes: [] },
					).nodes
				}
			</div>
		</div>
	);
}
