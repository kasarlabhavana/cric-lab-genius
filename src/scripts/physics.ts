// Small, honest physics models used by the labs.
// Ball: 0.16 kg, 72 mm diameter. Air density defaults to sea level.

export const BALL_MASS = 0.16;
export const BALL_DIAMETER = 0.072;
export const AREA = Math.PI * (BALL_DIAMETER / 2) ** 2;
export const G = 9.81;

const kmh = (v: number) => v / 3.6;
const toKmh = (v: number) => v * 3.6;

/** Delivery flight along the pitch with drag only (gravity barely changes forward speed). */
export function delivery(speedKmh: number, opts: { cd?: number; rho?: number; distance?: number } = {}) {
  const cd = opts.cd ?? 0.45, rho = opts.rho ?? 1.2, distance = opts.distance ?? 17.5;
  const k = (0.5 * rho * cd * AREA) / BALL_MASS;
  let v = kmh(speedKmh), x = 0, t = 0;
  const dt = 1e-4;
  const samples: { t: number; x: number; v: number }[] = [{ t: 0, x: 0, v }];
  while (x < distance) {
    v -= k * v * v * dt;
    x += v * dt;
    t += dt;
    if (samples.length < 400 && t - samples[samples.length - 1].t >= 0.005) samples.push({ t, x, v });
  }
  samples.push({ t, x: distance, v });
  return { time: t, arrivalKmh: toKmh(v), dragN: 0.5 * rho * cd * AREA * kmh(speedKmh) ** 2, samples };
}

/** Hit ball trajectory with gravity and (optionally) drag. Launch from 1 m height. */
export function hit(exitKmh: number, angleDeg: number, opts: { cd?: number; rho?: number; drag?: boolean } = {}) {
  const cd = opts.cd ?? 0.45, rho = opts.rho ?? 1.2, drag = opts.drag ?? true;
  const k = drag ? (0.5 * rho * cd * AREA) / BALL_MASS : 0;
  const a = (angleDeg * Math.PI) / 180;
  let vx = kmh(exitKmh) * Math.cos(a), vy = kmh(exitKmh) * Math.sin(a);
  let x = 0, y = 1, t = 0, maxY = 1;
  const dt = 1e-3;
  const pts: [number, number][] = [[x, y]];
  while (y > 0 && t < 20) {
    const v = Math.hypot(vx, vy);
    vx += -k * v * vx * dt;
    vy += (-G - k * v * vy) * dt;
    x += vx * dt;
    y += vy * dt;
    t += dt;
    if (y > maxY) maxY = y;
    if (Math.round(t / dt) % 20 === 0) pts.push([x, Math.max(y, 0)]);
  }
  pts.push([x, 0]);
  return { carry: x, hang: t, maxHeight: maxY, pts };
}

/** Best launch angle for a given exit speed, searched in 0.5° steps. */
export function bestAngle(exitKmh: number, drag = true) {
  let best = { angle: 0, carry: 0 };
  for (let a = 5; a <= 60; a += 0.5) {
    const c = hit(exitKmh, a, { drag }).carry;
    if (c > best.carry) best = { angle: a, carry: c };
  }
  return best;
}

export type Side = "laminar" | "turbulent";
export type SwingResult = {
  seamSide: Side;
  otherSide: Side;
  regime: "none" | "conventional" | "reverse";
  strength: number; // 0..1, illustrative only
};

/**
 * Illustrative swing regimes. Thresholds are rounded from wind-tunnel ranges
 * reported by Mehta and others; real values vary with seam, wear and ball make.
 * - The seam needs some angle (> ~5°) and modest speed to trip its side.
 * - The smooth/other side turns turbulent above a critical speed that drops as the ball roughens.
 */
export function swing(speedKmh: number, seamAngle: number, condition: "new" | "middle" | "old"): SwingResult {
  const critical = { new: 150, middle: 132, old: 112 }[condition];
  const seamTrips = seamAngle >= 5 && speedKmh >= 60;
  const seamSide: Side = seamTrips || speedKmh >= critical ? "turbulent" : "laminar";
  const otherSide: Side = speedKmh >= critical ? "turbulent" : "laminar";
  let regime: SwingResult["regime"] = "none";
  if (seamSide === "turbulent" && otherSide === "laminar") regime = "conventional";
  else if (seamSide === "turbulent" && otherSide === "turbulent" && seamAngle >= 5) regime = "reverse";

  // Seam-angle factor peaks near 20° and falls away either side.
  const angleFactor = Math.max(0, 1 - Math.abs(seamAngle - 20) / 20);
  let strength = 0;
  if (regime === "conventional") {
    // Grows with speed, fades as the smooth side approaches transition.
    const rise = Math.min(1, (speedKmh - 60) / 50);
    const fade = Math.min(1, Math.max(0, (critical - speedKmh) / 15));
    strength = angleFactor * rise * (0.35 + 0.65 * fade);
  } else if (regime === "reverse") {
    strength = angleFactor * Math.min(1, (speedKmh - critical) / 25 + 0.35);
  }
  return { seamSide, otherSide, regime, strength: Math.max(0, Math.min(1, strength)) };
}
