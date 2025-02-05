import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite"; // ✅ 타입 명시적으로 추가

export default defineConfig({
    plugins: [react()],
    test: {
        // ✅ test 속성 추가
        environment: "jsdom",
        globals: true,
        setupFiles: "./setupTests",
        include: ["src/**/*.test.{ts,tsx}"], // ✅ 테스트 파일 대상 지정,
        coverage: {
            exclude: [
                "node_modules/**/*",
                "coverage/**/*",
                "**/*.config.ts",
                "**/*.js",
                "**/Redux/store.ts",
                "**/App.tsx",
                "**/main.tsx",
            ],
            reporter: ["text", "json", "html"],
        },
    },
} as UserConfig); // ✅ as UserConfig 사용
