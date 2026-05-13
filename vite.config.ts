import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	base: "/typing/",
	plugins: [react(), tailwindcss()],
	test: {
		include: ["src/**/*.test.ts"],
	},
});
