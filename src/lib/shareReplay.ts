import type { ReplayData } from "./types";

export async function encodeReplay(replay: ReplayData): Promise<string> {
	const bytes = new TextEncoder().encode(JSON.stringify(replay));

	const cs = new CompressionStream("gzip");
	const writer = cs.writable.getWriter();
	writer.write(bytes);
	writer.close();

	const buf = await new Response(cs.readable).arrayBuffer();
	let binary = "";
	for (const b of new Uint8Array(buf)) binary += String.fromCharCode(b);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function decodeReplay(encoded: string): Promise<ReplayData> {
	const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
	const pad = (4 - (base64.length % 4)) % 4;
	const binary = atob(base64 + "=".repeat(pad));
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

	const ds = new DecompressionStream("gzip");
	const writer = ds.writable.getWriter();
	writer.write(bytes);
	writer.close();

	const buf = await new Response(ds.readable).arrayBuffer();
	return JSON.parse(new TextDecoder().decode(buf)) as ReplayData;
}
