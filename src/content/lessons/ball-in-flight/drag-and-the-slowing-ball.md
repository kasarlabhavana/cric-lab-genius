---
title: How much the air slows a delivery
summary: Air drag takes roughly 15–18 km/h off a 145 km/h delivery before it reaches the batter — and that is before the bounce takes more.
module: ball-in-flight
order: 4
minutes: 5
lastReviewed: 2026-10-26
lab: flight
established:
  - Drag force grows with the square of speed.
  - A fast delivery loses a meaningful fraction of its speed to drag on the way to the batter, and more at the bounce.
  - Speeds shown on broadcasts are measured close to release, where the ball is fastest.
debated:
  - The exact drag coefficient of a cricket ball in play, which changes with seam angle, wear and speed.
sources:
  - title: "NASA Glenn Research Center — The drag equation"
    url: https://www.grc.nasa.gov/WWW/k-12/VirtualAero/BottleRocket/BGP/Sue/Drag_equation_int.htm
  - title: "Mehta — Aerodynamics of sports balls (1985), NASA Technical Reports Server"
    url: https://ntrs.nasa.gov/citations/19850049027
quiz:
  - q: If a ball's speed doubles, the drag on it becomes roughly…
    options: ["The same", "Twice as large", "Four times as large", "Half as large"]
    answer: 2
    explain: Drag scales with speed squared, so doubling speed quadruples drag.
  - q: Roughly how long does a 145 km/h delivery take to travel about 17.5 m to the batter?
    options: ["About 0.15 seconds", "About 0.46 seconds", "About 1 second", "About 2 seconds"]
    answer: 1
    explain: With drag included, it takes a little under half a second.
  - q: Where is a delivery's speed normally measured for broadcast?
    options: ["At the batter", "At the bounce", "Close to release, where it is fastest", "At the wicket-keeper"]
    answer: 2
    explain: The quoted figure is the speed shortly after release. The ball arrives noticeably slower.
---

## The short answer

Drag is the air pushing back on the ball. It grows with the **square** of speed, so fast deliveries feel it most. A ball released at 145 km/h arrives at the batter at roughly 127–130 km/h from air resistance alone, after about 0.46 seconds in flight. The bounce takes more pace off on top of that.

## How it works

Drag on a ball is given by

**F = ½ ρ C<sub>d</sub> A v²**

where ρ is air density (about 1.2 kg/m³ at sea level), A is the ball's cross-section (about 0.0041 m² for a 72 mm ball), v is speed, and C<sub>d</sub> is the drag coefficient — roughly 0.4–0.5 for a cricket ball.

At 145 km/h (40.3 m/s) that gives a drag force of about **1.6–2.0 newtons**. On a 0.16 kg ball, that is a deceleration of around 10–12 m/s² — the ball sheds speed fastest at the start, while it is quickest.

Working the flight through step by step over 17.5 m (a typical release-to-bat distance):

| Release speed | Flight time | Speed at batter (air only) |
|---|---|---|
| 120 km/h | ~0.56 s | ~105–108 km/h |
| 135 km/h | ~0.50 s | ~118–121 km/h |
| 145 km/h | ~0.46 s | ~127–130 km/h |
| 155 km/h | ~0.43 s | ~136–139 km/h |

## On the field

- **Speed-gun numbers flatter the ball's arrival.** The figure on screen is measured near release. The batter faces something slower — but also something that has spent less time in the air for them to read.
- **Thin air carries the ball.** At altitude, lower air density means less drag. Johannesburg's air is roughly 18% less dense than at sea level, so both deliveries and big hits lose less speed.
- **Terminal velocity is lower than you might think.** Dropped from a great height, a cricket ball would stop accelerating at roughly 130–145 km/h, when drag equals its weight. A skied catch from a top edge climbing 30–40 m falls at about 85–90 km/h — well short of that.

## Common misconceptions

- *"The ball reaches the batter at the speed shown."* It arrives about 10–12% slower before the bounce, and slower still after it.
- *"Drag is negligible over 20 metres."* It is small compared with gravity's effect on a long hit, but over a fast delivery it removes more than 15 km/h.

<details>
<summary>Go deeper: how the table was calculated</summary>

The figures come from stepping the drag equation forward in tiny time increments: at each step, compute the drag at the current speed, reduce the speed accordingly, and move the ball forward. Gravity and any swing are ignored because they act mostly at right angles to the ball's path and barely change its forward speed. The range in each cell covers C<sub>d</sub> from 0.4 to 0.5. You can run the same calculation in the Flight lab.

</details>
