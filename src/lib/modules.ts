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
    intro: "How a bowler turns biomechanics, aerodynamics and pitch behaviour into wickets — from the run-up to the moment the ball leaves the hand, with worked examples from the bowlers who do it best.",
    icon: "Target",
    tint: "from-[oklch(0.74_0.18_55_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro", "Coach"],
    lessons: [
      { slug: "anatomy-of-an-action", title: "Anatomy of a Bowling Action", minutes: 6, summary: "Five phases from run-up to follow-through, decoded.", body: ["Every bowling action can be broken into five clear phases. Understanding each one helps you spot what is going right or wrong.", "1) Run-up: The bowler builds smooth, controlled speed towards the crease. The aim is rhythm, not maximum sprinting — the same number of steps every time.", "2) Pre-delivery stride: The last bound — a small jump that turns the body sideways and lines the shoulders up with the target.", "3) Back-foot contact: The back foot lands first. At this moment the hips face one way and the shoulders the other. This twist (called the 'separation angle', usually 40–60° for elite quicks) stores spring-like energy in the trunk.", "4) Front-foot contact: The front foot slams down with a braced (straight) leg. The ground pushes back with 8–10 times body weight, and that force travels up through the hips, chest, shoulder and arm — like a whip cracking. Dale Steyn, Pat Cummins and Jhulan Goswami (the leading wicket-taker in women's ODIs) all show a beautifully braced front leg.", "5) Release & follow-through: The arm swings over, the wrist snaps the ball out, and the body keeps rotating to safely absorb the force. A clean follow-through protects the back and shoulder.", "Women's game examples: Jhulan Goswami's classical side-on action made her India's pace spearhead for two decades, and Australia's Megan Schutt uses the same five-phase template to swing the new ball both ways."], diagram: "force" },
      { slug: "swing-aerodynamics", title: "Why a Cricket Ball Swings", minutes: 8, summary: "Boundary layers, seam angle, and the magic of conventional swing.", body: ["Conventional swing happens because one side of the ball is polished smooth and the other is rough. Air flowing over each side separates at different points, producing a sideways pressure difference.", "Seam angle matters: 15–20° toward the slips gives the seam enough exposure to trip the airflow on one side into turbulence — the position James Anderson holds with the lacquer ball.", "Reverse swing flips the script — at speeds above ~135 km/h with a worn ball, both sides go turbulent but the rough side separates later, pulling the ball the opposite way (Waqar Younis, Mohammed Shami)."], diagram: "swing" },
      { slug: "spin-revolutions", title: "Spin: RPM, Drift & Dip", minutes: 7, summary: "How revs create the Magnus force that shapes a spinner's threat.", body: ["A finger or wrist spinner imparts 1,500–2,500 RPM (revolutions per minute) at release. Shane Warne's leg-break averaged ~2,200 RPM, the highest reliably measured.", "Top-spin makes the ball dip down sooner, so it lands shorter than the batter expects — the signature of Ravichandran Ashwin and Nathan Lyon.", "Side-spin makes the ball drift in the air before turning off the pitch — the double-deception that defined Warne, Muralitharan and Rashid Khan.", "Women's game examples: Sophie Ecclestone (England) is the world's No. 1 ODI bowler, using high-revs left-arm orthodox; Deepti Sharma (India) combines big off-spin with sharp drift; Poonam Yadav (India) builds her leg-spin around heavy loop and dip rather than pace."] },
      { slug: "pace-and-the-kinetic-chain", title: "Pace and the Kinetic Chain", minutes: 6, summary: "Why the fastest bowlers are not the strongest people.", body: ["Pace comes from sequencing, not raw strength. Energy flows from legs → hips → trunk → shoulder → elbow → wrist in a precisely timed whip.", "A 1% improvement in sequencing efficiency can add 2–3 km/h without any extra effort.", "Shoaib Akhtar (161.3 km/h, world record) and Brett Lee (161.1) were not the most muscled bowlers of their era — they were the most sequenced."] },
      { slug: "release-angles", title: "Release Angles & Trajectories", minutes: 5, summary: "Geometry behind yorkers, bouncers and good-length deliveries.", body: ["A 145 km/h yorker leaves the hand at roughly -2.5° below horizontal and lands within 30 cm of the batter's toes after travelling 17.7 m. Lasith Malinga's round-arm slot lowered this angle further — part of why his yorkers were so hard to dig out.", "A bouncer leaves at +3–4° above horizontal so it can clear the batter's chest after one bounce (Mitchell Johnson, Jofra Archer specials).", "Good-length releases hover around 0°, exploiting the batter's indecision between front foot and back foot — Glenn McGrath's life's work."], diagram: "trajectory" },
      { slug: "seam-presentation", title: "Seam Presentation & Wobble", minutes: 6, summary: "Upright seam, scrambled seam, wobble seam — three distinct skills.", body: ["An upright, stable seam is the foundation of conventional swing and seam-off-the-pitch movement. Glenn McGrath and Vernon Philander built careers on it.", "A wobble-seam release lets the seam rotate in flight so the bowler doesn't know which way it will deviate off the pitch — which means the batter can't either. Pat Cummins uses it as a wicket-taking option.", "Scrambled-seam yorkers sacrifice swing for accuracy at maximum pace, common in death-overs T20 (Bumrah, Starc)."] },
      { slug: "cutters-and-slower-balls", title: "Cutters, Slower Balls & Knuckle Balls", minutes: 6, summary: "Speed change without telegraphing the change.", body: ["Off-cutters and leg-cutters are pace-bowlers' spinners — finger-rolled at release to take 15–20 km/h off the speed. Andrew Flintoff and Vernon Philander used them as wicket-takers on slow tracks.", "Back-of-the-hand slower balls (Dwayne Bravo, Jasprit Bumrah) reverse the wrist position late and produce a 30–40 km/h drop.", "Knuckle balls (Zaheer Khan, Bhuvneshwar Kumar) are gripped between bent index and middle fingers — no spin, low rebound, and brutal in the death."] },
      { slug: "swing-vs-seam", title: "Swing vs Seam: Two Different Skills", minutes: 5, summary: "Air movement vs pitch movement — and when each rules.", body: ["Swing is movement in the air, dependent on ball condition, atmosphere and wrist position. Seam is deviation off the pitch, dependent on a stable upright seam and a surface with even moisture or grass.", "On a green English seamer, Stuart Broad and Anderson get both. On a flat Indian Test pitch, neither — until reverse swing arrives at over 35.", "Bowlers must know which they are seeking: chasing swing on a seamer's pitch wastes a session."] },
      { slug: "left-arm-angle", title: "The Left-Arm Quick Angle", minutes: 5, summary: "Why left-arm pace is statistically over-represented in wickets.", body: ["A left-arm-over delivery to a right-hander creates an angle from wide of the crease that opens up the LBW and bowled modes — Wasim Akram and Mitchell Starc as canonical examples.", "The crease angle exaggerates any inward movement, making the in-swinging yorker the most lethal delivery in the modern white-ball game.", "Coaches now actively select left-arm pace at junior levels for this matchup advantage."] },
    ],
  },
  {
    slug: "batting-science",
    title: "Batting Science",
    tagline: "Reaction time, geometry & shot selection",
    intro: "How elite batters compress 0.4 seconds of flight time into a stable, repeatable decision — and the geometry that turns a good shot into a great one, with examples from the best of every era.",
    icon: "Swords",
    tint: "from-[oklch(0.66_0.16_148_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro", "Coach"],
    lessons: [
      { slug: "reaction-time", title: "The 400-Millisecond Window", minutes: 6, summary: "What batters actually see, and when.", body: ["A 145 km/h delivery reaches the batter in about 440 milliseconds (ms). Roughly 200 ms is used up just to see the ball and plan a movement, leaving only ~240 ms to commit and play the shot.", "Top batters use 'predictive looking' — their eyes jump from the bowler's hand to the spot where they think the ball will bounce, well before it gets there. Lab work on Sachin Tendulkar and Kane Williamson shows this eye-jump happens earlier than in club-level batters.", "The skill is not faster reaction — it is getting better information, earlier.", "Women's game examples: Suzie Bates (New Zealand) and Meg Lanning (Australia) are studied for the same early head-and-eye work; Smriti Mandhana (India) shows it most clearly when she picks length on the first stride against the new ball."] },
      { slug: "head-position", title: "Head Position Drives Balance", minutes: 5, summary: "Why coaches obsess over a still head.", body: ["The head is heavy (~5 kg) and sits on top of a flexible spine. Any tilt or drop pulls the whole body off-line.", "A still head over the front knee — the trademark of Rahul Dravid and Joe Root — keeps both eyes level so they can track the ball together with minimal distortion.", "Most front-foot dismissals can be traced back to the head falling sideways at release.", "Women's game examples: Mithali Raj and Laura Wolvaardt are textbook on this — a quiet head over the front knee gives both their cover drives a stamp of calmness."] },
      { slug: "shot-geometry", title: "Shot Geometry & Wagon Wheels", minutes: 7, summary: "Bat angle, contact zone, and where the runs really live.", body: ["For a right-handed batter facing right-arm-over, the V between mid-on and mid-off is the highest-percentage zone — bat face and ball line align naturally.", "Cross-bat shots (pull, cut, sweep) require precise contact 30–60 cm in front of the body to keep elevation controlled — see Ricky Ponting's pull and Steve Smith's leg-side cut.", "Modern T20 wagon wheels show top batters scoring 65–70% of runs in just three zones — pre-meditation pays."] },
      { slug: "footwork-physics", title: "Footwork as Energy Transfer", minutes: 6, summary: "Why a half-stride beats a lunge.", body: ["A controlled half-stride keeps the trunk stacked over the hips, allowing the bat to swing through a wide arc with minimal mid-shot correction — Virat Kohli's signature setup.", "A full lunge over-commits the centre of mass, removing the option to abort against late movement.", "Train footwork like a tennis split-step: a tiny pre-movement, then commit."] },
      { slug: "power-vs-timing", title: "Power vs Timing", minutes: 5, summary: "Bat speed at impact is everything.", body: ["Exit velocity off the bat is governed by bat speed at the contact point, contact location (sweet spot is 6–10 cm above the toe), and how solidly the wrists are cocked.", "A timed shot at 110 km/h bat speed travels farther than a muscled shot at 130 km/h that misses the sweet spot by 2 cm — Brian Lara's straight drives went further than many sloggers' heaves for this reason.", "Big hitters generate bat speed from torso rotation, not arms — see Andre Russell, Glenn Maxwell, AB de Villiers."] },
      { slug: "playing-spin", title: "Playing Spin: Use of the Crease", minutes: 6, summary: "Forward, back, sweep, reverse — the four counters.", body: ["Going to the pitch of the ball neutralises turn — the Sachin and Younis Khan approach on subcontinental tracks.", "Going deep in the crease against the spinning ball buys time and lets the ball turn before the shot — Steve Smith and Joe Root in India 2024.", "The sweep and reverse-sweep against orthodox spin are now Test-cricket staples, not white-ball novelties (Ben Stokes' Bazball era)."] },
      { slug: "leaving-the-ball", title: "The Skill of Leaving", minutes: 5, summary: "What you don't play decides Test averages.", body: ["A great Test batter leaves 30–50% of new-ball deliveries in seamer-friendly conditions. Cheteshwar Pujara and Alastair Cook turned this into an art.", "The leave forces the bowler to bowl straighter and into scoring areas.", "Mid-pitch judgement (length first, line second) is the foundation; train it with painted target zones in nets."] },
      { slug: "switch-hit-ramp", title: "Switch Hits, Scoops & Ramps", minutes: 6, summary: "Modern shots, their physics and their risk.", body: ["The switch hit (Kevin Pietersen, David Warner) reverses the batter's stance mid-delivery, swapping the off and on sides and breaking pre-set fields.", "The ramp/scoop (Tillakaratne Dilshan, Jos Buttler) uses the bowler's own pace to lift the ball over the keeper, ideal vs death-overs yorkers.", "Both shots have higher dismissal probability than orthodox alternatives, so are bowler- and matchup-specific in elite use."] },
      { slug: "powerplay-vs-death", title: "Powerplay vs Death — Two Sports", minutes: 6, summary: "Phase-specific batting maths.", body: ["Powerplay batting prizes intent and risk-adjusted strike rate; field restrictions reward aerial play over the inner ring (Travis Head, Jos Buttler).", "Middle overs reward rotation and 'milking' spin — a 95–110 strike rate with no dismissals is gold (Kohli, Babar Azam).", "Death-overs batting is built on pre-meditation, range-hitting templates, and matchup-specific zones (MS Dhoni, Heinrich Klaasen)."] },
      { slug: "batting-against-pace", title: "Batting Against Genuine Pace", minutes: 6, summary: "150+ km/h demands different rules.", body: ["Move late, play late — extra reaction time only comes from a still trigger movement and a deep-crease setup. Brian Lara, Sachin Tendulkar and Babar Azam against Shoaib Akhtar's 150+ km/h spells are the classic examples.", "Duck under the bouncer with the eyes, not the bat — letting it pass under your nose protects your wicket and forces the bowler to pitch fuller.", "Helmet, chest guard and arm guard are not optional at this level; concussion data has reshaped equipment use since 2014.", "Women's game examples: Harmanpreet Kaur's pulled six off Megan Schutt in the 2017 World Cup semi-final, and Hayley Matthews' fearless front-foot pull, show the same template — late, balanced, controlled."] },
    ],
  },
  {
    slug: "fielding-science",
    title: "Fielding Science",
    tagline: "Anticipation, angles & athletic intent",
    intro: "Fielding wins more games than most fans realise. Here is the science of cutting angles, catching under pressure and throwing flat — with the players who set the standard.",
    icon: "Hand",
    tint: "from-[oklch(0.6_0.12_220_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro"],
    lessons: [
      { slug: "cutting-angles", title: "Cutting Angles in the Outfield", minutes: 5, summary: "The straightest path is rarely the fastest.", body: ["Elite outfielders curve their run, attacking the ball at an angle that lines up the throwing shoulder with the stumps — the Ravindra Jadeja and Glenn Maxwell technique.", "A 3° better attack angle saves roughly 0.4 seconds on the throw — often the difference between run-out and not."] },
      { slug: "catching-under-pressure", title: "Catching Under Pressure", minutes: 6, summary: "Eyes, hands and the perception of time.", body: ["Under stress, the ball appears to come 10–15% faster — a side-effect of cortisol (the stress hormone) on the brain's visual processing.", "'Soft hands' absorb the ball over a longer distance, lowering the peak force and the chance of a rebound — Paul Collingwood's slip catches are textbook.", "A simple pre-catch breathing routine flattens the cortisol spike and brings perception back to normal.", "Women's game examples: Ellyse Perry's running outfield catches and Alyssa Healy's diving leg-side gathers down the leg-side are masterclasses in soft, late hands."] },
      { slug: "flat-throws", title: "Flat Throws & Release Height", minutes: 5, summary: "Why low trajectories beat the rocket arm.", body: ["A 65 m throw at a 12° launch angle reaches the keeper 0.3 s faster than the same throw at 30°.", "Flatter throws also reach the keeper at a catchable height for stumping with no extra movement — Jadeja's flat-throw run-outs are the modern benchmark."] },
      { slug: "slip-cordon", title: "The Slip Cordon", minutes: 6, summary: "Why first slip is the captain's most demanding position.", body: ["First slip stands at roughly the keeper's edge of vision, with ~0.45 s to react to a thick edge.", "Hands soft, feet alive, weight forward — Rahul Dravid (210 Test catches) and Mahela Jayawardene (205) set the highest catching standards.", "Cordon discipline: never cross arms, never reach across a teammate's body, always call early."] },
      { slug: "boundary-relay", title: "Boundary Catching & Relays", minutes: 6, summary: "Six-saves and the choreography of two fielders.", body: ["Modern relay catching — palming the ball back inside the rope, then completing the catch on the second touch — has redefined boundary fielding (Suryakumar Yadav, Trent Boult in BBL/IPL).", "The second fielder must read the first's body shape early; communication is binary (yours / mine).", "Practice with a 'fence drill' — soft-net boundary with two fielders alternating roles."] },
      { slug: "direct-hits", title: "Direct-Hit Run-Outs", minutes: 5, summary: "The single highest-leverage fielding skill.", body: ["A direct hit converts a 50/50 run-out into a 100%. Elite teams now drill 20–40 attempts per session.", "Side-on body, eyes locked on a single stump, release on the front foot — Jonty Rhodes' famous Inzamam run-out in 1992 is the template.", "Underarm direct hits from inside the ring (AB de Villiers, Mike Hussey) require an entirely different mechanic."] },
      { slug: "fielding-positions", title: "Reading Fielding Positions", minutes: 7, summary: "What each position actually does, ball by ball.", body: ["Slip cordon (catching the edges), gully (back-foot drive errors), point/cover (driven boundaries), midwicket/square leg (flick and pull), fine leg/third man (glance and edges).", "Inner-ring fielders save singles; boundary riders convert sixes into twos.", "Captains shift fielders ball by ball based on bowling plan, batter's preferred zones, and ball age."] },
    ],
  },
  {
    slug: "pitch-science",
    title: "Pitch Science",
    tagline: "Soil, moisture & the surface story",
    intro: "Every pitch is a soil-mechanics story. Learn to read it before the toss — and to predict how it will behave on every day of the match.",
    icon: "LayoutGrid",
    tint: "from-[oklch(0.55_0.18_300_/_0.10)] to-transparent",
    levels: ["Intermediate", "Academy", "Pro", "Coach", "Fan"],
    lessons: [
      { slug: "soil-and-bounce", title: "Soil Composition & Bounce", minutes: 6, summary: "Clay content predicts behaviour.", body: ["High-clay pitches (Perth WACA, Centurion, Wanderers) compress tightly and produce true, even bounce.", "Low-clay, silty pitches (Chennai, Galle, Mirpur) crumble faster, gripping spin from day two.", "Clay percentage above 50% is the rough threshold for sustained pace and bounce."], diagram: "pitch" },
      { slug: "moisture-and-seam", title: "Moisture, Grass & Seam Movement", minutes: 5, summary: "Why morning sessions favour swing and seam.", body: ["A pitch with 8–12 mm of live grass and slight surface moisture gives the seam something to grip on impact — the Trent Bridge and Headingley template.", "As the sun dries the surface during day one, seam movement reduces and batting eases."] },
      { slug: "day-by-day-evolution", title: "How a Pitch Changes Over Five Days", minutes: 7, summary: "The classic Test arc.", body: ["A Test pitch is a living surface — it ages over five days, and the smart team plans for each stage.", "Days 1–2: The surface is fresh, hard and moist. Pace bowlers get bounce and seam movement off the pitch, which is why captains often bowl first if the toss allows.", "Day 3: Small cracks start to open. Bounce becomes less predictable, and spinners begin to get grip.", "Days 4–5: Dust and footmarks from earlier sessions feed the spinners. Bounce becomes uneven, sometimes shooting low or jumping. Most famous Indian spin collapses are day-4 stories."] },
      { slug: "pitch-types-by-country", title: "Pitch Profiles by Country", minutes: 7, summary: "A world tour in 5 minutes.", body: ["Australia: high-clay, hard, bouncy, rewards genuine pace and the pull shot.", "England: green-tinged, moisture-aided seam in the first session; flatter from day two.", "India/Sri Lanka: low-clay, slow turners that grip from day two; reverse swing arrives early.", "South Africa: high-bounce, lateral seam; the Wanderers nicknamed 'the Bullring' for a reason.", "New Zealand: variable — Hagley Oval seams, Hamilton flattens, Wellington is a swing factory."] },
      { slug: "drop-in-pitches", title: "Drop-In Pitches", minutes: 5, summary: "Pre-grown surfaces, lifted in by crane.", body: ["First used routinely at the MCG in the 1990s, now common in Australia and NZ.", "Pros: consistent character, allows multi-sport venues. Cons: less binding with the surrounding outfield, occasionally inconsistent bounce.", "Curators have refined drop-ins to match traditional 'in-situ' behaviour within ~10% on key metrics."] },
      { slug: "reading-the-pitch", title: "Reading a Pitch Before the Toss", minutes: 6, summary: "Five things to look for in 60 seconds.", body: ["Grass length and colour (green = seam; brown = pace/turn).", "Cracks at the ends (bounce variability later).", "Footmarks from earlier matches (spinner's target).", "Hardness by key-press test (hard = pace; soft = grip and low bounce).", "Surface moisture (dampness aids both swing and seam early)."] },
    ],
  },
  {
    slug: "ball-science",
    title: "Ball Science",
    tagline: "Leather, lacquer & 6 ounces of physics",
    intro: "From the cork core to the proud seam, every part of the cricket ball does a job — and each manufacturer's ball behaves differently across formats and conditions.",
    icon: "CircleDot",
    tint: "from-[oklch(0.6_0.22_27_/_0.10)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Fan"],
    lessons: [
      { slug: "anatomy-of-a-ball", title: "Anatomy of a Cricket Ball", minutes: 5, summary: "Cork, wool, leather, lacquer, seam.", body: ["A standard ball weighs 155.9–163.0g and measures 22.4–22.9cm in circumference.", "The cork core is wound with wool yarn, encased in four pieces of leather joined by the raised seam of ~80 stitches across six rows."] },
      { slug: "red-vs-white-vs-pink", title: "Red vs White vs Pink", minutes: 5, summary: "Why each ball behaves differently.", body: ["Red balls have a natural lacquer that wears predictably, helping reverse swing later.", "White balls scuff faster and lose hardness, which is why they often get changed at the 34-over mark in 50-over innings.", "Pink balls have an extra polyurethane coat for visibility under lights — they swing longer but spin less, hence the dominance of seamers in day-night Tests."] },
      { slug: "lifecycle-shine-scuff", title: "The Shine-and-Scuff Lifecycle", minutes: 6, summary: "Why one side is loved and one is left alone.", body: ["The shiny side maintains laminar airflow; the rough side trips the boundary layer into turbulence.", "Sweat is allowed on the ball; saliva is no longer permitted post-2020 ICC rule change.", "From over 30 onward the rough side starts feeding reverse swing for any team that has managed both sides well."] },
      { slug: "dukes-vs-kookaburra-vs-sg", title: "Dukes vs Kookaburra vs SG", minutes: 6, summary: "Three balls, three sports.", body: ["Dukes (England, WI): hand-stitched, proud seam that stays prominent for 60+ overs — heaven for swing bowlers like Anderson and Broad.", "Kookaburra (Australia, most ODIs): machine-pressed seam that flattens after ~25 overs — front-loads new-ball aggression (Starc, Cummins).", "SG (India home Tests): pronounced hand-stitched seam; lasts longer than Kookaburra and is ideal for reverse swing as the lacquer wears off — used by Mohammed Shami and Ravichandran Ashwin."] },
      { slug: "ball-tampering-history", title: "Ball Management & Tampering History", minutes: 5, summary: "The line between care and cheating.", body: ["Polishing with sweat and a soft cloth — legal. Polishing with saliva — banned in 2020.", "Lifting the seam with a fingernail, applying resin or sandpaper (the 2018 Newlands incident, Sandpaper-gate) — illegal and subject to ICC sanction.", "Modern teams treat ball care as a coached skill with explicit ICC-compliant routines."] },
      { slug: "ball-flight-physics", title: "Ball Flight Physics", minutes: 6, summary: "Drag, lift, Magnus and dip.", body: ["A new ball at 140 km/h experiences ~0.3 N of drag, decelerating it ~2 m/s over the pitch length.", "Magnus force from spin produces sideways drift (up to 60 cm laterally for an elite leg-spinner like Warne).", "Pink-ball studies at Adelaide show swing magnitude actually increases under lights — the cooler air densifies and the lacquer holds."] },
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
      { slug: "humidity-and-swing", title: "Does Humidity Really Help Swing?", minutes: 5, summary: "The myth, the data, and the truth.", body: ["Humidity itself barely affects airflow — air viscosity changes by less than 1% across normal humidity ranges.", "What matters is cloud cover, which keeps the pitch and ball cooler and damper, preserving the conditions that help the seam grip and the lacquer hold (the Headingley and Lord's classic 'overhead conditions')."] },
      { slug: "dew-factor", title: "The Dew Factor", minutes: 4, summary: "Why winning the toss matters more after sunset.", body: ["A wet ball is hard to grip, killing spin and reverse swing while making the outfield faster.", "In day-night matches in humid venues (Sharjah, Wankhede), the side bowling second often loses 15-20 runs in expected economy."] },
      { slug: "altitude", title: "Altitude & Ball Flight", minutes: 5, summary: "Thinner air, longer sixes.", body: ["At 1,500m elevation (Johannesburg, Dharamsala) air density drops ~15%, reducing aerodynamic drag and increasing six-hitting distance by 6-8%.", "Swing also reduces because the same air pressure differential exerts less force."] },
      { slug: "wind-and-bowling-ends", title: "Wind & Choice of Ends", minutes: 5, summary: "Cross-wind for swingers, with-wind for express pace.", body: ["A cross-wind into the bowler's left shoulder helps right-arm out-swing (the classical English summer setup).", "Bowling with the wind adds 2–4 km/h to release speed but reduces flight time, helping bouncer-heavy plans.", "Captains routinely match bowlers to ends based on wind for a reason."] },
      { slug: "temperature-and-fatigue", title: "Temperature & Player Fatigue", minutes: 5, summary: "Sub-tropical heat changes the maths.", body: ["At 35°C+ wet-bulb temperatures (UAE, India in summer), cognitive performance drops 8–12% after 90 minutes.", "Drinks-break frequency, cooling vests, and rotation of fielders become tactical decisions, not just welfare ones.", "Test matches in Sri Lanka and the UAE are quietly endurance contests as much as skill ones."] },
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
      { slug: "injury-prevention", title: "Injury Prevention for Fast Bowlers", minutes: 7, summary: "Workload, side strain & stress fractures.", body: ["Acute:chronic workload ratios above 1.5 sharply increase stress fracture risk in lumbar vertebrae — the single biggest cause of long-term absence (James Anderson, Pat Cummins early career, Jhye Richardson).", "Side strains correlate with sudden spikes in deliveries-per-week, especially in adolescents."] },
      { slug: "strength-for-batters", title: "Strength Training for Batters", minutes: 6, summary: "Rotational power, not gym strength.", body: ["Big-six batters generate exit velocity from rotational core power (medicine-ball throws, anti-rotation chops), not from bench press.", "Wrist and forearm strength supports late, controlled shot adjustments — a Virat Kohli staple.", "Lower-body strength supports a still head and a stable base — the foundation of any technical batting."] },
      { slug: "mobility-and-recovery", title: "Mobility, Sleep & Recovery", minutes: 5, summary: "The 24-hour athlete.", body: ["8–9 hours of sleep is the strongest single predictor of reaction time and decision quality across long tours.", "Soft-tissue mobility for hips, thoracic spine and shoulders directly enables technical range for bowlers and batters alike.", "Post-match nutrition timing (within 30 minutes) accelerates glycogen replenishment for next-day fielding."] },
      { slug: "mental-skills", title: "Mental Skills & Visualisation", minutes: 6, summary: "Routines, reset words, and the inner game.", body: ["Pre-ball routines (tap, breath, focus word) stabilise the cortisol curve and shorten between-ball cognitive load — Steve Smith, Cheteshwar Pujara as visible examples.", "Visualisation of specific deliveries (in-swinging yorker, sweep) primes motor circuits as effectively as light practice.", "Captains now travel with sports psychologists as standard, especially across long Test tours."] },
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
      { slug: "lbw-logic", title: "The LBW Decision Tree", minutes: 6, summary: "Pitching, impact, hitting — in that order.", body: ["LBW (Leg Before Wicket) is governed by Law 36 of the Laws of Cricket. The umpire mentally answers three questions, in order:", "1) Did the ball pitch in line with the stumps (or outside off, but not outside leg)?", "2) Did it hit the batter in line with the stumps (or, if the batter did not offer a shot, this can still be out even if struck outside off)?", "3) Would the ball have gone on to hit the stumps?", "A 'no' at any earlier step kills the appeal — even if the answer to a later step is yes."] },
      { slug: "drs-technology", title: "How DRS Technology Works", minutes: 7, summary: "Hawk-Eye, UltraEdge, ball-tracking margins.", body: ["DRS — the Decision Review System — uses three technologies working together. Each one answers a different question.", "1) Hawk-Eye: 6–10 high-speed cameras film the ball from different angles and a computer joins the images to track its 3D path at 340 frames per second. This shows where the ball pitched, where it hit the pad, and where it would have gone.", "2) UltraEdge (Snickometer): Tiny microphones inside the stumps pick up sound. The system lines up the spike of sound with the slow-motion video to see whether bat (or glove) touched the ball — accurate to a 2 ms window.", "3) Hot Spot: An infrared camera shows a bright mark where two surfaces rub — proof that the ball brushed the bat, pad or body.", "The 'umpire's call' margin exists because Hawk-Eye is not perfect — it allows for about half a ball's width of uncertainty. If the ball is only just clipping the stumps, the original on-field decision stands."] },
      { slug: "no-balls-and-free-hits", title: "No-Balls, Front-Foot Cameras & Free Hits", minutes: 5, summary: "The most-missed decision in cricket.", body: ["Front-foot no-balls were historically missed up to 30% of the time. Since 2020, the third umpire calls every front-foot no-ball off a dedicated camera review.", "Each no-ball costs the bowling side at least one run plus a free hit, where the batter cannot be dismissed except by run-out."] },
      { slug: "soft-signal-and-catches", title: "Soft Signals & Boundary Catches", minutes: 5, summary: "Why on-field umpires still matter.", body: ["The 'soft signal' was the on-field umpire's initial decision on close catches, used by the third umpire as a fallback when video was inconclusive.", "From 2023 the ICC abolished the soft signal in Tests; the third umpire now has primary authority for clean-catch decisions on referral.", "Boundary catches must clearly show no contact between the fielder and the rope while the ball is held."] },
      { slug: "snicko-and-hot-spot", title: "Snicko, Hot Spot & Conflicting Tech", minutes: 6, summary: "What happens when the technologies disagree.", body: ["Snicko (UltraEdge) detects sound spikes; Hot Spot detects friction heat. Together they confirm edges, but they can disagree on glove or flap contact.", "ICC protocols rank evidence: a clear visible deflection trumps audio; audio plus visible spike trumps an isolated audio spike.", "Even with all the tech, ~3% of edges remain truly unresolvable — umpire's call carries."] },
      { slug: "drs-strategy", title: "Captaincy & DRS Strategy", minutes: 6, summary: "Two reviews, 80 overs — spend them wisely.", body: ["Each side gets 3 unsuccessful reviews per innings in Tests, 2 in white-ball cricket (post-2020 update during COVID).", "Top captains (Joe Root, Pat Cummins, Babar Azam) consult the keeper and first slip within ~5 seconds before reviewing — a delayed call is usually a no.", "Review percentages: ~30% success is the elite baseline; below 20% suggests the captain is reviewing on hope, not on evidence."] },
    ],
  },
  {
    slug: "wicketkeeping-science",
    title: "Wicketkeeping Science",
    tagline: "Hands, footwork & the team's second captain",
    intro: "The most under-rated specialist on the field. The science of standing up, standing back, stumping in under 0.4 seconds, and reading the game from behind the stumps — with the keepers who set every standard.",
    icon: "Shield",
    tint: "from-[oklch(0.55_0.18_300_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro", "Coach"],
    lessons: [
      { slug: "keeper-overview", title: "What the Wicketkeeper Actually Does", minutes: 5, summary: "Specialist gloves, generalist mind.", body: ["Definition: The wicketkeeper is the only fielder allowed gloves and pads, positioned directly behind the stumps to take every delivery the batter doesn't hit (Knott, Healy, Gilchrist, Dhoni, Pant, Buttler).", "Tactical Use: Catches edges, completes stumpings and run-outs, calls DRS, sets fields with the captain, and reads pitch behaviour ball by ball.", "Physics: Reaction window of ~0.4s to a pace-bowler's edge — the shortest of any fielder.", "Common Mistakes: Treating it as a 'safe' position; modern keepers train fielding drills harder than outfield specialists."] },
      { slug: "keeper-stance", title: "The Keeper's Stance", minutes: 5, summary: "Low, balanced, weight forward.", body: ["Definition: The crouched setup behind the stumps from which every glove movement begins.", "Stance: Feet shoulder-width, weight on the balls of the feet, hips below the knees, hands resting just outside off stump at ground level.", "Biomechanics: Knees track over toes to absorb the rise without losing balance; thoracic spine stays neutral.", "Common Mistakes: Bum too high collapses the spine and slows the rise; drill with a mirror or video from side-on."] },
      { slug: "keeper-glove-work", title: "Glove Work Fundamentals", minutes: 5, summary: "Soft gather, fingers down.", body: ["Definition: The technique of receiving the ball cleanly into the gloves without spilling or jarring.", "Mechanics: Fingers point down for anything below the waist, up for anything above; ball pocketed into the web, not slapped into the palm.", "Physics: Gloves give over 10–15 cm to absorb peak impact force — reduces rebound to near zero.", "Drill: Underarm 50-reps at varying heights from 3m; track clean-take percentage."] },
    ],
  },
  {
    slug: "equipment-science",
    title: "Equipment Science",
    tagline: "Bats, pads, helmets & the gear that protects",
    intro: "Every piece of cricket gear is engineered to a spec — willow grade, helmet impact-absorption, spike pattern, glove finger guards. The science behind what you wear and what you wield.",
    icon: "Wrench",
    tint: "from-[oklch(0.7_0.13_70_/_0.12)] to-transparent",
    levels: ["Beginner", "Intermediate", "Academy", "Pro", "Coach", "Fan"],
    lessons: [
      { slug: "bat-anatomy", title: "Anatomy of a Cricket Bat", minutes: 6, summary: "Blade, splice, handle — and the sweet spot.", body: ["Definition: A cricket bat is a single piece of willow blade joined by a tapered splice to a cane-and-rubber handle.", "Materials: English willow (Salix alba var. caerulea) for elite, Kashmir willow for entry-level; cane handle with rubber inserts for shock absorption.", "Physics: Sweet spot sits 6–10 cm above the toe — the node of the bat's natural vibration mode, transferring maximum energy with minimal sting.", "Tactical Use: Heavier bats (1.25 kg+) suit power hitters (Pollard); lighter bats (1.10–1.18 kg) favour timing players (Tendulkar, Williamson).", "Common Mistakes: Choosing a bat by weight only — pickup balance matters more than dead weight."] },
      { slug: "willow-grades", title: "Willow Grades & Edges", minutes: 5, summary: "Grain count, edges, and what makes a Grade 1.", body: ["Definition: Grading scale (G1–G4 for English willow) based on grain count, evenness, blemishes and pickup feel.", "Materials: G1 — 6–12 straight grains, no blemish; G4 — 4–6 grains, minor blemishes, butterfly stains allowed.", "Physics: More grains = stiffer, more responsive but more fragile; wider edges (38–42 mm under MCC limit) increase the sweet zone.", "Tactical Use: Pros usually play G1; academy and club cricket gets G2–G3 with no measurable performance gap below international pace.", "Common Mistakes: Equating grain count with performance — pickup, balance and ping matter more."] },
      { slug: "bat-knocking-oiling", title: "Knocking-In, Oiling & Bat Care", minutes: 5, summary: "Why a new bat needs 6 hours of mallet work.", body: ["Definition: The compression process that compresses willow fibres on the face and edges of a new bat before live use.", "Mechanics: 4–6 hours of progressive mallet work plus old-ball throwdowns; surface starts soft, ends with a hardened playing layer.", "Physics: Knocking-in raises the willow's effective hardness, preventing edge cracks and surface dents under live pace.", "Common Mistakes: Skipping knocking-in — the bat splits on first live encounter with a 130+ km/h ball.", "Care: Light raw linseed oil 2–3 times a season; never over-oil (kills the ping)."] },
      { slug: "helmet-engineering", title: "Helmet Engineering & Impact Absorption", minutes: 6, summary: "BS 7928:2013 and why the grill gap matters.", body: ["Definition: Cricket helmets are engineered to British Standard BS 7928:2013, tested against ball impact up to 90 mph (145 km/h).", "Materials: ABS or carbon-fibre shell over EPP foam; titanium grill with calibrated bar spacing.", "Physics: Grill bar gap must be smaller than the ball — the 2013 standard tightened gap tolerance after the 2014 Phil Hughes tragedy.", "Tactical Use: Mandatory in international cricket post-2014; junior cricket requires neck-guard 'stem-guards' against bouncers.", "Injury Risks: Even with helmets, concussion remains the most-tracked injury; new ICC concussion-substitute rule allows like-for-like replacement.", "Common Mistakes: Loose chin strap — a poorly fitted helmet rotates on impact and exposes the temple."] },
      { slug: "batting-pads-gloves", title: "Batting Pads, Gloves & Protection", minutes: 5, summary: "PU foam, finger rolls, thigh pads.", body: ["Definition: Pads (front and back), gloves, thigh pad, arm guard, chest guard, abdominal guard — the layered protective system for the batter.", "Materials: High-density PU foam over cane rods for pads; high-density foam rolls for gloves; HDPE shells for chest and thigh guards.", "Physics: Each pad layer dissipates impact energy over a larger area, reducing peak pressure on bone by 60–80%.", "Tactical Use: Lighter pads (450–550g) suit running between wickets; heavier traditional pads (650–800g) absorb pace better.", "Common Mistakes: Old, compressed foam loses impact resistance — replace every 2–3 seasons of regular use."] },
      { slug: "wk-gear", title: "Wicketkeeping Gloves & Inners", minutes: 5, summary: "Web, finger rolls and the inner cotton liner.", body: ["Definition: Specialist gloves with a web between thumb and index for catching, plus padded inner liners for impact absorption.", "Materials: Leather palm with rubber pimple grip; web is reinforced with PU rolls; inners are cotton or chamois.", "Physics: The web increases effective catching area by ~30% and creates a passive 'soft cup' that absorbs the ball without rebound.", "Tactical Use: Stand-up keeping uses tighter, more dexterous gloves; stand-back to pacers uses larger, more padded models.", "Common Mistakes: Skipping inners — bare-hand keeping to pace causes finger jamming and long-term joint damage."] },
      { slug: "shoes-spikes", title: "Cricket Shoes & Spike Patterns", minutes: 5, summary: "Full spikes, half spikes, rubbers.", body: ["Definition: Cricket footwear is split into full-spike (8 metal spikes, for bowlers and batters on grass), half-spike (4 spikes + rubbers, all-rounder), and rubber-stud (artificial surfaces, indoor).", "Materials: Leather or synthetic upper, PU midsole, replaceable spike studs.", "Physics: Metal spike grip is critical for bowlers' front-foot brace — slippage costs pace and increases ACL/MCL injury risk.", "Tactical Use: Curated by surface — full spikes on natural turf, rubbers on drop-in pitches and artificial outfields.", "Injury Risks: Worn spikes increase slip-related ankle injuries; rotate two pairs across long tours to manage wear.", "Common Mistakes: Bowling in batting half-spikes — the front foot slides at release."] },
      { slug: "stumps-bails", title: "Stumps, Bails & Zings", minutes: 4, summary: "The three pieces of wood (and the LED upgrade).", body: ["Definition: Three wooden stumps 28 inches tall, 9 inches wide overall, joined by two bails — the structure the batter defends.", "Materials: Traditional ash or willow stumps; bails machined to MCC dimensions.", "Physics: Modern Zing bails contain LEDs that light on dislodgement detected by accelerometer in <1/1000s — used to resolve close run-outs.", "Tactical Use: Zings adopted in T20 leagues and the World Cup since 2014; have decided multiple knife-edge run-outs.", "Common Mistakes: Loose bails on a windy day — the umpires may dispense with bails if wind keeps dislodging them (allowed under Law 8.5 of the Laws of Cricket)."] },
      { slug: "ball-equipment-spec", title: "Ball Specification & Manufacturing", minutes: 5, summary: "Cork, leather, lacquer, stitching.", body: ["Definition: ICC specifies ball weight 155.9–163.0 g, circumference 22.4–22.9 cm, with a raised seam of about 80 stitches across six rows.", "Materials: Cork-and-wool core, four leather quarters of alum-tanned cowhide, linen-thread hand stitching for Dukes/SG; machine pressed for Kookaburra.", "Physics: Hand-stitched seam stays proud for 60+ overs aiding swing; machine seams flatten by 25 overs.", "Tactical Use: Dukes (England), Kookaburra (Australia, most ODIs), SG (India home Tests) — each behaves differently and shapes home conditions."] },
      { slug: "training-aids", title: "Training Aids & Tech Equipment", minutes: 5, summary: "From the side-arm to the StanceBeam.", body: ["Definition: Coaching aids — side-arm thrower, bowling machine, batting tee, swing/spin trainers, and sensor-embedded bats (StanceBeam, Smart Cricket).", "Mechanics: Side-arm produces 130+ km/h with seam control; bowling machines provide consistent line and length for technical work.", "Physics: Sensor bats measure bat speed (km/h), backlift angle, swing path and contact quality — feedback within 2 seconds.", "Tactical Use: Used in academy and pro setups to quantify technique and track changes session over session.", "Common Mistakes: Over-reliance on machines flattens the batter's predictive cues; balance with throwdowns and live bowling."] },
    ],
  },
  {
    slug: "physics-science",
    title: "Physics of Cricket",
    tagline: "Forces, flight & the equations behind the game",
    intro: "Every ball is a physics experiment in flight — drag, lift, Magnus force, gravity and elastic collisions decide where it goes. Learn the equations without the pain.",
    icon: "Atom",
    tint: "from-[oklch(0.65_0.18_260_/_0.12)] to-transparent",
    levels: ["Intermediate", "Academy", "Pro", "Coach", "Fan"],
    lessons: [
      { slug: "magnus-force", title: "Magnus Force — Why Spin Curves", minutes: 6, summary: "The sideways force that makes googlies and outswing possible.", body: ["Definition: The Magnus force is the sideways push a spinning ball feels as it flies through air — it's why a leg-break drifts and a football banana-kicks.", "Physics: One side of the spinning ball drags air faster than the other, creating a pressure difference. Force scales with spin rate (RPM), speed and air density.", "Example: Shane Warne's leg-break generated ~2,200 RPM — enough Magnus drift to move the ball 60 cm sideways in the air.", "Applies to: Every spin ball, plus conventional swing when the seam angles airflow asymmetrically."] },
      { slug: "drag-and-lift", title: "Drag, Lift & Terminal Velocity", minutes: 6, summary: "Why a 150 km/h ball only decelerates ~2 m/s.", body: ["Definition: Drag is air resistance; lift is any perpendicular aerodynamic force.", "Physics: Drag scales with velocity squared and cross-sectional area. A cricket ball at 145 km/h experiences ~0.3 N of drag over 20 metres.", "Terminal velocity for a cricket ball is ~118 km/h — a top-edged skier from a bouncer approaches it on the way down.", "Application: Explains why altitude venues (Johannesburg, Dharamsala) produce 6–8% longer sixes."] },
      { slug: "elastic-collisions", title: "Bat-Ball Collision Physics", minutes: 6, summary: "Coefficient of restitution and the sweet spot.", body: ["Definition: Bat-ball collisions store some energy elastically and lose the rest to vibration and heat. Coefficient of restitution (COR) measures bounce-back.", "Physics: The bat's sweet spot is the node of its first vibration mode — hitting it minimises energy loss and stings the hands least.", "Numbers: A timed cover drive returns the ball at ~1.4× incoming speed. Miss the sweet spot by 3 cm and exit velocity drops 20%.", "Explains: Why timing beats muscle — Brian Lara's drives out-ran many bigger hitters'."] },
      { slug: "projectile-motion", title: "Projectile Motion & The Perfect Six", minutes: 5, summary: "Launch angle, exit velocity, and the 45° myth.", body: ["Definition: A hit ball follows a parabola shaped by launch angle and exit velocity.", "Physics: Without drag, 45° is optimal for distance. With drag and backspin lift, ~30–32° maximises six distance for a cricket ball at 130+ km/h exit velocity.", "Example: Chris Gayle's flat sixes launch at ~28°; Kieron Pollard's tower-hits at ~35°.", "Fun fact: Yuvraj Singh's six sixes in an over (2007) averaged 32° launch angle."] },
      { slug: "kinetic-chain-physics", title: "Kinetic Chain — Energy Physics", minutes: 6, summary: "How legs become 150 km/h at the wrist.", body: ["Definition: Bowling is a whip — kinetic energy passes leg → hip → trunk → shoulder → elbow → wrist, each segment amplifying speed.", "Physics: Each joint acts as a lever amplifying angular velocity. A 1% sequencing gain adds 2–3 km/h at release.", "Numbers: Front-foot contact returns 8–10× body weight, converted into ~200 J of rotational energy at the shoulder."] },
      { slug: "reynolds-number", title: "Reynolds Number & Reverse Swing", minutes: 6, summary: "The dimensionless number behind why old balls reverse.", body: ["Definition: Reynolds number (Re) tells whether airflow around the ball is laminar (smooth) or turbulent (chaotic).", "Physics: Around Re ~90,000 (roughly 90 km/h with a new ball) airflow transitions from laminar to turbulent — which is why conventional swing suddenly appears above that speed.", "Reverse swing: With a rough, worn ball both sides go turbulent, but the seam side separates later — pulling the ball toward the shiny side (opposite conventional swing).", "Example: Waqar Younis and Wasim Akram exploited this at 140+ km/h with a 40-over-old ball."] },
    ],
  },
  {
    slug: "biomechanics-science",
    title: "Biomechanics of Cricket",
    tagline: "Joints, muscles & the body under load",
    intro: "How the human body creates pace, torque and repeatable technique — and why the same action that produces 145 km/h can also produce a stress fracture.",
    icon: "Activity",
    tint: "from-[oklch(0.7_0.16_180_/_0.12)] to-transparent",
    levels: ["Academy", "Pro", "Coach"],
    lessons: [
      { slug: "hip-shoulder-sep", title: "Hip-Shoulder Separation", minutes: 6, summary: "The elastic twist that stores 40% of a bowler's pace.", body: ["Definition: The angle between hip line and shoulder line at back-foot contact. Elite quicks show 40–60°.", "Biomechanics: The trunk acts like a stretched spring — greater separation stores more elastic energy in oblique and lat muscles.", "Numbers: Dale Steyn and Pat Cummins hit ~55°; a 10° increase can add 3–4 km/h.", "Injury link: Too much separation without core strength drives lumbar stress fractures — the leading cause of long-term bowler absence."] },
      { slug: "front-foot-brace-bio", title: "The Braced Front Leg", minutes: 6, summary: "Why straight beats bent for peak pace.", body: ["Definition: The front knee stays straight (extended) at front-foot contact, transferring ground reaction force up the chain.", "Biomechanics: A straight knee acts as a rigid lever; a bent knee absorbs 20–30% of ground reaction force into the quads instead of the release.", "Examples: Steyn, Cummins, Jhulan Goswami — textbook braces. Bowlers who lose brace lose 5–8 km/h.", "Injury: Sustained brace requires strong quads and glutes; collapse increases knee and hip injury risk."] },
      { slug: "batting-kinetic-chain", title: "The Batting Kinetic Chain", minutes: 6, summary: "Feet, hips, shoulders, hands — in that order.", body: ["Definition: A batting stroke sequences feet → hips → shoulders → arms → wrists, each segment 3–4× faster than the previous.", "Biomechanics: Torso rotation contributes ~60% of bat speed, arms ~25%, wrists the final ~15%.", "Example: Virat Kohli's cover drive shows perfect segmental sequencing on high-speed video.", "Training: Medicine-ball rotational throws build the chain more than bench pressing ever will."] },
      { slug: "shoulder-mechanics", title: "Shoulder Mechanics & Injury", minutes: 5, summary: "External rotation, GIRD, and the bowler's shoulder.", body: ["Definition: Bowling asks the shoulder for extreme external rotation — up to 180° at release.", "Biomechanics: Repeated rotation tightens the posterior capsule (GIRD — Glenohumeral Internal Rotation Deficit).", "Injury link: GIRD above 20° correlates with rotator cuff and labrum injury. Common in wicketkeepers who also throw daily.", "Prevention: Sleeper stretches, external-rotator strengthening, and workload monitoring."] },
      { slug: "eye-tracking-bio", title: "Visual Tracking & Anticipation", minutes: 6, summary: "Why elite eyes jump, not sweep.", body: ["Definition: Elite batters use saccadic (jump) eye movements from bowler's hand to predicted bounce point, not smooth pursuit.", "Biomechanics: The eye's smooth-pursuit system cannot track a 145 km/h ball; only prediction + saccade works.", "Research: Studies on Tendulkar and Kane Williamson show saccades ~200 ms earlier than club players.", "Trainable: Vision therapy and dynamic near-far drills sharpen saccade timing."] },
      { slug: "spinal-loads", title: "Spinal Loads on Fast Bowlers", minutes: 6, summary: "Why lumbar stress fractures dominate injury lists.", body: ["Definition: Peak lumbar compression at front-foot contact reaches 6–8× body weight; peak side-bend torque exceeds any other sport.", "Biomechanics: Mixed actions (shoulder counter-rotation > 30°) double lumbar stress vs pure side-on or front-on actions.", "Data: 15–20% of adolescent fast bowlers develop pars stress fractures — the highest injury rate in cricket.", "Prevention: Action screening, workload ratios <1.5, core stability, no bowling on consecutive days for U19s."] },
    ],
  },
  {
    slug: "mental-science",
    title: "Mental Science",
    tagline: "Focus, pressure & the inner game",
    intro: "Test cricket is 90% mental — the other 10% is mental too. How elite players quiet the noise, reset between balls, and hold their nerve through six-hour spells.",
    icon: "Brain",
    tint: "from-[oklch(0.65_0.2_330_/_0.12)] to-transparent",
    levels: ["Intermediate", "Academy", "Pro", "Coach", "Fan"],
    lessons: [
      { slug: "pre-ball-routine", title: "The Pre-Ball Routine", minutes: 5, summary: "Tap, breath, focus word — repeat.", body: ["Definition: A short, repeatable ritual before every ball that resets attention and calms physiology.", "Psychology: Routines stabilise the cortisol curve, shortening between-ball cognitive load and preserving decision quality across a long innings.", "Examples: Steve Smith's shadow shot, Cheteshwar Pujara's mark-guard, Rahul Dravid's helmet-tap.", "Trainable: 4–7 second routines correlate with longer concentration spans in innings analysis."] },
      { slug: "flow-state", title: "Flow State & Being In The Zone", minutes: 6, summary: "The neurochemistry of a Kohli hundred.", body: ["Definition: Flow is total absorption — the sense that time slows, ball looks huge, and shots pick themselves.", "Neuroscience: Dopamine, norepinephrine, endorphins, anandamide and serotonin cocktail — the highest natural performance-enhancing state known.", "Triggers: Clear goals, immediate feedback, challenge just above skill level (Kohli's chase innings are canonical).", "Killers: Self-talk, scoreboard-watching, thinking about milestones — snaps flow instantly."] },
      { slug: "pressure-and-choking", title: "Pressure, Choking & Reappraisal", minutes: 6, summary: "Why the best still fail 175/3 chasing 176.", body: ["Definition: Choking is skill breakdown under pressure — over-attention to automated movements.", "Psychology: Explicit monitoring theory says pressure makes players 'think' about grip, footwork — disrupting automated skills.", "Countermeasure: Reappraisal — 'this is excitement, not anxiety' — physiologically identical but performance-preserving.", "Case studies: 1999 semi-final tie (South Africa), 2016 T20 WC final (West Indies win) — pressure endgames."] },
      { slug: "resilience", title: "Resilience & The Second Innings", minutes: 6, summary: "Why great players come back from ducks.", body: ["Definition: Resilience = quick return to baseline after failure.", "Psychology: Learned optimism (Seligman) — attributing failure to specific, temporary, external causes.", "Examples: Steve Smith's return post-Sandpaper-gate; Ben Stokes after 2016 T20 final; Rishabh Pant post-accident.", "Trainable: Journaling, cognitive-behavioural techniques, sports psychology support now standard in national setups."] },
      { slug: "visualisation", title: "Visualisation & Mental Rehearsal", minutes: 5, summary: "Practising without moving a muscle.", body: ["Definition: Vivid mental rehearsal of specific deliveries or shots.", "Neuroscience: fMRI shows the same motor cortex regions fire during vivid imagery as during actual movement.", "Examples: Michael Vaughan visualising Warne's leg-breaks pre-2005 Ashes; Kohli's chase-visualisation pre-innings.", "Effective: 10–15 minute sessions 2–3× per week outperform once-a-week 'big' sessions."] },
      { slug: "captaincy-psychology", title: "Captaincy Psychology", minutes: 6, summary: "Leading 10 different personalities.", body: ["Definition: Captaincy blends tactics, mentoring, delegation, and reading team mood.", "Styles: Steve Waugh (uncompromising), MS Dhoni (calm delegator), Meg Lanning (data-driven), Ben Stokes (empowering trust).", "Research: Autonomy support and mastery-focused feedback produce the highest sustained team performance.", "Common trap: Micromanaging bowlers erodes trust — the best captains set fields then step back."] },
    ],
  },
];

