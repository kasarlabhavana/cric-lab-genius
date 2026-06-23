export type AudienceLevel = "Child" | "Beginner" | "Intermediate" | "Academy" | "Pro" | "Coach" | "Fan";

export type Lesson = {
  slug: string;
  title: string;
  minutes: number;
  summary: string;
  body: string[];
  diagram?: "trajectory" | "pitch" | "force" | "swing";
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Quiz = {
  id: string;
  moduleSlug: string;
  title: string;
  xp: number;
  questions: QuizQuestion[];
};

export type Module = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  icon: string; // lucide name
  tint: string; // tailwind color class for soft bg
  levels: AudienceLevel[];
  lessons: Lesson[];
};

export const MODULES: Module[] = [
  {
    slug: "bowling-science",
    title: "Bowling Science",
    tagline: "The physics of pace, spin & seam",
    intro: "How a bowler turns biomechanics, aerodynamics and pitch behavior into wickets — from the run-up to the moment the ball leaves the hand.",
    icon: "Target",
    tint: "from-[oklch(0.74_0.18_55_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro", "Coach"],
    lessons: [
      { slug: "anatomy-of-an-action", title: "Anatomy of a Bowling Action", minutes: 6, summary: "Five phases from run-up to follow-through, decoded.", body: ["Every bowling action breaks down into five biomechanical phases: run-up, pre-delivery stride, back-foot contact, front-foot contact and release.", "The hips and shoulders separate during back-foot contact, storing elastic energy in the trunk — the 'separation angle' is one of the strongest predictors of pace.", "Front-foot contact transfers ground reaction force up the kinetic chain. A braced front leg can return forces of 8-10× body weight, which the trunk and arm convert into ball speed."], diagram: "force" },
      { slug: "swing-aerodynamics", title: "Why a Cricket Ball Swings", minutes: 8, summary: "Boundary layers, seam angle, and the magic of conventional swing.", body: ["Conventional swing happens because one side of the ball is polished smooth and the other is rough. Air flowing over each side separates at different points, producing a sideways pressure difference.", "Seam angle matters: 15-20° toward the slips gives the seam enough exposure to trip the airflow on one side into turbulence.", "Reverse swing flips the script — at speeds above ~135 km/h with a worn ball, both sides go turbulent but the rough side separates later, pulling the ball the opposite way."], diagram: "swing" },
      { slug: "spin-revolutions", title: "Spin: RPM, Drift & Dip", minutes: 7, summary: "How revs create the Magnus force that shapes a spinner's threat.", body: ["A finger or wrist spinner imparts 1,500-2,500 RPM at release. Those revolutions create the Magnus effect — a sideways or downward force as air is deflected around the spinning ball.", "Top-spin produces dip, drawing the ball down sooner and shortening the perceived length.", "Side-spin produces drift in the air before turn off the pitch — the double-deception that great spinners live on."] },
      { slug: "pace-and-the-kinetic-chain", title: "Pace and the Kinetic Chain", minutes: 6, summary: "Why the fastest bowlers are not the strongest people.", body: ["Pace comes from sequencing, not raw strength. Energy flows from legs → hips → trunk → shoulder → elbow → wrist in a precisely timed whip.", "A 1% improvement in sequencing efficiency can add 2-3 km/h without any extra effort.", "This is why technique work usually beats gym work for adding pace, especially before age 18 when growth plates are still active."] },
      { slug: "release-angles", title: "Release Angles & Trajectories", minutes: 5, summary: "Geometry behind yorkers, bouncers and good-length deliveries.", body: ["A 145 km/h yorker leaves the hand at roughly -2.5° below horizontal and lands within 30cm of the batter's toes after travelling 17.7m.", "A bouncer leaves at +3-4° above horizontal so it can clear the batter's chest after one bounce.", "Good-length releases hover around 0°, exploiting the batter's indecision between front foot and back foot."], diagram: "trajectory" },
    ],
  },
  {
    slug: "batting-science",
    title: "Batting Science",
    tagline: "Reaction time, geometry & shot selection",
    intro: "How elite batters compress 0.4 seconds of flight time into a stable, repeatable decision — and the geometry that turns a good shot into a great one.",
    icon: "Swords",
    tint: "from-[oklch(0.66_0.16_148_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro", "Coach"],
    lessons: [
      { slug: "reaction-time", title: "The 400-Millisecond Window", minutes: 6, summary: "What batters actually see, and when.", body: ["A 145 km/h delivery reaches the batter in about 440 ms. Roughly 200 ms is consumed by visual processing and motor planning, leaving only ~240 ms to commit and execute.", "Top batters use 'predictive looking' — saccading from the bowler's hand to the predicted bounce point well before the ball arrives.", "The skill is not faster reaction but earlier and better information gathering."] },
      { slug: "head-position", title: "Head Position Drives Balance", minutes: 5, summary: "Why coaches obsess over a still head.", body: ["The head is heavy (~5kg) and sits on a flexible spine. Any rotation or drop pulls the body's center of mass off line.", "A still head over the front knee lets the eyes track the ball binocularly with minimal parallax.", "Most front-foot dismissals trace back to the head falling sideways at release."] },
      { slug: "shot-geometry", title: "Shot Geometry & Wagon Wheels", minutes: 7, summary: "Bat angle, contact zone, and where the runs really live.", body: ["For a right-handed batter facing right-arm-over, the V between mid-on and mid-off is the highest-percentage zone — bat face and ball line align naturally.", "Cross-bat shots (pull, cut, sweep) require precise contact 30-60cm in front of the body to keep elevation controlled.", "Modern T20 wagon wheels show top batters scoring 65-70% of runs in just three zones — pre-meditation pays."] },
      { slug: "footwork-physics", title: "Footwork as Energy Transfer", minutes: 6, summary: "Why a half-stride beats a lunge.", body: ["A controlled half-stride keeps the trunk stacked over the hips, allowing the bat to swing through a wide arc with minimal mid-shot correction.", "A full lunge over-commits the center of mass, removing the option to abort against late movement.", "Train footwork like a tennis split-step: a tiny pre-movement, then commit."] },
      { slug: "power-vs-timing", title: "Power vs Timing", minutes: 5, summary: "Bat speed at impact is everything.", body: ["Exit velocity off the bat is governed by bat speed at the contact point, contact location (sweet spot is 6-10cm above the toe), and how solidly the wrists are cocked.", "A timed shot at 110 km/h bat speed travels farther than a muscled shot at 130 km/h that misses the sweet spot by 2cm.", "Big hitters generate bat speed from torso rotation, not arms."] },
    ],
  },
  {
    slug: "fielding-science",
    title: "Fielding Science",
    tagline: "Anticipation, angles & athletic intent",
    intro: "Fielding wins more games than most fans realize. Here is the science of cutting angles, catching under pressure and throwing flat.",
    icon: "Hand",
    tint: "from-[oklch(0.6_0.12_220_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro"],
    lessons: [
      { slug: "cutting-angles", title: "Cutting Angles in the Outfield", minutes: 5, summary: "The straightest path is rarely the fastest.", body: ["Elite outfielders curve their run, attacking the ball at an angle that lines up the throwing shoulder with the stumps.", "A 3° better attack angle saves roughly 0.4 seconds on the throw — often the difference between run-out and not."] },
      { slug: "catching-under-pressure", title: "Catching Under Pressure", minutes: 6, summary: "Eyes, hands and the perception of time.", body: ["Under stress, perceived ball speed increases by 10-15% due to cortisol's effect on visual processing.", "Soft hands absorb the ball over a longer distance, reducing peak deceleration and the chance of rebound.", "Pre-catch breathing routines flatten the cortisol spike and restore normal perception."] },
      { slug: "flat-throws", title: "Flat Throws & Release Height", minutes: 5, summary: "Why low trajectories beat the rocket arm.", body: ["A 65m throw at a 12° launch angle reaches the keeper 0.3s faster than the same throw at 30°.", "Flatter throws also reach the keeper at a catchable height for stumping with no extra movement."] },
    ],
  },
  {
    slug: "pitch-science",
    title: "Pitch Science",
    tagline: "Soil, moisture & the surface story",
    intro: "Every pitch is a soil-mechanics story. Learn to read it before the toss.",
    icon: "LayoutGrid",
    tint: "from-[oklch(0.55_0.18_300_/_0.10)] to-transparent",
    levels: ["Intermediate", "Academy", "Pro", "Coach", "Fan"],
    lessons: [
      { slug: "soil-and-bounce", title: "Soil Composition & Bounce", minutes: 6, summary: "Clay content predicts behavior.", body: ["High-clay pitches (Australia, South Africa) compress tightly and produce true, even bounce.", "Low-clay, silty pitches (subcontinent) crumble faster, gripping spin from day two.", "Clay percentage above 50% is the rough threshold for sustained pace and bounce."], diagram: "pitch" },
      { slug: "moisture-and-seam", title: "Moisture, Grass & Seam Movement", minutes: 5, summary: "Why morning sessions favor swing and seam.", body: ["A pitch with 8-12mm of live grass and slight surface moisture gives the seam something to grip on impact.", "As the sun dries the surface during day one, seam movement reduces and batting eases."] },
      { slug: "day-by-day-evolution", title: "How a Pitch Changes Over Five Days", minutes: 7, summary: "The classic Test arc.", body: ["Day 1-2: Pace and seam dominate as the surface is fresh.", "Day 3: Cracks open, bounce becomes variable.", "Day 4-5: Surface dust feeds spinners; bounce becomes uneven and dangerous."] },
    ],
  },
  {
    slug: "ball-science",
    title: "Ball Science",
    tagline: "Leather, lacquer & 6 ounces of physics",
    intro: "From the cork core to the proud seam, every part of the cricket ball does a job.",
    icon: "CircleDot",
    tint: "from-[oklch(0.6_0.22_27_/_0.10)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Fan"],
    lessons: [
      { slug: "anatomy-of-a-ball", title: "Anatomy of a Cricket Ball", minutes: 5, summary: "Cork, wool, leather, lacquer, seam.", body: ["A standard ball weighs 155.9-163.0g and measures 22.4-22.9cm in circumference.", "The cork core is wound with wool yarn, encased in four pieces of leather joined by the raised seam of ~80 stitches."] },
      { slug: "red-vs-white-vs-pink", title: "Red vs White vs Pink", minutes: 5, summary: "Why each ball behaves differently.", body: ["Red balls have a natural lacquer that wears predictably, helping reverse swing later.", "White balls scuff faster and lose hardness, which is why they often get changed at the 35-over mark in ODIs.", "Pink balls have an extra polyurethane coat for visibility under lights — they swing longer but spin less."] },
      { slug: "lifecycle-shine-scuff", title: "The Shine-and-Scuff Lifecycle", minutes: 6, summary: "Why one side is loved and one is left alone.", body: ["The shiny side maintains laminar airflow; the rough side trips the boundary layer into turbulence.", "Sweat is allowed on the ball; saliva is no longer permitted post-2020 ICC rule change."] },
    ],
  },
  {
    slug: "environment-science",
    title: "Environment Science",
    tagline: "Weather, altitude & the unseen 12th player",
    intro: "Humidity, dew, wind and altitude quietly decide more matches than any captain.",
    icon: "CloudSun",
    tint: "from-[oklch(0.6_0.12_220_/_0.10)] to-transparent",
    levels: ["Intermediate", "Academy", "Pro", "Fan"],
    lessons: [
      { slug: "humidity-and-swing", title: "Does Humidity Really Help Swing?", minutes: 5, summary: "The myth, the data, and the truth.", body: ["Humidity itself barely affects airflow — air viscosity changes by less than 1% across normal humidity ranges.", "What matters is cloud cover, which keeps the pitch and ball cooler and damper, preserving the conditions that help the seam grip and the lacquer hold."] },
      { slug: "dew-factor", title: "The Dew Factor", minutes: 4, summary: "Why winning the toss matters more after sunset.", body: ["A wet ball is hard to grip, killing spin and reverse swing while making the outfield faster.", "In day-night matches in humid venues, the side bowling second often loses 15-20 runs in expected economy."] },
      { slug: "altitude", title: "Altitude & Ball Flight", minutes: 5, summary: "Thinner air, longer sixes.", body: ["At 1,500m elevation (Johannesburg, Dharamsala) air density drops ~15%, reducing aerodynamic drag and increasing six-hitting distance by 6-8%.", "Swing also reduces because the same air pressure differential exerts less force."] },
    ],
  },
  {
    slug: "fitness-science",
    title: "Fitness Science",
    tagline: "Strength, endurance & longevity",
    intro: "Cricket is repeated short bursts over long days — train for it correctly.",
    icon: "Dumbbell",
    tint: "from-[oklch(0.74_0.18_55_/_0.10)] to-transparent",
    levels: ["Academy", "Pro", "Coach"],
    lessons: [
      { slug: "energy-systems", title: "Energy Systems in Cricket", minutes: 6, summary: "ATP-PCr, glycolytic, aerobic — and when each fires.", body: ["A single sprint between wickets uses the ATP-PCr system — recovery in 60-90s.", "A long fast-bowling spell taps glycolytic energy; lactic acid clearance is the limiting factor.", "Aerobic base supports recovery between balls, overs and innings — it is the silent foundation."] },
      { slug: "injury-prevention", title: "Injury Prevention for Fast Bowlers", minutes: 7, summary: "Workload, side strain & stress fractures.", body: ["Acute:chronic workload ratios above 1.5 sharply increase stress fracture risk in lumbar vertebrae.", "Side strains correlate with sudden spikes in deliveries-per-week, especially in adolescents."] },
    ],
  },
  {
    slug: "umpiring-science",
    title: "Umpiring Science",
    tagline: "Decision-making, technology & the laws",
    intro: "Behind every raised finger sits visual processing, probability and the modern technology stack.",
    icon: "Scale",
    tint: "from-[oklch(0.24_0.06_258_/_0.10)] to-transparent",
    levels: ["Intermediate", "Academy", "Pro", "Coach", "Fan"],
    lessons: [
      { slug: "lbw-logic", title: "The LBW Decision Tree", minutes: 6, summary: "Pitching, impact, hitting — in that order.", body: ["The umpire mentally answers three questions in sequence: pitched in line? impact in line (or struck no shot)? would it hit the stumps?", "A 'no' to any earlier question kills the appeal regardless of what follows."] },
      { slug: "drs-technology", title: "How DRS Technology Works", minutes: 7, summary: "Hawk-Eye, UltraEdge, ball-tracking margins.", body: ["Hawk-Eye uses 6-10 high-speed cameras to triangulate ball position in 3D space at 340 fps.", "UltraEdge syncs stump microphones with super-slow visuals to detect contact within a 2ms window.", "The 'umpire's call' margin accounts for tracking uncertainty of roughly half a ball width."] },
    ],
  },
];

