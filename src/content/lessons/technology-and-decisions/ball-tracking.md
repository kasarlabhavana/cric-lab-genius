---
title: How ball-tracking works
summary: Several high-speed cameras locate the ball in every frame, software rebuilds its 3D path, and a model predicts where it would have gone. The prediction is the part with uncertainty.
module: technology-and-decisions
order: 1
minutes: 6
lastReviewed: 2026-10-26
established:
  - Ball-tracking systems use multiple cameras around the ground and triangulate the ball's position in three dimensions.
  - The tracked path up to the point of interception is measured; the path after it is predicted.
  - Predictions are less certain the further they extend beyond the last tracked point.
debated:
  - How large the system's error is in match conditions, since detailed independent accuracy testing is rarely published.
sources:
  - title: "Roke — Hawk-Eye: industry-changing technology"
    url: https://roke.co.uk/innovations/hawk-eye-industry-changing-technology
  - title: "Cricket Australia — Umpire's call explained"
    url: https://www.cricket.com.au/news/3319658/umpires-call-explained-why-is-that-not-out-lbw-cricket-law-drs-decision-review-system-pitching-outside-leg-impact-in-line
quiz:
  - q: How does ball-tracking find the ball's 3D position?
    options: ["A chip inside the ball", "Triangulating from several cameras", "Radar on the stumps", "The umpire's estimate"]
    answer: 1
    explain: Each camera gives a 2D view; combining several views pins down the ball's position in 3D.
  - q: Which part of an LBW projection is predicted rather than measured?
    options: ["Where the ball pitched", "The path after it hit the pad", "The release point", "The speed at release"]
    answer: 1
    explain: Once the pad intercepts the ball, its path to the stumps can only be predicted.
  - q: Why is a long prediction less certain than a short one?
    options: ["The ball gets lighter", "Small errors in the measured path grow the further you extrapolate", "The cameras turn off", "It isn't; they are equally certain"]
    answer: 1
    explain: Any small error in direction or speed is magnified over a longer projected distance.
---

## The short answer

Ball-tracking uses **six or more high-speed cameras**, usually mounted high around the ground. Each finds the ball in its image, and software combines the views to work out where the ball is in three dimensions, frame by frame. That gives a **measured** path up to the moment the ball hits the batter or bat. For an LBW, the path from there to the stumps is a **prediction**.

## How it works

1. **Detection.** In each frame from each camera, software finds the ball.
2. **Triangulation.** Two cameras seeing the same ball from different angles are enough to calculate its 3D position. More cameras improve accuracy and cover gaps.
3. **Path fitting.** The positions over time are fitted with a physical model of flight, which also gives the ball's speed and where it bounced.
4. **Projection.** If the ball's path is interrupted — by a pad, say — the model extends the fitted path to estimate where the ball would have gone.

## Measured versus predicted

- **Pitching point** and **impact point** are measured.
- **Where the ball would have hit the stumps** is predicted.

Any small error in the measured path — a slight misjudgement of direction or of how the ball bounced — grows as the projection gets longer. That is why review rules treat long projections and marginal hits with extra caution (see the lesson on umpire's call).

## On the field

- **The pitch map and beehive** graphics come from the same tracking data.
- **Speed, bounce height and swing** are all byproducts of the tracked path.
- **Spin revolutions** on broadcasts are measured by tracking the ball's rotation as well as its position.

## Common misconceptions

- *"The projection is a replay of what happened."* It is a model's best estimate of what would have happened.
- *"Ball-tracking is perfect."* The measured path is reported to be accurate to within a few millimetres, but the projected path carries more uncertainty, and the review rules are built around that.

<details>
<summary>Go deeper: why the bounce is the hardest part</summary>

Before the bounce, the ball follows smooth physics. At the bounce, it can deviate off the seam or grip and turn. If the impact with the pad comes very soon after the bounce, there are few frames of the post-bounce path to fit — so the projected direction is less certain. The review rules include special conditions for exactly this case.

</details>
