import { useCallback, useRef, useState } from "react";

export type RecorderState = "idle" | "recording" | "stopped";

const PREFERRED_MIME =
	["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find(
		(t) => MediaRecorder.isTypeSupported(t),
	) ?? "video/webm";

export function useScreenRecorder() {
	const [state, setState] = useState<RecorderState>("idle");
	const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
	const recorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	const start = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: 30 } as MediaTrackConstraints,
				audio: true,
			});

			chunksRef.current = [];

			const recorder = new MediaRecorder(stream, { mimeType: PREFERRED_MIME });

			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunksRef.current.push(e.data);
			};

			recorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: PREFERRED_MIME });
				setVideoBlob(blob);
				setState("stopped");
				for (const track of stream.getTracks()) track.stop();
			};

			// Handle user ending share via browser's built-in stop button
			stream.getVideoTracks()[0]?.addEventListener("ended", () => {
				if (recorder.state !== "inactive") recorder.stop();
			});

			recorder.start(100);
			recorderRef.current = recorder;
			setState("recording");
		} catch {
			// User cancelled the dialog — stay idle
		}
	}, []);

	const stop = useCallback(() => {
		if (recorderRef.current?.state !== "inactive") {
			recorderRef.current?.stop();
		}
	}, []);

	const download = useCallback(
		(filename?: string) => {
			if (!videoBlob) return;
			const url = URL.createObjectURL(videoBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = filename ?? `typing-replay-${Date.now()}.webm`;
			a.click();
			URL.revokeObjectURL(url);
		},
		[videoBlob],
	);

	const share = useCallback(
		async (filename?: string) => {
			if (!videoBlob) return;
			const name = filename ?? `typing-replay-${Date.now()}.webm`;
			const file = new File([videoBlob], name, { type: videoBlob.type });
			if (navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: "タイピングリプレイ",
				});
			} else {
				download(name);
			}
		},
		[videoBlob, download],
	);

	const reset = useCallback(() => {
		setVideoBlob(null);
		setState("idle");
	}, []);

	return { state, videoBlob, start, stop, download, share, reset };
}
