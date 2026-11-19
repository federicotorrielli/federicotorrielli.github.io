const CHARS_PER_FRAME = 5;

/** Types `text` into `el` frame by frame and keeps the end in view. */
export function typewriter(el: HTMLElement, text: string, instant: () => boolean) {
  let frame = 0;
  let shown = 0;
  const tick = () => {
    shown = Math.min(text.length, shown + CHARS_PER_FRAME);
    el.textContent = text.slice(0, shown);
    el.parentElement!.scrollTop = el.parentElement!.scrollHeight;
    if (shown < text.length) frame = requestAnimationFrame(tick);
  };
  return {
    start() {
      cancelAnimationFrame(frame);
      shown = instant() ? text.length : 0;
      el.textContent = text.slice(0, shown);
      if (shown < text.length) frame = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(frame);
    },
  };
}