export const MODULE_BY_SLUG: Record<string, Module> = Object.fromEntries(MODULES.map(m => [m.slug, m]));

import { topicQuizzes } from "@/lib/topic-extras";

const MODULE_QUIZZES: Quiz[] = MODULES.map(m => ({
  id: `${m.slug}-starter`,
  moduleSlug: m.slug,
  title: `${m.title} — Starter Quiz`,
  xp: 50,
  questions: starterQuestionsFor(m.slug),
}));

const TOPIC_QUIZZES: Quiz[] = topicQuizzes();

export const QUIZZES: Quiz[] = [...MODULE_QUIZZES, ...TOPIC_QUIZZES];

export const QUIZ_BY_ID: Record<string, Quiz> = Object.fromEntries(QUIZZES.map(q => [q.id, q]));

function starterQuestionsFor(slug: string): QuizQuestion[] {
  const bank: Record<string, QuizQuestion[]> = {
    "bowling-science": [
      { q: "What causes conventional swing in a cricket ball?", options: ["A heavier core on one side", "Different airflow over the shiny vs rough side", "Wind direction at the ground", "The bowler's grip strength"], answer: 1, explain: "One side is polished, the other rough — creating an asymmetric boundary layer and a sideways force." },
      { q: "Roughly how many RPM does an elite finger spinner impart?", options: ["200-500", "1,500-2,500", "5,000-7,000", "10,000+"], answer: 1, explain: "1,500-2,500 RPM is the elite range. Higher revs produce more drift, dip and turn." },
      { q: "Which phase produces peak ground reaction force?", options: ["Run-up", "Back-foot contact", "Front-foot contact", "Follow-through"], answer: 2, explain: "Front-foot contact returns 8-10× body weight, which gets channeled up the kinetic chain." },
    ],
    "batting-science": [
      { q: "Approximately how long does a 145 km/h ball take to reach the batter?", options: ["240 ms", "440 ms", "640 ms", "840 ms"], answer: 1, explain: "About 440 ms total — only ~240 ms is available for actual decision and movement." },
      { q: "Why is a still head so important?", options: ["It looks professional", "It keeps the eyes binocular and the center of mass stable", "It improves bat grip", "It prevents helmet movement"], answer: 1, explain: "A still head means stable eyes and balanced weight transfer." },
      { q: "Where is the sweet spot on a cricket bat?", options: ["At the very toe", "6-10cm above the toe", "On the splice", "On the handle"], answer: 1, explain: "The sweet spot sits 6-10cm above the toe, where the bat has minimal vibration." },
    ],
    "fielding-science": [
      { q: "Why do outfielders curve their run to the ball?", options: ["To look stylish", "To align the throwing shoulder with the stumps", "To confuse the batter", "It's required by the laws"], answer: 1, explain: "A curved approach lines up the throw without an extra pivot — saving precious time." },
      { q: "What is the ideal launch angle for a long flat throw to the keeper?", options: ["~12°", "~30°", "~45°", "~60°"], answer: 0, explain: "Around 12° beats higher angles by 0.3s over 65m and arrives at a catchable height." },
    ],
    "pitch-science": [
      { q: "What soil property most predicts true, even bounce?", options: ["Silt content", "Clay content above ~50%", "Sand percentage", "Grass length"], answer: 1, explain: "High clay content compresses tightly and produces predictable pace and bounce." },
      { q: "Why does a Test pitch typically spin more on days 4-5?", options: ["The ball is older", "Surface dust and cracks give spinners more grip and variable bounce", "Umpires allow more spin", "Bowlers tire and bowl slower"], answer: 1, explain: "The surface breaks down, exposing dry soil that grips the seam." },
    ],
    "ball-science": [
      { q: "Why does a pink ball swing for longer than a red ball?", options: ["Larger seam", "Extra polyurethane coating maintains shine longer", "Heavier core", "Cooler temperature at night"], answer: 1, explain: "The PU coat preserves the shiny side, so swing-conducive airflow lasts further into the innings." },
      { q: "Approximately how many stitches form a cricket ball's seam?", options: ["~20", "~50", "~80", "~120"], answer: 2, explain: "About 80 hand stitches across six rows give the seam its prominence." },
    ],
    "environment-science": [
      { q: "What actually changes more with cloud cover than humidity?", options: ["Ball weight", "Pitch and ball temperature, preserving lacquer and seam grip", "Wind speed", "Light meter readings only"], answer: 1, explain: "It is the temperature and moisture preservation under clouds that helps the ball, not humidity itself." },
      { q: "Why do sixes travel farther in Johannesburg?", options: ["Larger bats are used", "Air density at altitude drops ~15%, reducing drag", "Smaller boundaries by rule", "Lighter ball at altitude"], answer: 1, explain: "Thinner air means less drag — six-hitting distance increases 6-8%." },
    ],
    "fitness-science": [
      { q: "Which energy system fuels a single sprint between wickets?", options: ["Aerobic", "ATP-PCr", "Lactic / glycolytic", "Beta-oxidation"], answer: 1, explain: "ATP-PCr handles all-out efforts under ~10s; full recovery in 60-90s." },
      { q: "What workload metric best predicts fast-bowling stress fractures?", options: ["Total km run", "Acute:chronic workload ratio above 1.5", "Body weight", "Sleep hours"], answer: 1, explain: "Spikes relative to recent baseline are the strongest predictor." },
    ],
    "umpiring-science": [
      { q: "What is the first question in the LBW decision tree?", options: ["Was the batter playing a shot?", "Did it pitch in line?", "Would it hit the stumps?", "Was there an edge?"], answer: 1, explain: "Pitching in line comes first — a no here ends the appeal unless the impact was outside off." },
      { q: "How many frames per second do Hawk-Eye cameras capture?", options: ["60", "120", "340", "1,000"], answer: 2, explain: "Around 340 fps, allowing precise triangulation of ball position." },
    ],
  };
  return bank[slug] ?? [
    { q: "Sample question for this module.", options: ["A", "B", "C", "D"], answer: 0, explain: "Sample explanation." },
  ];
}

