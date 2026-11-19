const LABEL = "Copy";

function button(code: string) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "copy-btn";
  b.textContent = LABEL;
  b.addEventListener("click", async () => {
    await navigator.clipboard.writeText(code);
    b.textContent = "Copied";
    setTimeout(() => (b.textContent = LABEL), 1800);
  });
  return b;
}

export function addCopyButtons() {
  document.querySelectorAll<HTMLPreElement>(".prose pre:not([data-copy])").forEach((pre) => {
    pre.dataset.copy = "";
    pre.append(button(pre.querySelector("code")?.textContent ?? ""));
  });
}