// Merge in the comprehensive extra-lessons taxonomy (spin variations,
// fast-bowling variations, modern T20 shots, fielding positions,
// wicketkeeping, equipment, DRS tech, fitness, etc.)
import { EXTRA_LESSONS_BY_MODULE } from "@/lib/modules-extra";
import { ADDITIONAL_LESSONS_BY_MODULE } from "@/lib/modules-additions";
for (const m of MODULES) {
  const existing = new Set(m.lessons.map(l => l.slug));
  for (const bucket of [EXTRA_LESSONS_BY_MODULE[m.slug], ADDITIONAL_LESSONS_BY_MODULE[m.slug]]) {
    if (!bucket) continue;
    for (const l of bucket) {
      if (!existing.has(l.slug)) {
        m.lessons.push(l);
        existing.add(l.slug);
      }
    }
  }
}

// -----------------------------------------------------------------------------
// Re-order each module's lessons into a pedagogical sequence: foundations →
// fundamentals → core techniques → variations → advanced applications.
// Any lesson not listed below keeps its merged order and is appended at the end,
// so adding new lessons later still works without losing them from the UI.
// -----------------------------------------------------------------------------
const LESSON_ORDER: Record<string, string[]> = {
  "bowling-science": [
    "anatomy-of-an-action", "pace-and-the-kinetic-chain", "hip-shoulder-separation",
    "bracing-leg", "slinging-action", "release-angles", "wrist-position-spectrum",
    "seam-presentation", "wobble-seam", "swing-aerodynamics", "conventional-outswing",
    "conventional-inswing", "reverse-swing", "swing-vs-seam", "spin-revolutions",
    "drift-for-spinners", "over-vs-side-spin", "off-break", "arm-ball", "doosra",
    "teesra", "top-spinner-finger", "slider-finger", "carrom-ball",
    "left-arm-orthodox-stock", "left-arm-arm-ball", "left-arm-angle", "chinaman",
    "chinaman-googly", "leg-break", "googly", "flipper", "slider-wrist",
    "top-spinner-wrist", "zooter", "cutters-and-slower-balls", "off-cutter",
    "leg-cutter", "back-of-hand-slower", "knuckle-ball", "yorker-conventional",
    "wide-yorker", "toe-crusher", "bouncer", "death-overs-yorker-package",
    "bowling-to-lr-combos",
  ],
  "batting-science": [
    "conventional-grip", "strong-bottom-hand", "open-stance", "head-position",
    "trigger-movement", "footwork-physics", "reaction-time", "picking-length-early",
    "decision-making", "bat-swing-path", "shot-geometry", "power-vs-timing",
    "forward-defence", "back-foot-defence", "leaving-the-ball", "playing-the-moving-ball",
    "cover-drive", "pull-shot", "hook-shot", "sweep-shot", "sweep-family",
    "slog-sweep", "reverse-sweep", "switch-hit", "switch-hit-ramp", "ramp-scoop",
    "helicopter-shot", "playing-spin", "batting-against-pace", "running-between-wickets",
    "building-an-innings", "matchup-batting", "powerplay-vs-death",
  ],
  "fielding-science": [
    "fielding-positions", "slip-cordon-position", "gully-position",
    "point-cover-positions", "boundary-positions", "long-barrier", "attacking-pickup",
    "sliding-stop", "catching-under-pressure", "high-catch", "high-catch-lights",
    "slip-catch", "close-in-catch", "slip-cordon", "cutting-angles", "flat-throws",
    "relay-throw", "direct-hits", "direct-hit-runout", "boundary-relay",
    "relay-catch", "backing-up-throws", "wind-sun-adjustments", "wagon-wheel-fielding",
  ],
  "wicketkeeping-science": [
    "keeper-overview", "keeper-stance", "keeper-glove-work", "wk-footwork",
    "wk-standing-back", "wk-standing-up", "wk-catching", "wk-edges-off-pace",
    "wk-leg-side-takes", "wk-diving-takes", "wk-stumping", "wk-glove-care",
    "wk-drs-input", "wk-leadership",
  ],
  "pitch-science": [
    "soil-and-bounce", "pitch-preparation", "moisture-and-seam", "pitch-cracks",
    "footmarks-evolution", "bounce-variation", "day-by-day-evolution",
    "pitch-types-by-country", "subcontinent-vs-sena", "drop-in-pitches",
    "day-night-pitch", "reading-the-pitch", "toss-decision", "hawkeye-pitch-map",
  ],
  "ball-science": [
    "anatomy-of-a-ball", "seam-stitching", "ball-manufacturing", "ball-compression",
    "red-vs-white-vs-pink", "white-ball-softening", "pink-ball-night",
    "dukes-vs-kookaburra-vs-sg", "lifecycle-shine-scuff", "ball-age-phases",
    "saliva-ban-alternatives", "ball-flight-physics", "ball-tampering-physics",
    "ball-tampering-history",
  ],
  "environment-science": [
    "temperature-and-fatigue", "humidity-and-swing", "cloud-cover-swing",
    "air-pressure", "wind-and-bowling-ends", "wind-and-swing", "dew-factor",
    "grass-length-dew", "dew-management", "altitude", "rain-and-dls",
    "sightscreen-shadows",
  ],
  "fitness-science": [
    "energy-systems", "position-conditioning", "pre-match-warmup", "sprint-mechanics",
    "shoulder-hip-mobility", "finger-forearm-strength", "strength-for-batters",
    "mobility-and-recovery", "hydration-in-heat", "match-day-nutrition",
    "recovery-sleep-nutrition", "travel-jet-lag", "injury-prevention",
    "return-to-play", "mental-skills",
  ],
  "umpiring-science": [
    "umpire-signals", "lbw-logic", "wide-judgment", "no-balls-and-free-hits",
    "dead-ball", "boundary-catches-umpire", "soft-signal-and-catches",
    "drs-technology", "hawkeye-detail", "ultraedge-snicko", "snicko-and-hot-spot",
    "hot-spot", "drs-protocol", "drs-strategy", "mankad", "concussion-substitute",
    "time-wasting-over-rates",
  ],
  "equipment-science": [
    "bat-anatomy", "bat-profile", "willow-grades", "bat-knocking-oiling",
    "toe-guard-repair", "ball-equipment-spec", "stumps-bails", "helmet-engineering",
    "batting-pads-gloves", "thigh-arm-guards", "inner-gloves", "wk-gear",
    "shoes-spikes", "sunglasses-sweatbands", "training-aids",
  ],
};

