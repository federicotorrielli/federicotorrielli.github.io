import { gsap } from "gsap";
import { typewriter } from "./trace";

type Pt = [number, number];
interface FacetData { a: Pt[]; b: Pt[]; s: string }

const SHEET = "#fbf8f1";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** t = 1 is the folded crane, t = 0 is the flat crease pattern. */
function draw(poly: SVGPolygonElement, f: FacetData, t: number) {
  poly.setAttribute("points", f.a.map((p, i) => `${lerp(f.b[i][0], p[0], t)},${lerp(f.b[i][1], p[1], t)}`).join(" "));
  const shade = `color-mix(in oklab, ${f.s} ${Math.round(t * 100)}%, ${SHEET})`;
  poly.style.fill = shade;
  poly.style.stroke = t < 0.5 ? "rgb(29 27 25 / .12)" : shade;
}

function crane(svg: SVGSVGElement) {
  const data: FacetData[] = JSON.parse(svg.dataset.facets ?? "[]");
  const polys = [...svg.querySelectorAll<SVGPolygonElement>(".crane__facets polygon")];
  const crease = svg.querySelector<SVGGElement>(".crane__crease")!;
  const state = data.map(() => ({ t: 0 }));
  const render = () => {
    state.forEach((s, i) => draw(polys[i], data[i], s.t));
    const mean = state.reduce((m, s) => m + s.t, 0) / state.length;
    crease.setAttribute("opacity", String(Math.max(0, 1 - mean * 1.6)));
  };
  const to = (t: number, delay = 0) =>
    gsap.to(state, {
      t,
      delay,
      duration: reduced() ? 0 : 1.5,
      ease: "power3.inOut",
      stagger: reduced() ? 0 : { each: 0.045, from: t ? "end" : "start" },
      onUpdate: render,
      overwrite: true,
    });
  return { render, to };
}

function parallax(stage: HTMLElement) {
  const layers = [...stage.querySelectorAll<SVGElement>("[data-depth]")];
  stage.closest("[data-shadowbox]")!.addEventListener("pointermove", (e) => {
    const ev = e as PointerEvent;
    const r = stage.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    layers.forEach((l) => {
      const d = Number(l.dataset.depth) * 0.3;
      l.style.setProperty("--px", `${(-x * d).toFixed(2)}px`);
      l.style.setProperty("--py", `${(-y * d).toFixed(2)}px`);
    });
  });
  stage.closest("[data-shadowbox]")!.addEventListener("pointerleave", () =>
    layers.forEach((l) => (l.style.removeProperty("--px"), l.style.removeProperty("--py"))),
  );
}

export function mountShadowbox(box: HTMLElement) {
  if (box.dataset.mounted) return;
  box.dataset.mounted = "";
  const svg = box.querySelector<SVGSVGElement>("[data-crane]")!;
  const toggle = box.querySelector<HTMLButtonElement>("[data-crane-toggle]")!;
  const label = toggle.querySelector("[data-label]")!;
  const c = crane(svg);
  const panel = box.querySelector<HTMLElement>("[data-trace]")!;
  const trace = typewriter(
    panel.querySelector<HTMLElement>("[data-trace-text]")!,
    JSON.parse(box.querySelector("[data-trace-json]")!.textContent!).text,
    reduced,
  );

  c.render();
  box.dataset.ready = "";
  c.to(1, 0.5); // the crane folds itself once on load

  toggle.addEventListener("click", () => {
    const unfold = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(unfold));
    label.textContent = unfold ? "Show folded crane" : "Show crease pattern";
    c.to(unfold ? 0 : 1);
    panel.hidden = !unfold;
    unfold ? trace.start() : trace.stop();
  });
  if (!reduced()) parallax(box.querySelector(".box__stage")!);
}
