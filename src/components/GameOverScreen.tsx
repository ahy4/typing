import { useState } from "react";
import type { SessionRecord } from "../lib/types";
import { ReplayPlayer } from "./ReplayPlayer";

interface Props {
	session: SessionRecord;
	onRestart: () => void;
	onStats: () => void;
}

export function GameOverScreen({ session, onStats }: Props) {
	const [showReplay, setShowReplay] = useState(false);

	if (showReplay) {
		return (
			<ReplayPlayer
				replay={session.replay}
				onClose={() => setShowReplay(false)}
			/>
		);
	}

	const acc = Math.round(session.accuracy * 100);
	const mins = Math.floor(session.duration / 60000);
	const secs = Math.floor((session.duration % 60000) / 1000);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] gap-8 select-none">
			<div
				className="text-4xl font-black font-mono tracking-widest"
				style={{ color: "#00ffcc", textShadow: "0 0 20px #00ffcc88" }}
			>
				RESULT
			</div>

			{/* Results */}
			<div className="grid grid-cols-2 gap-6 text-center">
				<div>
					<div
						className="text-5xl font-mono font-bold text-cyan-400"
						style={{ textShadow: "0 0 20px #00ffff88" }}
					>
						{session.wpm.toFixed(1)}
					</div>
					<div className="text-xs text-gray-600 uppercase tracking-widest mt-1">
						打/秒
					</div>
				</div>
				<div>
					<div
						className="text-5xl font-mono font-bold text-green-400"
						style={{ textShadow: "0 0 20px #00ff8888" }}
					>
						{acc}%
					</div>
					<div className="text-xs text-gray-600 uppercase tracking-widest mt-1">
						ACCURACY
					</div>
				</div>
				<div>
					<div className="text-3xl font-mono font-bold text-gray-300">
						{session.sentences}
					</div>
					<div className="text-xs text-gray-600 uppercase tracking-widest mt-1">
						SENTENCES
					</div>
				</div>
				<div>
					<div className="text-3xl font-mono font-bold text-gray-300">
						{mins}:{secs.toString().padStart(2, "0")}
					</div>
					<div className="text-xs text-gray-600 uppercase tracking-widest mt-1">
						TIME
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3 items-center mt-4">
				<div
					className="px-10 py-3 font-mono text-lg font-bold rounded border-2 select-none"
					style={{
						borderColor: "#00ffff",
						color: "#00ffff",
						boxShadow: "0 0 16px #00ffff44",
					}}
				>
					PLAY AGAIN
				</div>
				<div className="text-gray-500 text-sm font-mono tracking-widest">
					[ SPACE ] でもう一度
				</div>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setShowReplay(true)}
						className="px-6 py-2 font-mono text-sm text-gray-400 border border-gray-700 rounded hover:border-gray-500 hover:text-gray-200 transition-all"
					>
						VIEW REPLAY
					</button>
					<button
						type="button"
						onClick={onStats}
						className="px-6 py-2 font-mono text-sm text-gray-400 border border-gray-700 rounded hover:border-gray-500 hover:text-gray-200 transition-all"
					>
						STATISTICS
					</button>
				</div>
			</div>
		</div>
	);
}
