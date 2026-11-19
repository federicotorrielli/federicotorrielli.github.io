/** Faceted paper crane and the flat crease pattern it unfolds into.
 *  Each facet is a triangle with a folded position, a flat position, and a shade. */

export type Point = readonly [number, number];
export type Tri = readonly [Point, Point, Point];

export interface Facet {
  folded: Tri;
  flat: Tri;
  shade: string;
}

const CENTER: Point = [200, 150];
const SIDE = 210;

/** Folded crane in three-quarter view, projected from a small 3D model and
 *  drawn back to front as 16 facets in a 400 x 300 box: far wing, tail, body,
 *  neck, head, near wing. Shades follow the facet normals, light from the top left. */
const CRANE: readonly { tri: Tri; shade: string }[] = [
  { tri: [[198, 174], [281, 161], [127, 97]], shade: "#e8714f" },
  { tri: [[150, 202], [198, 174], [127, 97]], shade: "#ee8463" },
  { tri: [[125, 184], [150, 202], [127, 97]], shade: "#9e331f" },
  { tri: [[294, 187], [287, 183], [380, 18]], shade: "#7f2716" },
  { tri: [[287, 183], [269, 172], [380, 18]], shade: "#e2654a" },
  { tri: [[221, 189], [292, 169], [209, 257]], shade: "#7f2716" },
  { tri: [[209, 167], [292, 169], [221, 189]], shade: "#e2654a" },
  { tri: [[127, 193], [221, 189], [209, 257]], shade: "#96301d" },
  { tri: [[127, 193], [209, 167], [221, 189]], shade: "#e8714f" },
  { tri: [[142, 204], [150, 190], [46, 61]], shade: "#7f2716" },
  { tri: [[124, 211], [142, 204], [46, 61]], shade: "#96301d" },
  { tri: [[56, 75], [58, 84], [20, 107]], shade: "#7f2716" },
  { tri: [[46, 61], [56, 75], [20, 107]], shade: "#e2654a" },
  { tri: [[221, 189], [294, 170], [326, 229]], shade: "#e8714f" },
  { tri: [[167, 213], [221, 189], [326, 229]], shade: "#ee8463" },
  { tri: [[138, 193], [167, 213], [326, 229]], shade: "#7f2716" },
];

const angle = ([x, y]: Point, [cx, cy]: Point) => Math.atan2(y - cy, x - cx);

const centroid = (t: Tri): Point => [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3];

/** Vertices in angular order around the triangle's own centroid, so that
 *  matched vertices travel without crossing. */
const orient = (t: Tri): Tri => {
  const c = centroid(t);
  return [...t].sort((a, b) => angle(a, c) - angle(b, c)) as unknown as Tri;
};

/** 16 points around the square perimeter, clockwise from the top left corner. */
function perimeter(center: Point, side: number): Point[] {
  const [cx, cy] = center;
  const h = side / 2;
  const step = side / 4;
  const edges: [Point, Point][] = [
    [[cx - h, cy - h], [step, 0]],
    [[cx + h, cy - h], [0, step]],
    [[cx + h, cy + h], [-step, 0]],
    [[cx - h, cy + h], [0, -step]],
  ];
  return edges.flatMap(([[x, y], [dx, dy]]) => [0, 1, 2, 3].map((i): Point => [x + dx * i, y + dy * i]));
}

function flatSquare(center: Point, side: number): Tri[] {
  const ring = perimeter(center, side);
  return ring.map((p, i) => [center, p, ring[(i + 1) % ring.length]] as Tri);
}

const byAngleAround = (pivot: Point) => (a: Tri, b: Tri) => angle(centroid(a), pivot) - angle(centroid(b), pivot);

/** Pair crane facets and square facets by their angle around each centre.
 *  The result keeps the crane's drawing order, so the near wing stays in front. */
export function facets(): Facet[] {
  const flat = flatSquare(CENTER, SIDE).sort(byAngleAround(CENTER));
  const rank = CRANE.map((_, i) => i).sort((a, b) => byAngleAround([200, 150])(CRANE[a].tri, CRANE[b].tri));
  const slot = new Map(rank.map((craneIndex, flatIndex) => [craneIndex, flatIndex]));
  return CRANE.map(({ tri, shade }, i) => ({ folded: orient(tri), flat: orient(flat[slot.get(i)!]), shade }));
}

/** Bird base crease lines on the flat square: mountain folds and valley folds. */
export function creaseLines(center: Point = CENTER, side: number = SIDE) {
  const [cx, cy] = center;
  const h = side / 2;
  const tl: Point = [cx - h, cy - h];
  const tr: Point = [cx + h, cy - h];
  const br: Point = [cx + h, cy + h];
  const bl: Point = [cx - h, cy + h];
  const k = Math.tan(Math.PI / 8) * side; // kite lines bisect corner and diagonal at 22.5 degrees
  const mountain: [Point, Point][] = [
    [tl, br],
    [[cx, cy - h], [cx, cy + h]],
    [[cx - h, cy], [cx + h, cy]],
  ];
  const valley: [Point, Point][] = [
    [tr, bl],
    [tr, [cx - h, cy - h + k]],
    [tr, [cx + h - k, cy + h]],
    [bl, [cx + h, cy + h - k]],
    [bl, [cx - h + k, cy - h]],
  ];
  return { mountain, valley, square: [tl, tr, br, bl] as Point[] };
}

export const points = (t: Tri) => t.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
