export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../docs', // so it ends up in repo root/docs
  },
  base: '/hkktn',
})
