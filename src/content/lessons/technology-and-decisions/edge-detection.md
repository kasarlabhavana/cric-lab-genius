---
title: Hearing and seeing an edge
summary: Edge-detection uses sound from stump microphones, synced to video, and in some series infrared heat cameras. Each has its own failure modes.
module: technology-and-decisions
order: 3
minutes: 5
lastReviewed: 2026-10-26
established:
  - Sound-based edge detection lines up a microphone signal with high-speed video frames.
  - Infrared systems look for the heat produced by friction when the ball touches bat or glove.
  - Both methods can miss faint contacts or produce ambiguous signals.
debated:
  - How reliably very fine edges can be detected, especially when bat hits pad or ground at the same moment.
sources:
  - title: "Wikipedia — Hot Spot (cricket)"
    url: https://en.wikipedia.org/wiki/Hot_Spot_(cricket)
  - title: "Wikipedia — Snickometer"
    url: https://en.wikipedia.org/wiki/Snickometer
quiz:
  - q: What does sound-based edge detection compare?
    options: ["Crowd noise and the scoreboard", "A microphone signal and the video frames", "Two umpires' opinions", "Ball speed and bounce"]
    answer: 1
    explain: A spike in the audio is matched to the frame where the ball passes the bat.
  - q: What do infrared systems detect?
    options: ["Colour", "Heat from friction at contact", "Magnetism", "Vibration in the pitch"]
    answer: 1
    explain: Contact creates a small hot mark that infrared cameras can show.
  - q: Why can a sound spike mislead?
    options: ["It never misleads", "Bat hitting pad or ground can make a similar sound at the same time", "Microphones only work in daylight", "Sound travels too fast"]
    answer: 1
    explain: Other contacts near the same moment can produce a spike that looks like an edge.
---

## The short answer

To decide whether the ball touched the bat, reviews use two kinds of evidence. **Sound-based** systems match a spike in a stump microphone's signal to the high-speed video frame where the ball passes the bat. **Infrared** systems look for a small heat mark where friction warmed the bat or glove. Both help — and both can be ambiguous.

## Sound-based detection

A microphone in the stumps picks up sounds around the crease. The audio waveform is displayed alongside synchronised video. A sharp, short spike that lines up exactly with the ball passing the bat suggests contact.

- **Strength:** picks up very light touches that leave no visible deflection.
- **Weakness:** bat hitting pad, bat hitting ground or ball hitting pad can produce similar spikes. When those happen at almost the same moment as a possible edge, the signal is hard to read.

Early versions (the Snickometer) needed time to process. Modern systems are fast enough to use during a review.

## Infrared detection

Infrared cameras show temperature differences. When the ball rubs the bat or glove, friction leaves a small warm mark that can appear as a bright spot.

- **Strength:** shows **where** contact happened.
- **Weakness:** very faint or glancing contacts may not show; marks from earlier deliveries or from the ball hitting pad can confuse the picture. Some coatings on bats have been suggested to reduce heat marks, though evidence is limited.

## On the field

- **Third umpires combine evidence.** Sound, heat, deflection on replays and the batter's reaction are weighed together.
- **Conclusive evidence is required to overturn.** If the evidence is unclear, the on-field decision stands.

## Common misconceptions

- *"No spike means no edge."* A faint edge can fail to register clearly on audio, especially with crowd noise.
- *"A hot spot proves a catch."* It shows contact, but not whether the ball carried to the fielder.

<details>
<summary>Go deeper: why frame rate matters</summary>

At 140 km/h the ball moves almost 4 cm every thousandth of a second. A camera running at a few hundred frames per second will often not capture the exact instant the ball passes the bat. Audio is sampled much faster than video, which is why sound is used to pin down the timing.

</details>
