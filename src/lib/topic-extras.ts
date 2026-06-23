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

export type FamousPlayer = {
  name: string;
  team?: string;
  note: string;
};

export type TopicExtras = {
  relatedSims: string[]; // laboratory sim slugs
  keyTakeaways: string[];
  lessons: ShortLesson[];
  audience: Record<Audience, string>;
  famousPlayers?: FamousPlayer[];
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
      Beginner:
        "A leg break is a 'magic' spinning ball: a right-arm bowler flicks it out of the side of the hand, the ball lands on the pitch, and instead of carrying straight on it jumps sideways — away from a right-handed batter, toward the slip fielders. As a starter, you don't need to bowl one yet — just watch how the ball curves in the air and then turns the other way off the pitch. The first thing to learn is to recognise it: if the seam looks tilted toward first slip when the ball leaves the hand, it's a leg break.",
      Intermediate:
        "At this level you should be trying to actually bowl the delivery. Grip the ball with two fingers across the seam and the third (ring) finger bent against the side; the ring finger does the work, flicking the ball out so it spins from leg to off. Aim for a stock ball pitched on a fourth-stump good length and start by getting six balls in six landing in a one-metre square — accuracy first, then revs. A wall drill with a tennis ball is the best way to groove the wrist flick without tiring your shoulder.",
      Academy:
        "Build a stock ball that you can repeat with a measurable revs target (1,500+ RPM on a phone slow-mo count) and a consistent forward-tilted axis. Once the stock ball is reliable, layer the variations one at a time over a 4–6 week block: the top-spinner (axis tilted further forward for extra dip and skid), the slider (back-spin, holds its line), and the wrong'un only after a coach has filmed your action to confirm it is repeatable without elbow extension. Track every session with seam-photo evidence at release.",
      Pro: 
        "Bowling decisions are now conditional on surface, batter, and ball age. On a hard SG ball in the subcontinent, a square axis maximises grip; under English lights with a Dukes, tilt the axis forward to use late drift into the pads as your primary wicket-taking mode. Plan over-by-over field changes around a two-ball trap — a stock leg break drifting in, followed by the slider holding its line — and quantify your expected wicket value by phase, not by economy alone.",
      Coach:
        "Cue the bowler with the door-knob wrist image and a strong front-leg block; the most common technical fault you will see is a collapsing front knee that lowers the release and kills dip. Use a between-overs camera workflow: a single side-on slow-motion clip per spell is enough to monitor seam position and arm path drift. For junior bowlers, prioritise spin volume (revs) over accuracy in the first 18 months — accuracy is much easier to add later than revs.",
      Fan:
        "Watch the seam as the ball leaves the hand: if it's tilted toward the slips, that's a leg break, and you should expect late drift toward the batter's pads followed by turn away from the bat after pitching. The really good ones — Warne, Kumble, Yasir Shah, Rashid — combine drift and dip so the batter is committed to a length the ball never actually reaches. The 'fizz' you sometimes hear in stump-mics is the seam slicing air at 2,000+ RPM.",
    },
    famousPlayers: [
      { name: "Shane Warne", team: "Australia", note: "The most influential leg-spinner ever. 708 Test wickets. His 1993 'Ball of the Century' to Mike Gatting — drifting in toward leg, ripping past the outside edge to hit off — defined the modern leg-break." },
      { name: "Anil Kumble", team: "India", note: "619 Test wickets with a flatter, faster trajectory than the classical wrist-spinner. Used top-spin and bounce more than huge turn — took all 10 in an innings vs Pakistan, 1999." },
      { name: "Yasir Shah", team: "Pakistan", note: "Fastest to 200 Test wickets (33 matches). Big, looping leg-breaks paired with a sharp googly that beat both edges in Test conditions worldwide." },
      { name: "Rashid Khan", team: "Afghanistan", note: "T20's premier leg-spinner — quick through the air at 90+ km/h, minimal loop, devastating googly. Has redefined what a wrist-spinner can do in death overs." },
      { name: "Shubhanshu Bhandari & Shreyas Gopal era", team: "Modern domestic", note: "Show how the discipline now spans formats: white-ball leggies bowl flatter and quicker, red-ball leggies still float and rip." },
    ],
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
      Beginner:
        "An off break is a finger-spinner's ball that, to a right-handed batter, turns from the off side back into the bat. The grip is simple: spread your index and middle fingers along the seam, hold the ball lightly, and 'rip' the seam down with the index finger as you release. Start by bowling at a single stump from 10 metres and just try to land it in line — turn comes naturally once the action is clean.",
      Intermediate:
        "Now work on a measurable spin profile: a stock ball that lands on a fourth-stump line, drops on the batter (top-spin component), and turns 5–10° off the pitch. Add the arm-ball (held across the seam, no spin, holds line) as your first variation; that single contrast doubles the threat of the stock ball. Pay attention to your follow-through — a strong front-arm pull-down and a tall release at roughly your standing reach is what produces bounce, which is the off-spinner's most under-used weapon.",
      Academy:
        "Build a four-ball menu: stock off-break, arm-ball, top-spinner (over-spin only, dips and goes straight), and an under-cutter for variation. Each must come from an identical run-up and arm path; train them blind, with a coach calling the delivery a second before the ball lands. Begin to use the crease — bowling wide of the return crease creates angle; coming close to the stumps creates LBW threat from the ball that grips and turns.",
      Pro:
        "At this level the off break is a system: matchup-driven field settings, set bat-pad on gripping surfaces, deep cover and deep midwicket on flat ones, and a clear plan for left-handers (around the wicket, ball turning away). Manage your over-rate and seam wear deliberately — the natural deterioration of a Kookaburra often gives you a 25–35 over window where the seam is hardest, then a second window from over 50 where roughness on one side creates drift.",
      Coach:
        "Watch finger callus patterns on the index-finger pad — they tell you if the bowler is genuinely ripping the ball or pushing it. Track release height with a side-on camera and a fixed reference (the sightscreen frame works); 90% of off-spinners who plateau have lost 10–15 cm of release height through a collapsing front side. Use small-sided games with target zones to reward dipping flight rather than flat darts.",
      Fan:
        "The off-spinner's biggest weapon is not always turn — it's the dip and bounce that come from heavy over-spin. Watch where the batter's bat ends up: if they are playing for a length 30 cm shorter than where the ball actually pitches, the bowler has used flight, not just spin. Ravichandran Ashwin, Nathan Lyon and Muralitharan have all been masters of this 'invisible' dip.",
    },
    famousPlayers: [
      { name: "Muttiah Muralitharan", team: "Sri Lanka", note: "All-time leading Test wicket-taker (800). Hyper-flexible wrist let him rip the off-break with leg-spin-level revs — and produced the doosra without a visible change of action." },
      { name: "Ravichandran Ashwin", team: "India", note: "500+ Test wickets. Master of subtle release variations — uses the carrom-ball, slider and overspun off-break to attack both edges. Top wicket-taker vs LH batters in his era." },
      { name: "Nathan Lyon", team: "Australia", note: "500+ Test wickets bowling 'classical' off-spin — tall release, big over-spin, dip and bounce on hard Australian decks." },
      { name: "Jim Laker", team: "England", note: "19 for 90 against Australia at Old Trafford, 1956 — still the greatest off-spin bowling performance in a Test match." },
      { name: "Saqlain Mushtaq", team: "Pakistan", note: "Inventor of the modern doosra and one of the most influential off-spin coaches of the 21st century." },
    ],
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
      Beginner:
        "The doosra is a surprise version of the off-break that turns the 'wrong way' — instead of coming back into a right-handed batter, it spins away toward the slips. You don't need to try to bowl this yet; for now, just learn to spot it. If an off-spinner's seam is tilted toward third man rather than fine leg, that's the doosra leaving the hand.",
      Intermediate:
        "Do not try to add the doosra to your bowling before you have a fully reliable stock off-break and arm-ball. The wrist load is significant, the technique is unforgiving, and an unconfirmed action can quickly become a permanent bad habit. If you do start exploring it, work only on a tennis ball, only in short sessions, and only under direct coaching supervision.",
      Academy:
        "Treat the doosra as a long-term project — typically 18–24 months of dedicated work — and have your action filmed in high-speed (240+ fps) every 4–6 weeks, with elbow extension measured frame by frame. Never bowl it in a match before independent biomechanical confirmation that you are inside the ICC 15° tolerance. Use a back-of-the-hand tennis-ball drill daily to groove the wrist position without overloading the elbow.",
      Pro:
        "Use the doosra as a surprise weapon, no more than 1–2 per over and rarely more than 4–5 per spell, so disguise survives. Plan it into clear two-ball traps — an off-break that grips and turns in, followed by the doosra holding the line — and manage your action under fatigue, when subtle elbow extension can creep in unnoticed.",
      Coach:
        "Insist on biomechanics screening before any junior bowler attempts the doosra in matches; record elbow extension with a goniometer or a validated phone app and flag anything trending above 12°. Track total deliveries per session and de-load aggressively if technique fragments — the doosra is the single most common driver of action remediation in modern spin coaching.",
      Fan:
        "When an off-spinner suddenly turns the ball away from a right-hander, that's the doosra. The easiest tell is the seam: a stock off-break has the seam tilted toward fine leg, a doosra has it tilted toward third man. Murali, Saqlain and Saeed Ajmal built entire match-winning careers around mastering the disguise — and several have had to remodel their actions to keep the delivery legal.",
    },
    famousPlayers: [
      { name: "Saqlain Mushtaq", team: "Pakistan", note: "Pioneered the delivery in the late 1990s. Coined the term doosra ('the other one') and used it to baffle a generation of batters." },
      { name: "Muttiah Muralitharan", team: "Sri Lanka", note: "Combined the stock off-break and the doosra into perhaps the most unplayable off-spin attack ever. His congenitally bent arm and rotating wrist were independently cleared by the ICC's biomechanics panel." },
      { name: "Saeed Ajmal", team: "Pakistan", note: "World No. 1 spinner in 2011–13. His doosra was so effective that his action was reported and remodelled in 2014 — a cautionary tale on legality and longevity." },
      { name: "Sunil Narine", team: "West Indies", note: "T20's most feared mystery spinner. Bowls a knuckle-ball doosra variant with near-zero release tell." },
      { name: "Ravichandran Ashwin", team: "India", note: "Has bowled a back-of-the-hand doosra variant sporadically in white-ball cricket while keeping his Test action conservatively orthodox." },
    ],
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
      Beginner:
        "A yorker is a ball aimed right at the batter's toes — so full that the batter has almost no time to bring the bat down before the ball reaches the stumps or the pads. It's one of the hardest balls in cricket to hit cleanly. As a starter, focus on bowling a 'full' length consistently before you worry about pinpoint accuracy; the yorker is just a perfected version of that length.",
      Intermediate:
        "Begin pinpoint practice with a target drill — a shoe, a coin, or a cone on the yorker spot — and bowl 24 balls a session at it, scoring 1 for a yorker, 0 for a half-volley, and -1 for a full-toss. Build accuracy before pace; a 120 km/h yorker that lands every time beats a 140 km/h full-toss that goes for six. Pay attention to your front-leg landing — a collapsing knee turns yorkers into full-tosses faster than any other fault.",
      Academy:
        "Train three yorker variations: the stock straight yorker on middle stump, the wide yorker into the off-side tramline, and the in-swinging yorker aimed at the base of leg stump. Drill them under fatigue, in the last 15 minutes of nets when your legs are tired — that's where they're needed in a match. Track success rates per variation and per phase so you can give the captain real numbers when you take the ball at the death.",
      Pro:
        "Yorkers are now a deliberate menu within death-overs bowling, paired with slower-ball bouncers and wide cutters to defeat pre-meditation. Build matchup-specific plans — wide yorkers to ramp-friendly hitters, in-swinging yorkers to those who back away — and have a clearly rehearsed Plan B field when a wide yorker is launched square (deep point and short third man become critical). Measure margin: percentage of attempts that land within ±30 cm of the crease is the single most predictive death-bowling metric.",
      Coach:
        "Drill the braced front leg as a separate gym block — single-leg landings and tolerance to 3× body-weight loading is the platform for repeatable yorkers. Use a shoe-on-the-spot target in every fast-bowling session, and reward landing zone before reward speed. For junior bowlers, never let yorker training crowd out length bowling — accuracy at a good length feeds the yorker, not the other way around.",
      Fan:
        "Watch the bowler's front foot at landing during the death overs. A locked, braced front leg is the platform that lets the wrist whip through and bury the ball at the batter's toes; a soft front knee is why even great fast bowlers occasionally serve up a full-toss for six. Jasprit Bumrah and Lasith Malinga's yorkers are essentially perfected versions of the same braced-leg release.",
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
      Beginner:
        "Reverse swing is when an older cricket ball moves in the air the 'wrong' way — toward the shiny side instead of away from it. It only really starts to happen after the ball has been used for 30–40 overs and the rough side has been worn down. As a starter, just notice that on TV the commentators often say 'the ball is starting to reverse' late in an innings — that's the phenomenon.",
      Intermediate:
        "Two things matter: ball management and bowling speed. As a team, polish one side every over and let the other roughen naturally — you cannot reverse a symmetrical ball. As a bowler, focus on a stable, upright seam and a firm wrist position at release; wobble kills reverse before pace does. You need to be bowling above roughly 130 km/h for the effect to be reliable.",
      Academy:
        "Pair reverse swing with the cross-seam wobble ball as a contrast pair — the brain of even a good batter struggles to play both within the same over. Use net sessions with deliberately scuffed balls (with permission) to feel how the same release behaves differently as the ball ages, and start tracking your own reverse-onset over (the over in which you first get a deviation of 1+ ball-width).",
      Pro:
        "Reverse is a team-level capability: the keeper, slips and captain are equally responsible for ball preservation, and any plan that does not protect one side from over one is leaking late-innings wickets. Manage workload so you can still bowl above 135 km/h in your fourth spell — that's when reverse pays the biggest dividend. Plan field settings specifically for reverse swing: a third slip and short leg are the classic reverse fields, very different from conventional swing.",
      Coach:
        "Treat ball management as a coached skill, not an instinct. Photograph the ball at every drinks break and overlay the photos to monitor roughness asymmetry. Track each fast bowler's average speed by spell, by session, and by ball age; bowlers whose pace drops more than 4 km/h between spell one and spell three need either gym work or a reduced bowling load.",
      Fan:
        "If the ball suddenly starts curving the opposite way around the 35th over, that's reverse swing. Watch where the shiny side is at the top of the bowler's run-up — the ball will curve toward it. Wasim Akram, Waqar Younis and more recently Mohammed Shami have built spells around reverse-swung yorkers that are some of the most spectacular bowling in the game.",
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
      Beginner:
        "Fielding is everything you do when you are not bowling or batting — catching the ball, stopping it on the ground, and throwing it back to the keeper or bowler. Two basics get you started: watch the ball all the way into your hands for a catch, and get your body behind the ball when stopping it on the ground. These two habits prevent more runs than any fancy technique.",
      Intermediate:
        "Build a daily catching diet — 50 catches a session split evenly between high catches (reverse-cup, hands above eyeline) and low catches (cup, hands below the chest), with another 20 reaction catches at close quarters. Add throwing volume but limit max-effort throws to about 15 a session to protect the shoulder. Footwork beats hands: most dropped catches come from being in a poor position, not from poor catching technique.",
      Academy:
        "Specialise. Slip catching, point fielding, deep boundary work and direct-hit run-outs each have distinct footwork and demand position-specific drills. Train under fatigue (run a sprint, then take three slip catches) and under decision load (call your throwing target before each ball). Begin tracking your own dropped-catch percentage and direct-hit conversion — both should be visible numbers in your weekly review.",
      Pro:
        "Fielding is now a major part of the win-margin equation, especially in T20. Treat your own fielding metrics — dropped catches, half-chances converted, runs saved, run-outs effected — with the same rigour as batting average. Lead the fielding huddle: anticipating field changes one ball ahead is the difference between an elite cordon and a passive one. Recover deliberately between spells in the field; cumulative fatigue is what costs you the diving stop in the 19th over.",
      Coach:
        "Use heart-rate-zone catching drills — catches taken at 80–90% HRmax replicate match pressure better than fresh-state drills. Build a position-by-position fielding curriculum so every player owns a primary and a secondary position. Most importantly, measure: even a simple weekly score sheet of catches taken / dropped / half-chances changes player behaviour faster than any technical cue.",
      Fan:
        "Diving stops in the deep, direct-hit run-outs, and one-handed boundary catches are not luck — they are the product of thousands of repetitions and a clear plan for each ball. Notice the small things: a fielder walking in with the bowler, a backup arriving at the stumps before the throw, a slip cordon adjusting half a step between overs. These are the markers of an elite fielding unit.",
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
      Beginner:
        "The wicketkeeper is the player crouched behind the stumps wearing gloves and pads. They catch everything the batter misses, and can get the batter out in several ways — caught behind, stumped, or run-out. As a starter, practise catching tennis balls from a low squat at 5 metres; the squat is the keeper's home position.",
      Intermediate:
        "Master the squat-and-rise: stay low until the ball is released, then rise with the bounce, never before. Take the ball with soft, giving hands rather than snatching, and concentrate on a clean transfer to the stumps for stumping practice. Position yourself sensibly — about 1 metre back for spin, 12–25 m back for pace depending on the bounce of the surface.",
      Academy:
        "Train explosive lateral movement with light-board and shadow drills, and rehearse stumping flicks with a coach rolling balls past the off and leg stumps from 1 m. Build keeping endurance — 300+ squats a match is normal — through long, low-intensity sets in the gym. Start to lead the slip cordon: communicate ball-by-ball your read on swing direction and seam orientation.",
      Pro:
        "Own the field — your view of swing, seam and bounce is the team's best in-game data source. Run a deliberate workflow with the slips on every delivery (call seam, call swing, call line) and with the captain on every over (suggest field micro-adjustments). Manage your knees and lower back proactively — keepers who don't manage volume in their late 20s are forced out of the role by their early 30s.",
      Coach:
        "Monitor knee load in junior keepers and cap match-day squat volume early in their development. Focus on quiet feet, low base, and clean hand position before introducing diving and acrobatics. Use video to evaluate the rise — most keepers who concede byes are rising too early, not too late.",
      Fan:
        "Watch the keeper's feet, not just their hands. A keeper standing a metre further back than usual is signalling that they expect extra bounce or a cutter; a keeper walking around behind the stumps between balls is usually communicating field changes with the captain. MS Dhoni, Adam Gilchrist and Quinton de Kock built reputations on movement and economy as much as on their gloves.",
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
      Beginner:
        "A cricket ground is the large oval area where the game is played, with a 22-yard pitch in the middle. The rope that runs around the edge is the boundary — any ball that crosses it counts as four runs (or six if it has not bounced). Grounds come in many shapes and sizes; there is no single 'official' size for the playing field.",
      Intermediate:
        "Learn the painted markings: the 30-yard inner circle that governs Powerplay fielding restrictions, the popping and bowling creases at each end of the pitch, the danger area down the middle of the pitch that bowlers must avoid in their follow-through, and the return creases that bound the bowler's stride. Each marking enforces a specific rule, and knowing them deepens both your watching and your playing.",
      Academy:
        "Walk every new ground in detail before a match. Pace out the square and straight boundaries, note the slope (Lord's tilts almost 2.5 m across the square), check the outfield speed by rolling a ball across it, and identify wind direction at the toss. All four of these inputs feed directly into bowling plans and field settings.",
      Pro:
        "Integrate venue-specific analytics into team plans — first-innings par scores, pace-versus-spin breakdown, dew patterns, average chase success — and revisit them every series. Captain decisions at the toss should never be a gut call alone; they should be the output of venue data plus current conditions plus team composition.",
      Coach:
        "Build a ground-by-ground playbook with your squad — a single page per venue capturing boundary dimensions, prevailing wind, pitch character, and previous-match notes. Update it after every visit. Junior teams especially benefit from explicit venue prep; it gives players ownership of conditions rather than treating them as external.",
      Fan:
        "Boundary dimensions are part of the strategy you're watching. Adelaide's short square boundaries reward leg-side hitting, the MCG's huge straight ones reward bowling full, and Eden Park's notorious 50–55 metre straight boundaries in Auckland make a low total dangerous. The captain who knows their ground best often wins close matches.",
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
      Beginner:
        "The pitch is the 22-yard strip in the middle of the ground where the bowler bowls and the batter stands. Its surface — green and grassy, dry and dusty, hard and shiny — changes how the ball behaves when it bounces. Pitches matter more than almost any other condition in the game.",
      Intermediate:
        "Learn to read a pitch before you bat. A green tinge usually means the ball will seam and carry; cracks and a dry surface favour spin and variable bounce; a hard, shiny brown surface is usually a good batting surface that will slow down later. Press a car key into the surface — if it leaves a dent, expect variable bounce by day three.",
      Academy:
        "Use the Pitch Builder to develop intuition for how clay content, moisture and rolling time interact. In practice, observe and document every pitch you play on: hardness (by a Clegg hammer reading if available), grass length, crack pattern, and how it changed across the match. This habit compounds rapidly into match-reading edge.",
      Pro:
        "Match preparation begins with the pitch. Bowling lengths, batting tempos, and selection — extra spinner or extra seamer — should follow from the pitch report, not from default formats. Engage with the curator and the visiting analyst; understanding the soil type and preparation regime gives you a 2–3 day forecast no opposition has.",
      Coach:
        "Photograph every match pitch every morning and overlay across days to track crack growth and surface change. Train players to read pitches actively, not passively — make pitch reports a player-led exercise on tour. Junior coaches should expose batters and bowlers to a deliberate variety of surface types across the season.",
      Fan:
        "Pitches tell stories. A 200-run day-one total on a green deck can be a great score; a 350 day-one total on a flat track may already be a losing one. Watch for slow ball-roll on the outfield (heavy outfield, slow scoring), discoloured patches on the pitch (footmarks, big spin threat), and dew at twilight in white-ball cricket (chase-friendly conditions).",
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
      Beginner:
        "A cricket ball is a hard leather ball with a stitched seam running around the middle — much heavier and harder than a tennis ball. It has a cork core wrapped in tightly wound string and covered in two pieces of leather. Always handle a new ball carefully; even a low-paced delivery can bruise.",
      Intermediate:
        "Learn to spot the seam direction at release — that single observation tells you whether the bowler is trying to swing, seam or spin the ball. Practise polishing one side on your trousers between deliveries (a team responsibility, not just the bowler's). Understand that ball colour and brand change behaviour: red Kookaburra in club cricket behaves very differently from a white one under lights.",
      Academy:
        "Run a deliberate net session contrast: bowl 6 with a brand-new ball, 6 with a 30-over-old ball, 6 with a 60-over-old ball. Feel the difference in seam height, in lacquer slickness, and in pace off the pitch. Knowing how a ball ages in your hands is foundational to bowling plans across formats.",
      Pro:
        "Brand and condition drive plans. Dukes (England) holds its seam for 50+ overs and rewards classical swing bowlers; Kookaburra (Australia, most ODIs) softens by over 25 and demands new-ball aggression; SG (India) has a hand-stitched proud seam ideal for reverse swing. Build over-band-specific plans for every ball type you encounter on tour.",
      Coach:
        "Teach ball management as a team skill — every player polishes between overs, and ball-care is part of the warm-up briefing every match. Track condition with photos every drinks break. Educate junior bowlers on legal practice (sweat only, no foreign substances) and the difference between roughening a side and unfair scuffing.",
      Fan:
        "Look for two clues on TV: which side of the ball the keeper is polishing, and which side the bowler holds toward the slips at the top of the run-up. Together they tell you exactly which way the ball is supposed to swing — and whether the bowler is setting up conventional or reverse swing.",
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
      Beginner:
        "A cricket bat is a flat-faced wooden bat with a long handle, made from willow. As a starter pick one that is easy to swing — too heavy, and your shot timing will suffer. Junior bats are sized from size 1 (under-eight) up to Harrow and full size; let comfort, not pride, choose the size.",
      Intermediate:
        "Learn to knock in your own bat: 50 mallet hits a night for two weeks before first match use, then a few hundred soft hits with an old ball. Oil the face lightly with raw linseed twice a season and store the bat dry. Begin to understand the difference between weight (what the scale reads) and pickup (how heavy it feels to swing) — pickup is what matters in a shot.",
      Academy:
        "Use the Bat Builder to explore how bow, edge thickness, spine position, sweet-spot height and pickup interact. Match the bat profile to your dominant scoring zones — a higher sweet spot helps a back-foot player, a lower one suits a front-foot driver. Always know the grain count and grade of your match bat.",
      Pro:
        "Sponsor bats are tuned to spec: many top-order batters carry 4–6 bats split by format and ball condition (heavier for Tests with a Kookaburra, lighter and bigger-edged for white-ball power). Track bat performance — boundary percentage, mishit clearance — and rotate stock proactively rather than waiting for cracks.",
      Coach:
        "Match bat weight to player frame and shot style; an over-heavy bat slows swing speed and corrupts shot timing in juniors faster than any other equipment fault. Teach knock-in and care as part of equipment lessons, not as the parent's job. Inspect bats monthly for cracks at the toe and along the bottom edge.",
      Fan:
        "Modern bats are deeper, with edges 38–42 mm thick and dramatically pressed sweet spots — that's why mishits now regularly clear the rope, not because batters have suddenly become stronger. The willow itself is the same; the geometry around it has been re-engineered.",
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
      Beginner:
        "Behind the batter stand three wooden sticks (stumps) with two small wooden bails resting across the top. Knock the bails off with the ball and the batter is out 'bowled'. There is a set of wickets at each end of the pitch, and they are the bowler's primary target.",
      Intermediate:
        "Learn the LBW basics: for a leg-before decision the ball must usually pitch in line with the stumps, strike the batter in line, and be projected to hit the stumps — with extra conditions for balls pitching outside off. Understand the three dismissal modes that involve the wickets: bowled, LBW, and stumped/run-out, each defined by precise contact with stumps and bails.",
      Academy:
        "Drill stumping and run-out execution with single-stump targets at 15–25 m. Train both flicking the bails (no transfer, fast hands) and underarm throws to a single visible stump from inside the circle. Direct-hit conversion is one of the highest-leverage skills you can build.",
      Pro:
        "Captains plan dismissals around the geometry of the stumps — bowled, LBW, stumped, run-out — and matchup-specific bowling plans target the most likely mode for each batter. Use ball-tracking insight to refine length and line; the difference between a top-of-off plan and an off-stump plan can be 5–10% in dismissal probability over a long innings.",
      Coach:
        "Set up run-out and direct-hit drills as a measurable weekly metric (attempts, hits, percentage). Teach LBW geometry to bowlers explicitly — too many junior bowlers waste deliveries on lines that cannot produce an LBW even with a hit. Use Zing-style training stumps where budget allows; the instant feedback is invaluable.",
      Fan:
        "LED 'Zing' bails are not just a TV gimmick — they let the third umpire pinpoint the exact instant the bails leave the grooves, often deciding run-outs and stumpings by millimetres. Notice how the bails flash before the stumps light up; the trigger is the loss of contact, not the impact.",
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
