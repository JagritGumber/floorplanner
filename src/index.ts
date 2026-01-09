const countEl = document.getElementById("count")!;
const incBtn = document.getElementById("inc")!;
const resetBtn = document.getElementById("reset")!;
const helloBtn = document.getElementById("hello")!;
const helloResultEl = document.getElementById("helloResult")!;
const stateEl = document.getElementById("state")!;

const state = {
  count: 0,
  lastHello: null as any,
};

function render() {
  countEl.textContent = String(state.count);
  stateEl.textContent = JSON.stringify(state, null, 2);
}

incBtn.addEventListener("click", () => {
  state.count += 1;
  render();
});

resetBtn.addEventListener("click", () => {
  state.count = 0;
  render();
});

helloBtn.addEventListener("click", async () => {
  helloResultEl.textContent = "Loading…";
  try {
    const res = await fetch("/api/hello");
    const data = await res.json();
    state.lastHello = data;
    helloResultEl.textContent = data.message ?? JSON.stringify(data);
  } catch (err) {
    helloResultEl.textContent =
      err instanceof Error ? err.message : String(err);
  } finally {
    render();
  }
});

render();
