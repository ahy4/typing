import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteToml } from "vite-plugin-toml";

export default defineConfig({
	base: "/typing/",
	plugins: [react(), tailwindcss(), ViteToml()],
});
