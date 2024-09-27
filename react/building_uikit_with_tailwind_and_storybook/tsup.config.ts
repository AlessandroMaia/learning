import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
  ],
  format: ["cjs", "esm"],
  outDir: "dist",
  minify: true,
  sourcemap: true,
  clean: true,
  dts: true,
  tsconfig: "tsconfig.build.json"
});
