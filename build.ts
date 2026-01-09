import { readFile } from "node:fs/promises";

await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir: "./out",
  plugins: [
    {
      name: "Compile HTML",
      setup(build) {
        build.onLoad(
          {
            filter: /\.html$/,
          },
          async (args) => {
            let html = await readFile(args.path, "utf-8");

            const regex = /<!--SLOT:(.*?)-->/g;
            const matches = [...html.matchAll(regex)];

            for (const match of matches) {
              const [fullMatch, path] = match;
              try {
                const content = await readFile(path.trim(), "utf-8");
                html = html.replaceAll(fullMatch, content);
              } catch (error) {
                console.error(`Failed to inject slot: ${path}`, error);
              }
            }

            return {
              contents: html,
              loader: "html",
            };
          }
        );
      },
    },
  ],
});
