import path from "node:path";
import { defineConfig } from "vite";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    externalizeDeps(),
    dts({
      include: ["src"],
      exclude: ["src/__tests__", "**/*.test.ts", "**/*.test.tsx"],
      outDir: "dist/types",
      rollupTypes: false,
      copyDtsFiles: true,
      insertTypesEntry: false,
      compilerOptions: {
        declarationMap: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, "src/client.ts"),
        path.resolve(__dirname, "src/server.ts"),
      ],
      formats: ["es"],
      fileName: (format, name) => {
        return `${name}.js`;
      },
    },
    rollupOptions: {
      output: {
        banner: (chunkInfo) => {
          if (chunkInfo.name === "client") {
            return "'use client';";
          }
          return "";
        },
      },
    },
  },
});
