import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { decodeReplay } from "../lib/shareReplay";
import { loadReplays, saveReplay } from "../lib/storage";
import type { ReplayData } from "../lib/types";
import { ReplayPlayer } from "./ReplayPlayer";

interface Props {
	startGame: (ghostReplayId: string) => void;
}

export function SharedReplayLoader({ startGame }: Props) {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const stateReplay = (
		location.state as { replay?: ReplayData; from?: string } | null
	)?.replay;
	const from = (location.state as { from?: string } | null)?.from;
	const encoded = searchParams.get("r");
	const [replay, setReplay] = useState<ReplayData | null>(stateReplay ?? null);
	const [error, setError] = useState(!encoded && !stateReplay);

	useEffect(() => {
		if (!encoded || stateReplay) return;
		decodeReplay(encoded)
			.then((r) => {
				// Save to localStorage so startGame can find it by ID
				const existing = loadReplays();
				if (!existing.find((e) => e.id === r.id)) {
					saveReplay(r);
				}
				setReplay(r);
			})
			.catch(() => setError(true));
	}, [encoded, stateReplay]);

	if (error) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					fontFamily: "'Press Start 2P', monospace",
					color: "#cc44ff",
					gap: "24px",
				}}
			>
				<div style={{ fontSize: "14px" }}>URLが無効です</div>
				<button
					type="button"
					onClick={() => navigate("/")}
					style={{
						padding: "8px 20px",
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "11px",
						border: "1px solid #6611cc",
						color: "#aaa",
						background: "none",
						cursor: "pointer",
					}}
				>
					← トップへ
				</button>
			</div>
		);
	}

	if (!replay) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					fontFamily: "'Press Start 2P', monospace",
					color: "#cc44ff",
					fontSize: "14px",
				}}
			>
				読み込み中...
			</div>
		);
	}

	return (
		<ReplayPlayer
			replay={replay}
			onClose={() => navigate(from === "gameover" ? "/gameover" : "/")}
			onStartWithGhost={() => startGame(replay.id)}
		/>
	);
}
