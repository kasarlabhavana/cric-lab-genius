// Per-topic extras: related Laboratory simulators, key takeaways,
// short lessons, and audience-tailored summaries.
// Keyed by topic slug — merged into the Topic at render time.

import type { Topic } from "@/lib/topics";

export type Audience =
  | "Beginner"
  | "Intermediate"
  | "Academy"
  | "Pro"
  | "Coach"
  | "Fan";

export const AUDIENCES: Audience[] = [
  "Beginner",
  "Intermediate",
  "Academy",
  "Pro",
  "Coach",
  "Fan",
];

export type ShortLesson = {
  title: string;
  minutes: number;
  body: string;
};

export type TopicExtras = {
  relatedSims: string[]; // laboratory sim slugs
  keyTakeaways: string[];
  lessons: ShortLesson[];
  audience: Record<Audience, string>;
};

const SIM = {
  spin: "spin-simulator",
  swing: "swing-simulator",
  pitch: "pitch-builder",
  bat: "bat-builder",
  reaction: "reaction-time-test",
  field: "field-placement-simulator",
};

const EXTRAS: Record<string, TopicExtras> = {
  "leg-break": {
    relatedSims: [SIM.spin, SIM.pitch, SIM.field],
    keyTakeaways: [
      "Side-spin from a third-finger flick produces leg-to-off turn.",
      "Drift comes from a forward-tilted spin axis, dip from top-spin overlay.",
      "Elite revs sit at 1,800–2,400 RPM with a slip-facing seam.",
    ],
    lessons: [
      { title: "Read the wrist", minutes: 3, body: "Watch the back of the bowler's hand at release — a leg-break shows the palm to the slips." },
      { title: "Tune the axis", minutes: 4, body: "Tilt the spin axis forward for dip, sideways for turn. Most stock balls live in between." },
    ],
    audience: {
      Beginner: "A ball that pitches and spins away from a right-handed batter — magic for kids learning to read spin.",
      Intermediate: "Practice the third-finger flick and a slip-pointing seam; 1,500 RPM is a strong starter number.",
      Academy: "Build a stock ball you can repeat 6 of 6, then layer the dip-heavy variation and the drifter.",
      Pro: "Match conditions: forward-tilt for dippy English nights, square-axis for hard SG-ball turn at home.",
      Coach: "Cue 'door-knob' wrist and a tall front-leg block. Track revs with a hand-camera between overs.",
      Fan: "Watch the seam tilt to the slips and the late drift toward the pads — the giveaways of a classic leggie.",
    },
  },
  "off-break": {
    relatedSims: [SIM.spin, SIM.pitch, SIM.field],
    keyTakeaways: [
      "Top-spin produces dip and skiddy bounce; sidespin produces turn.",
      "A tall release (2.2–2.4 m) is the off-spinner's main weapon.",
      "Index finger drags down the seam at release.",
    ],
    lessons: [
      { title: "Top-spin first", minutes: 3, body: "Master overspin before sidespin — dip wins more wickets than turn at every level." },
      { title: "Front-arm pull", minutes: 4, body: "A hard non-bowling-arm pull-down accelerates the bowling shoulder for extra bounce." },
    ],
    audience: {
      Beginner: "A finger-spin ball that turns into a right-hander — the simplest spin variation to start with.",
      Intermediate: "Spread the index and middle fingers along the seam; spin the ball at a wall and check the seam stays upright.",
      Academy: "Add the arm-ball (no spin, holds line) and the carrom-style undercutter for variation under pressure.",
      Pro: "Set bat-pad fields when the ball grips; use the crease angle to attack the off-stump.",
      Coach: "Watch finger callus patterns — the index-finger pad should toughen on the inside edge.",
      Fan: "Top-spin makes the ball dip and 'kick' off the surface — that bounce surprises batters more than turn.",
    },
  },
  "doosra": {
    relatedSims: [SIM.spin, SIM.pitch, SIM.field],
    keyTakeaways: [
      "Looks like an off-break, turns like a leg-break.",
      "Disguise lives in the wrist — not the arm.",
      "Legal action requires elbow flex within the ICC 15° limit.",
    ],
    lessons: [
      { title: "Mirror drill", minutes: 4, body: "Bowl off-break and doosra alternately at a mirror to check identical arm paths." },
      { title: "Back-of-hand release", minutes: 3, body: "Practice spinning a tennis ball with the back of the hand to groove the wrist flip." },
    ],
    audience: {
      Beginner: "A surprise spin ball that turns the 'wrong' way — for now, just watch and learn the seam tell.",
      Intermediate: "Don't chase this before mastering the off-break — the wrist load is high.",
      Academy: "Get filmed in slow-mo to confirm legality before bowling it in matches.",
      Pro: "Use it sparingly — overuse kills the disguise that makes it dangerous.",
      Coach: "Track elbow extension with a goniometer or app; flag anything above 12°.",
      Fan: "The seam tilts toward third man instead of fine leg — that's how you tell a doosra from a stock ball.",
    },
  },
  "yorker": {
    relatedSims: [SIM.swing, SIM.reaction, SIM.field],
    keyTakeaways: [
      "Lands within 30 cm of the popping crease — the tightest margin in cricket.",
      "A braced front leg prevents the yorker becoming a full-toss.",
      "Late swing on a yorker is virtually unplayable.",
    ],
    lessons: [
      { title: "Shoe target drill", minutes: 4, body: "Place a shoe on the yorker spot and bowl 24 balls trying to hit it." },
      { title: "Wide yorker", minutes: 3, body: "Target the wide tramline; even a missed yorker outside off cramps the room for a ramp." },
    ],
    audience: {
      Beginner: "A full ball aimed at the batter's toes — almost impossible to hit if pitched right.",
      Intermediate: "Build accuracy first, pace second. A 120 km/h yorker beats a 140 km/h full-toss every time.",
      Academy: "Work on the death-over yorker variations: wide, in-swinging, scrambled-seam.",
      Pro: "Combine yorkers with slower balls and bouncers to break the batter's pre-meditation.",
      Coach: "Drill the braced front leg in the gym — single-leg landings with 3× body-weight load tolerance.",
      Fan: "Watch where the front foot lands — a collapsing knee turns the yorker into a hittable full-toss.",
    },
  },
  "reverse-swing": {
    relatedSims: [SIM.swing, SIM.pitch, SIM.field],
    keyTakeaways: [
      "Triggers above ~135 km/h with a worn ball.",
      "Ball curves toward the shiny side — opposite of conventional swing.",
      "Seam must stay stable through the flight.",
    ],
    lessons: [
      { title: "Maintain the ball", minutes: 4, body: "Polish one side every over, never the other — legality is sweat-only post-2020." },
      { title: "Late-spell pace", minutes: 4, body: "Reverse rewards bowlers who stay above 135 km/h into the 30th over of a Test." },
    ],
    audience: {
      Beginner: "An 'opposite' swing that happens later in the innings — magic from the worn ball.",
      Intermediate: "Focus on a firm wrist and a stable seam — wobble kills reverse before pace does.",
      Academy: "Pair reverse swing with the cross-seam wobble ball — the contrast is brutal for batters.",
      Pro: "Manage the ball in partnership with the keeper — both sides matter from over one.",
      Coach: "Track ball speed by over and ball-rough side area with photos at drinks breaks.",
      Fan: "Watch the shiny side at the top of the run-up — it tells you which way the ball will swing.",
    },
  },
  "fielding": {
    relatedSims: [SIM.field, SIM.reaction],
    keyTakeaways: [
      "Fielding saves or concedes 20–40 runs an innings at the top level.",
      "Reverse-cup for catches above the eyeline, cup for catches below.",
      "Flat throws at 12° launch angle beat high arms by 0.3 s over 65 m.",
    ],
    lessons: [
      { title: "Soft hands", minutes: 3, body: "Catch by letting the hands give backwards 10–15 cm — kills the rebound." },
      { title: "Flat-throw mechanics", minutes: 4, body: "Plant back-foot side-on, step into the throw with the front foot pointing at the target." },
      { title: "Cutting the angle", minutes: 3, body: "Curve your approach so the throwing shoulder lines up with the stumps — saves the pivot." },
    ],
    audience: {
      Beginner: "Stopping the ball and throwing accurately — the most under-rated cricket skill.",
      Intermediate: "Drill 50 catches a day, alternating high and low. Soft hands are built by repetition.",
      Academy: "Specialise — slip, point, deep, keeper-relay. Each position has its own footwork.",
      Pro: "Track your own dropped-catch and run-out-effected stats — fielding wins T20 leagues.",
      Coach: "Use heart-rate zones in catching drills — under fatigue is when catches are dropped in matches.",
      Fan: "A diving stop in the deep is worth 4 runs, plus the mental weight on the next batter.",
    },
  },
  "wicketkeeping": {
    relatedSims: [SIM.reaction, SIM.field, SIM.spin],
    keyTakeaways: [
      "Keepers are involved in ~25% of all dismissals.",
      "Elite stumping motion completes in 0.08–0.12 s.",
      "Stand back 12–25 m for pace, a metre back for spin.",
    ],
    lessons: [
      { title: "Squat and rise", minutes: 4, body: "Stay low until the ball is released; rise with the bounce, never before." },
      { title: "Stumping flick", minutes: 4, body: "Take the ball, break the bails — no transfer to one hand. Practice with a coach rolling balls past the stumps." },
      { title: "Reading the seam", minutes: 3, body: "Spot the seam angle in flight to anticipate deviation — crucial standing up." },
    ],
    audience: {
      Beginner: "The keeper catches everything the batter misses — the only fielder allowed gloves and pads.",
      Intermediate: "Master squats and quick rises before worrying about diving — footwork beats acrobatics.",
      Academy: "Train reaction with light-board drills and tennis-ball squat catches at 8 m.",
      Pro: "Own the slip cordon — your view of swing and bounce is the team's best intelligence.",
      Coach: "Monitor knee load — keepers do 300+ squats a match. Manage volume in junior players.",
      Fan: "Watch the keeper's feet to spin — a metre back means cutter or arm-ball expected.",
    },
  },
  "cricket-ground": {
    relatedSims: [SIM.pitch, SIM.field],
    keyTakeaways: [
      "Boundary 137–150 m across; 30-yard inner circle for Powerplay rules.",
      "Boundary asymmetry shapes captaincy.",
      "Altitude shortens effective boundary length by ~5%.",
    ],
    lessons: [
      { title: "Boundary walk", minutes: 4, body: "Walk the boundary before the toss — note short square sides and longer straight ones." },
      { title: "Pitch report basics", minutes: 5, body: "Tap for hardness, scan for grass colour, look for cracks and footmark zones." },
      { title: "Sightscreen alignment", minutes: 3, body: "Sightscreens align with the bowler's arm — a misaligned screen halts play." },
    ],
    audience: {
      Beginner: "The ground is oval, 137–150 m across, with a 22-yard pitch in the middle.",
      Intermediate: "Learn the markings: 30-yard circle, danger area, return creases — they govern field and bowling rules.",
      Academy: "Walk every new ground in detail; note boundary distances and outfield speed.",
      Pro: "Match venue analytics — average first-innings score, pace vs spin split — into game plans.",
      Coach: "Build a ground-by-ground playbook with players; venue mastery wins close matches.",
      Fan: "Short square boundaries (e.g. Adelaide) favour batting; long straight ones (MCG) reward bowling full.",
    },
  },
  "the-pitch": {
    relatedSims: [SIM.pitch, SIM.spin, SIM.swing],
    keyTakeaways: [
      "22 yards / 20.12 m long; clay content drives bounce.",
      "Cracks open from day 3 in a Test — spinner's territory.",
      "Clegg hammer measures pitch hardness numerically.",
    ],
    lessons: [
      { title: "Read a pitch", minutes: 4, body: "Press a key into the surface; look for green tinge, cracks and binding." },
      { title: "Pitch types", minutes: 5, body: "Subcontinent dust-bowls, English seamers, Australian bouncers, NZ greentops — each demands a different plan." },
      { title: "Day-by-day evolution", minutes: 4, body: "Day 1–2 pace, day 3 variable bounce, day 4–5 spin and cracks — plan team selection accordingly." },
    ],
    audience: {
      Beginner: "The 22-yard strip in the middle of the ground — the only part of the field that really matters.",
      Intermediate: "A green pitch usually means seam; a dry, cracked pitch favours spin. Read it before you bat.",
      Academy: "Use the Pitch Builder to feel how clay, moisture, and rolling shape bounce and turn.",
      Pro: "Match preparation begins with the pitch — bowling lengths and batting tempos follow from the report.",
      Coach: "Photograph pitches every morning; tracks crack growth and surface change across a match.",
      Fan: "Pitches tell stories — a 200-run day-one total on a green deck is often a great score.",
    },
  },
  "cricket-ball": {
    relatedSims: [SIM.swing, SIM.spin, SIM.pitch],
    keyTakeaways: [
      "155.9–163 g, ~22.7 cm circumference, six-row hand-stitched seam.",
      "Dukes seam stays proud longest; Kookaburra flattens after ~25 overs.",
      "Reverse swing triggers above ~135 km/h with a worn ball.",
    ],
    lessons: [
      { title: "Anatomy", minutes: 3, body: "Cork core, wool winding, leather hemispheres, raised seam — each layer does a job." },
      { title: "Care the ball", minutes: 4, body: "Polish one side, keep the other rough. Sweat only — saliva is banned post-2020." },
      { title: "Red vs white vs pink", minutes: 3, body: "Red lasts longest, white discolours fast, pink swings longer under lights." },
    ],
    audience: {
      Beginner: "A hard leather ball with a stitched seam — heavier and harder than a tennis ball.",
      Intermediate: "Learn to spot the seam direction at release — it tells you swing or spin.",
      Academy: "Bowl 6 with a new ball, 6 with a 40-over-old ball — feel the difference in pace off the deck.",
      Pro: "Brand matters: Dukes for swing-heavy England, Kookaburra for skid in Australia, SG in India.",
      Coach: "Teach ball management as a team skill — every player polishes between overs.",
      Fan: "The shiny side reveals which way the ball will swing — watch the keeper's polishing too.",
    },
  },
  "cricket-bat": {
    relatedSims: [SIM.bat, SIM.reaction],
    keyTakeaways: [
      "Max 96.5 cm long, 10.8 cm wide. Weight typically 1.1–1.4 kg.",
      "Sweet spot ~15 cm above the toe — coefficient of restitution ≈ 0.55.",
      "Knock-in for 6+ hours before first use.",
    ],
    lessons: [
      { title: "Pick by feel", minutes: 4, body: "Pickup matters more than weight — a 1.2 kg bat that swings fast beats a 1.1 kg dead-feel one." },
      { title: "Knock-in routine", minutes: 5, body: "50 mallet hits a night for 2 weeks before facing a hard ball." },
      { title: "Grain reading", minutes: 3, body: "8–12 straight tight grains = Grade-1 willow. Fewer grains = harder and longer-lasting." },
    ],
    audience: {
      Beginner: "A wooden bat with a flat face, used to hit the ball. Pick one that's easy to swing.",
      Intermediate: "Learn to knock in your own bat; oil it lightly and store it dry.",
      Academy: "Configure your bat for your style with the Bat Builder — pickup, edge thickness, sweet-spot height.",
      Pro: "Sponsor bats are tuned to spec — many pros carry 4–6 bats, swapping by format and ball condition.",
      Coach: "Match bat weight to player frame — over-heavy bats slow swing and ruin shot timing.",
      Fan: "Modern thick edges (40–45 mm) explain why mishits clear the rope — physics, not just power.",
    },
  },
  "wickets-and-stumps": {
    relatedSims: [SIM.field, SIM.reaction],
    keyTakeaways: [
      "Three stumps 71.1 cm tall, total width 22.86 cm.",
      "Bails dislodge with as little as ~0.08 N of force.",
      "LED 'Zing' bails flash on impact — standard in T20 since 2012.",
    ],
    lessons: [
      { title: "Anatomy", minutes: 3, body: "Three stumps, two bails resting in V-grooves — any contact and the bail flicks off." },
      { title: "LBW geometry", minutes: 4, body: "Wickets-hit zone is a 22.86 × 71.1 cm virtual rectangle — ball-tracking projects onto it." },
      { title: "Run-out rules", minutes: 3, body: "At least one bail must be dislodged. If bails are off, a stump must be uprooted with ball in hand." },
    ],
    audience: {
      Beginner: "Three sticks behind the batter. Knock the bails off and you're bowled.",
      Intermediate: "Learn the LBW basics — pitching in line, impact in line, hitting the stumps.",
      Academy: "Drill stumping speed with a coach rolling balls past the stumps from a metre out.",
      Pro: "Captains plan dismissals around the stumps' geometry — bowled, LBW, stumped, run-out.",
      Coach: "Set up run-out drills with single-stump targets at 20 m for fielding sessions.",
      Fan: "Watch LED bails light up on TV — they confirm the exact dislodgement moment for the third umpire.",
    },
  },
};

export function getTopicExtras(slug: string): TopicExtras | undefined {
  return EXTRAS[slug];
}

// Quick view of which sim slugs a topic links to — used by the topics index.
export function getTopicRelatedSims(slug: string): string[] {
  return EXTRAS[slug]?.relatedSims ?? [];
}

// Quizzes for the newly added topics surfaced into Quiz Zone.
// Re-uses each topic's `quiz` array.
import { TOPICS } from "@/lib/topics";

export const TOPIC_QUIZ_SLUGS = [
  "fielding",
  "wicketkeeping",
  "cricket-ground",
  "the-pitch",
  "cricket-ball",
  "cricket-bat",
  "wickets-and-stumps",
];

export function topicQuizzes() {
  return TOPICS.filter(t => TOPIC_QUIZ_SLUGS.includes(t.slug)).map(t => ({
    id: `topic-${t.slug}`,
    moduleSlug: "topics",
    title: `${t.title} — Topic Quiz`,
    xp: 40,
    questions: t.quiz.map(q => ({ q: q.q, options: q.options, answer: q.answer, explain: q.explain })),
  }));
}

// Type guard helper for the Topic shape (no runtime change needed).
export type TopicWithExtras = Topic & { extras?: TopicExtras };