for (const m of MODULES) {
  const order = LESSON_ORDER[m.slug];
  if (!order) continue;
  const rank = new Map(order.map((s, i) => [s, i]));
  m.lessons.sort((a, b) => {
    const ra = rank.has(a.slug) ? (rank.get(a.slug) as number) : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.slug) ? (rank.get(b.slug) as number) : Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}

export const MODULE_BY_SLUG: Record<string, Module> = Object.fromEntries(MODULES.map(m => [m.slug, m]));

const MODULE_QUIZZES: Quiz[] = MODULES.map(m => ({
  id: `${m.slug}-starter`,
  moduleSlug: m.slug,
  title: `${m.title} — Tile Quiz`,
  xp: 60,
  questions: starterQuestionsFor(m.slug),
}));

export const QUIZZES: Quiz[] = [...MODULE_QUIZZES];

export const QUIZ_BY_ID: Record<string, Quiz> = Object.fromEntries(QUIZZES.map(q => [q.id, q]));

function starterQuestionsFor(slug: string): QuizQuestion[] {
  const bank: Record<string, QuizQuestion[]> = {
    "bowling-science": [
      { q: "What causes conventional swing in a cricket ball?", options: ["A heavier core on one side", "Different airflow over the shiny vs rough side", "Wind direction at the ground", "The bowler's grip strength"], answer: 1, explain: "One side is polished, the other rough — creating an asymmetric boundary layer and a sideways force." },
      { q: "Roughly how many RPM does an elite finger spinner impart?", options: ["200–500", "1,500–2,500", "5,000–7,000", "10,000+"], answer: 1, explain: "1,500–2,500 RPM is the elite range. Higher revs produce more drift, dip and turn." },
      { q: "Which phase produces peak ground reaction force in a bowling action?", options: ["Run-up", "Back-foot contact", "Front-foot contact", "Follow-through"], answer: 2, explain: "Front-foot contact returns 8–10× body weight, which gets channeled up the kinetic chain." },
      { q: "Reverse swing typically activates above which approximate ball speed?", options: ["~100 km/h", "~120 km/h", "~135 km/h", "~160 km/h"], answer: 2, explain: "Above ~135 km/h with a worn ball, both sides go turbulent and the rough side separates later — pulling the ball the opposite way." },
      { q: "Which delivery is gripped between bent index and middle fingers, releasing with almost no spin?", options: ["Knuckle ball", "Doosra", "Carrom ball", "Leg-cutter"], answer: 0, explain: "Zaheer Khan and Bhuvneshwar Kumar popularised the knuckle ball — low spin, low rebound, brutal in the death." },
      { q: "What is the world record for the fastest legal delivery in international cricket?", options: ["152.0 km/h", "156.4 km/h", "161.3 km/h", "168.2 km/h"], answer: 2, explain: "Shoaib Akhtar bowled 161.3 km/h vs England, 2003 World Cup — still the fastest officially recorded delivery." },
    ],
    "batting-science": [
      { q: "Approximately how long does a 145 km/h ball take to reach the batter?", options: ["240 ms", "440 ms", "640 ms", "840 ms"], answer: 1, explain: "About 440 ms total — only ~240 ms remains for actual decision and movement after visual processing." },
      { q: "Why is a still head so important in batting?", options: ["It looks professional", "It keeps the eyes binocular and the centre of mass stable", "It improves bat grip", "It prevents helmet movement"], answer: 1, explain: "A still head means stable eyes and balanced weight transfer — Dravid and Root are textbook examples." },
      { q: "Where is the sweet spot on a cricket bat?", options: ["At the very toe", "6–10 cm above the toe", "On the splice", "On the handle"], answer: 1, explain: "The sweet spot sits 6–10 cm above the toe, at the node of the bat's natural vibration mode." },
      { q: "Which batter is most associated with pioneering the modern switch hit?", options: ["Sachin Tendulkar", "Kevin Pietersen", "Ricky Ponting", "Brian Lara"], answer: 1, explain: "Pietersen reversed his stance mid-delivery against Muralitharan in 2008, mainstreaming the switch hit." },
      { q: "What does 'predictive looking' refer to in elite batting?", options: ["Watching the scoreboard", "Saccading from the bowler's hand to the predicted bounce point before the ball arrives", "Reading the bowler's lips", "Studying field placements between balls"], answer: 1, explain: "Eye-tracking on Tendulkar and Williamson shows earlier eye jumps to the bounce point than club-level batters." },
      { q: "On a turning subcontinental track, which counter most reliably neutralises spin?", options: ["Hitting from the crease", "Going hard at the pitch of the ball", "Closing the bat face early", "Backing away to leg"], answer: 1, explain: "Getting to the pitch of the ball before it spins is the Tendulkar / Younis Khan template." },
    ],
    "fielding-science": [
      { q: "Why do outfielders curve their run to the ball?", options: ["To look stylish", "To align the throwing shoulder with the stumps", "To confuse the batter", "It's required by the laws"], answer: 1, explain: "A curved approach lines up the throw without an extra pivot — saving up to 0.4 s." },
      { q: "What is the ideal launch angle for a long flat throw to the keeper?", options: ["~12°", "~30°", "~45°", "~60°"], answer: 0, explain: "Around 12° beats higher angles by 0.3 s over 65 m and arrives at a catchable height." },
      { q: "Who holds the record for most Test catches by a non-keeper?", options: ["Mahela Jayawardene", "Rahul Dravid", "Ricky Ponting", "Joe Root"], answer: 1, explain: "Dravid took 210 Test catches, almost all in the slip cordon — the highest by an outfielder." },
      { q: "Which 1992 World Cup run-out by Jonty Rhodes became the template for the modern direct hit?", options: ["Salim Malik", "Inzamam-ul-Haq", "Aravinda de Silva", "Javed Miandad"], answer: 1, explain: "Rhodes' airborne run-out of Inzamam vs Pakistan rewrote expectations for athletic fielding." },
      { q: "Why does perceived ball speed rise 10–15% under pressure?", options: ["Wind effects", "Cortisol's effect on visual processing", "Crowd noise", "Floodlight glare"], answer: 1, explain: "Stress hormones compress perceived time, so pre-catch breathing routines are used to flatten the spike." },
    ],
    "wicketkeeping-science": [
      { q: "How long does a keeper have to complete a stumping after the ball reaches the gloves?", options: ["Under 0.4 s", "About 1 s", "About 2 s", "No time limit"], answer: 0, explain: "The full gather-and-break must beat a recovering batter — under 0.4 s in elite keeping." },
      { q: "Why do keepers stand 15–25 m back to a fast bowler?", options: ["Tradition", "To preserve reaction time to the edge", "To stay out of the umpire's view", "To avoid sledging the batter"], answer: 1, explain: "Distance buys enough time to react to a 145 km/h thin edge." },
      { q: "Which keeper is famed as the team's 'DRS Review System'?", options: ["Adam Gilchrist", "MS Dhoni", "Alan Knott", "Mark Boucher"], answer: 1, explain: "Dhoni's review success rate was so high that DRS became known as the 'Dhoni Review System'." },
      { q: "Who holds the record for the most dismissals in Test cricket as a wicketkeeper?", options: ["Adam Gilchrist", "Mark Boucher", "Ian Healy", "MS Dhoni"], answer: 1, explain: "Boucher took 555 Test dismissals (532 catches, 23 stumpings) — the most by any keeper." },
      { q: "Which is the correct keeping foot movement to a ball drifting down leg?", options: ["Cross-over step with hands first", "Pivot on the back foot and shadow the line, hands trailing", "Dive immediately", "Step back and reach"], answer: 1, explain: "Pivoting on the back foot keeps the body behind the ball; hands stay relaxed and trail." },
    ],
    "pitch-science": [
      { q: "What soil property most predicts true, even bounce?", options: ["Silt content", "Clay content above ~50%", "Sand percentage", "Grass length"], answer: 1, explain: "High clay content compresses tightly and produces predictable pace and bounce." },
      { q: "Why does a Test pitch typically spin more on days 4–5?", options: ["The ball is older", "Surface dust and cracks give spinners more grip and variable bounce", "Umpires allow more spin", "Bowlers tire and bowl slower"], answer: 1, explain: "The surface breaks down, exposing dry soil that grips the seam." },
      { q: "Which venue is nicknamed 'the Bullring' for its bounce and pace?", options: ["WACA, Perth", "The Wanderers, Johannesburg", "Centurion", "Eden Park"], answer: 1, explain: "The Wanderers' high-bounce, lateral-seam surface earned it the 'Bullring' nickname." },
      { q: "What grass length and moisture combo is the classic English seamer?", options: ["1–2 mm, bone dry", "8–12 mm with slight surface moisture", "20+ mm, soaked", "No grass, watered overnight"], answer: 1, explain: "8–12 mm of live grass with slight moisture lets the seam grip on impact — Trent Bridge / Headingley." },
      { q: "Which country's pitches are typically low-clay, slow turners that grip from day two?", options: ["Australia", "England", "India / Sri Lanka", "South Africa"], answer: 2, explain: "Subcontinental pitches break up early, gripping spin and inviting reverse swing by over 35." },
    ],
    "ball-science": [
      { q: "Why does a pink ball swing for longer than a red ball?", options: ["Larger seam", "Extra polyurethane coating maintains shine longer", "Heavier core", "Cooler temperature at night"], answer: 1, explain: "The PU coat preserves the shiny side, so swing-conducive airflow lasts further into the innings." },
      { q: "Approximately how many stitches form a cricket ball's seam?", options: ["~20", "~50", "~80", "~120"], answer: 2, explain: "About 80 hand stitches across six rows give the seam its prominence." },
      { q: "Which ball is hand-stitched and keeps a proud seam for 60+ overs?", options: ["Kookaburra", "Dukes", "White-leather T20", "Tennis ball"], answer: 1, explain: "Dukes are hand-stitched with linen thread — the seam stays raised long enough to swing into the second new ball." },
      { q: "What is the legal weight range of a men's cricket ball under ICC playing conditions?", options: ["120–135 g", "140–155 g", "155.9–163.0 g", "170–185 g"], answer: 2, explain: "ICC specifies 155.9–163.0 g, circumference 22.4–22.9 cm." },
      { q: "Which ball is used in most Australian first-class and ODI matches?", options: ["Dukes", "SG", "Kookaburra", "Readers"], answer: 2, explain: "Kookaburra is machine-pressed; its seam flattens by about 25 overs, shaping Australian bowling plans." },
    ],
    "equipment-science": [
      { q: "Where is the sweet spot on a cricket bat?", options: ["At the toe", "6–10 cm above the toe", "Halfway up the blade", "On the splice"], answer: 1, explain: "The sweet spot sits 6–10 cm above the toe — the node of the bat's natural vibration mode." },
      { q: "What standard governs modern international cricket helmets?", options: ["BS 7928:2013", "ISO 9001", "ICC Helmet Code 2007", "There is no standard"], answer: 0, explain: "BS 7928:2013 tightened helmet and grill testing after the 2014 Phil Hughes tragedy." },
      { q: "Why does an English Willow Grade 1 bat ping more than a Grade 4?", options: ["It is heavier", "More straight grains = stiffer, more responsive blade", "It has bigger edges", "Different handle"], answer: 1, explain: "G1 has 6–12 straight grains for maximum response, but is more fragile than lower grades." },
      { q: "How many hours of knocking-in does a new English-willow bat typically need?", options: ["Under 30 minutes", "4–6 hours of progressive mallet work plus throwdowns", "20+ hours", "None — modern bats are pre-knocked"], answer: 1, explain: "4–6 hours of mallet work compresses the surface fibres so the bat survives live pace." },
      { q: "What technology lights up bails on dislodgement within ~1 ms?", options: ["Hawk-Eye", "Snicko", "Zing bails", "Hot Spot"], answer: 2, explain: "Zing bails contain LEDs triggered by an accelerometer — adopted in T20 leagues and World Cups since 2014." },
    ],
    "environment-science": [
      { q: "What actually changes more with cloud cover than humidity?", options: ["Ball weight", "Pitch and ball temperature, preserving lacquer and seam grip", "Wind speed", "Light meter readings only"], answer: 1, explain: "It is the temperature and moisture preservation under clouds that helps the ball, not humidity itself." },
      { q: "Why do sixes travel farther in Johannesburg?", options: ["Larger bats are used", "Air density at altitude drops ~15%, reducing drag", "Smaller boundaries by rule", "Lighter ball at altitude"], answer: 1, explain: "Thinner air means less drag — six-hitting distance increases 6–8%." },
      { q: "What is the main effect of heavy evening dew in a day-night match?", options: ["Ball swings more", "Ball gets wet and skids on, neutralising spin and slowing seam", "Pitch cracks heal", "Bowlers grip the seam better"], answer: 1, explain: "Dew is why captains often bowl first under lights — spinners and seamers both lose bite." },
      { q: "Which wind direction most helps a right-arm in-swing bowler to a right-hander?", options: ["Cross-wind from leg side to off side", "Cross-wind from off side to leg side", "Direct headwind", "Direct tailwind"], answer: 1, explain: "A cross-wind blowing toward the leg side enhances in-swing by reinforcing the natural pressure differential." },
      { q: "Which Indian venue is notorious for early-evening dew affecting white-ball matches?", options: ["Dharamsala", "Chinnaswamy, Bengaluru", "Wankhede, Mumbai", "Eden Gardens, Kolkata"], answer: 2, explain: "Wankhede's coastal humidity produces heavy dew, regularly forcing captains to bowl first." },
    ],
    "fitness-science": [
      { q: "Which energy system fuels a single sprint between wickets?", options: ["Aerobic", "ATP-PCr", "Lactic / glycolytic", "Beta-oxidation"], answer: 1, explain: "ATP-PCr handles all-out efforts under ~10 s; full recovery in 60–90 s." },
      { q: "What workload metric best predicts fast-bowling stress fractures?", options: ["Total km run", "Acute:chronic workload ratio above 1.5", "Body weight", "Sleep hours"], answer: 1, explain: "Spikes relative to recent baseline are the strongest predictor of bone-stress injuries." },
      { q: "Which muscle group most directly limits a fast bowler's front-foot brace?", options: ["Biceps", "Quadriceps and gluteals", "Forearms", "Calves only"], answer: 1, explain: "The braced front leg returns 8–10× bodyweight — quads and glutes carry that load." },
      { q: "What is the typical Yo-Yo Intermediate Test Level 2 cut-off for international male cricketers?", options: ["10.0", "14.3", "17.4", "21.0"], answer: 2, explain: "Boards like BCCI use ~17.4 as the entry standard for men's international squads." },
      { q: "Which recovery modality has the strongest evidence for next-day bowling performance?", options: ["Ice baths only", "Sleep ≥8 h plus protein within 1 h of finishing", "Static stretching", "Sauna alone"], answer: 1, explain: "Sleep and timely protein outperform any single modality for muscle and CNS recovery." },
    ],
    "umpiring-science": [
      { q: "What is the first question in the LBW decision tree?", options: ["Was the batter playing a shot?", "Did it pitch in line?", "Would it hit the stumps?", "Was there an edge?"], answer: 1, explain: "Pitching in line comes first — outside leg ends the appeal regardless of impact and projection." },
      { q: "How many frames per second do Hawk-Eye cameras capture?", options: ["60", "120", "340", "1,000"], answer: 2, explain: "Around 340 fps, allowing precise triangulation of ball position." },
      { q: "Under DRS 'umpire's call' for LBW, what minimum of the ball must hit the stumps to overturn 'not out'?", options: ["Any contact", "More than 50% of the ball striking the wicket zone", "100% of the ball", "Two stumps and the bail"], answer: 1, explain: "If less than half the ball clips the wicket zone, on-field 'not out' stays as umpire's call." },
      { q: "Which technology detects a faint edge by combining audio spikes with thermal imaging?", options: ["Snicko + Hot Spot", "Hawk-Eye + ball-tracking", "Zing + Stump Mic", "Spidercam + Snicko"], answer: 0, explain: "Real-Time Snickometer pairs with Hot Spot's infrared signature to confirm thin edges." },
      { q: "Which signal denotes a dead ball by the umpire?", options: ["Both arms above head", "Crossed wrists waved low in front of the body", "Tap on the shoulder", "Touching the cap"], answer: 1, explain: "Crossed wrists waved at waist height is the standard dead-ball signal under MCC Laws." },
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
