interface Props {
	onStart: () => void;
	onStats: () => void;
	onHelp: () => void;
	bestWpm: number;
	sessionCount: number;
}

export function IdleScreen({ onStats, onHelp, bestWpm, sessionCount }: Props) {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] gap-8 select-none">
			{/* Logo */}
			<div className="flex flex-col items-center gap-2">
				<div
					className="text-5xl font-black tracking-[0.3em] font-mono"
					style={{
						color: "#00ffff",
						textShadow: "0 0 30px #00ffff88, 0 0 60px #00ffff44",
					}}
				>
					TYPE{"//"}DARK
				</div>
				<div className="text-gray-600 text-sm tracking-widest uppercase font-mono">
					Romaji Typing · Analytics · Ghost
				</div>
			</div>

			{/* Stats preview */}
			{sessionCount > 0 && (
				<div className="flex gap-8 text-center">
					<div>
						<div className="text-3xl font-mono font-bold text-cyan-400">
							{bestWpm.toFixed(1)}
						</div>
						<div className="text-xs text-gray-600 uppercase tracking-widest">
							Best KPS
						</div>
					</div>
					<div>
						<div className="text-3xl font-mono font-bold text-gray-300">
							{sessionCount}
						</div>
						<div className="text-xs text-gray-600 uppercase tracking-widest">
							Sessions
						</div>
					</div>
				</div>
			)}

			{/* Actions */}
			<div className="flex flex-col gap-3 items-center">
				<div
					className="px-12 py-4 font-mono text-xl font-bold rounded border-2 uppercase tracking-widest select-none"
					style={{
						borderColor: "#00ffff",
						color: "#00ffff",
						background: "transparent",
						boxShadow: "0 0 20px #00ffff44",
					}}
				>
					START GAME
				</div>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={onStats}
						className="px-6 py-2 font-mono text-sm text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-600 rounded transition-all"
					>
						STATISTICS
					</button>
					<button
						type="button"
						onClick={onHelp}
						className="px-6 py-2 font-mono text-sm text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-600 rounded transition-all"
					>
						HOW TO PLAY
					</button>
				</div>
			</div>

			<div className="text-gray-500 text-sm font-mono tracking-widest">
				[ SPACE ] でスタート
			</div>
		</div>
	);
}