export const LABORATORY_SIMS = [
  { slug: "spin-simulator", title: "Spin Simulator", summary: "Dial RPM, speed, release angle, pitch, humidity and wind — read drift, dip, turn and bounce.", icon: "Disc3" },
  { slug: "swing-simulator", title: "Swing Simulator", summary: "Tweak seam angle, ball wear and pace to see swing direction and magnitude.", icon: "Wind" },
  { slug: "pitch-builder", title: "Pitch Builder", summary: "Compose a surface from grass, clay, moisture, temperature and rolling time. Read bounce, turn and swing assistance.", icon: "LayoutGrid" },
  { slug: "bat-builder", title: "Bat Builder", summary: "Configure willow grade, weight, edge and sweet-spot height — see swing speed and power transfer.", icon: "Swords" },
  { slug: "reaction-time-test", title: "Reaction Time Test", summary: "Test your sub-500ms decision speed against international benchmarks.", icon: "Timer" },
  { slug: "field-placement-simulator", title: "Field Placement Simulator", summary: "Drop nine fielders on a 2D ground and visualise gaps versus a wagon wheel.", icon: "Grid3x3" },
];


export const BADGES = [
  { id: "first-step", title: "First Step", desc: "Complete your first lesson", icon: "Footprints" },
  { id: "curious-mind", title: "Curious Mind", desc: "Finish 5 lessons", icon: "Brain" },
  { id: "scholar", title: "Scholar", desc: "Finish 25 lessons", icon: "GraduationCap" },
  { id: "quiz-rookie", title: "Quiz Rookie", desc: "Pass your first quiz", icon: "BadgeCheck" },
  { id: "quiz-master", title: "Quiz Master", desc: "Pass 10 quizzes", icon: "Trophy" },
  { id: "bowler-bookworm", title: "Bowler Bookworm", desc: "Complete Bowling Science", icon: "Target" },
  { id: "batters-eye", title: "Batter's Eye", desc: "Complete Batting Science", icon: "Swords" },
  { id: "groundskeeper", title: "Groundskeeper", desc: "Complete Pitch Science", icon: "LayoutGrid" },
  { id: "weatherman", title: "Weather Reader", desc: "Complete Environment Science", icon: "CloudSun" },
  { id: "streak-3", title: "On A Roll", desc: "3-day learning streak", icon: "Flame" },
  { id: "streak-7", title: "Week Warrior", desc: "7-day streak", icon: "Flame" },
  { id: "lab-rat", title: "Lab Rat", desc: "Try a Laboratory simulation", icon: "FlaskConical" },
] as const;

export type BadgeId = (typeof BADGES)[number]["id"];
