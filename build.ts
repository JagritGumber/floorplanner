await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir: "./out",
  minify: true, 
});
