import index from "./src/index.html";

Bun.serve({
  routes: {
    "/": index,
  },
});
