// 17-section lesson schema, parser for existing labeled-bullet lesson bodies,
// and a Famous Players extractor (curated overrides + auto-extraction from
// player names mentioned inline in the body).

import type { Lesson } from "@/lib/modules";

export type SectionKey =
  | "definition"
  | "etymology"
  | "history"
  | "difficulty"
  | "grip"
  | "fingerPlacement"
  | "wristPosition"
  | "armPath"
  | "shoulderMovement"
  | "hipRotation"
  | "footPlacement"
  | "releasePoint"
  | "seamOrientation"
  | "physics"
  | "aerodynamics"
  | "biomechanics"
  | "tacticalUse"
  | "drills"
  | "injuryRisks";

export type SectionDef = { key: SectionKey; label: string; icon: string };

export const SECTION_DEFS: SectionDef[] = [
  { key: "definition", label: "Definition", icon: "BookOpen" },
  { key: "etymology", label: "Etymology", icon: "BookText" },
  { key: "history", label: "History", icon: "Landmark" },
  { key: "difficulty", label: "Difficulty Level", icon: "Gauge" },
  { key: "grip", label: "Grip", icon: "Hand" },
  { key: "fingerPlacement", label: "Finger Placement", icon: "Fingerprint" },
  { key: "wristPosition", label: "Wrist Position", icon: "RotateCw" },
  { key: "armPath", label: "Arm Path", icon: "Activity" },
  { key: "shoulderMovement", label: "Shoulder Movement", icon: "MoveDiagonal" },
  { key: "hipRotation", label: "Hip Rotation", icon: "Repeat" },
  { key: "footPlacement", label: "Foot Placement", icon: "Footprints" },
  { key: "releasePoint", label: "Release Point", icon: "Crosshair" },
  { key: "seamOrientation", label: "Seam Orientation", icon: "CircleDot" },
  { key: "physics", label: "Physics Involved", icon: "Atom" },
  { key: "aerodynamics", label: "Aerodynamics", icon: "Wind" },
  { key: "biomechanics", label: "Biomechanics", icon: "PersonStanding" },
  { key: "tacticalUse", label: "Tactical Use", icon: "Target" },
  { key: "drills", label: "Common Mistakes & Drills", icon: "Dumbbell" },
  { key: "injuryRisks", label: "Injury Risks", icon: "ShieldAlert" },
];

// Maps labels found in lesson body bullets ("Grip & Fingers:", "Release:")
// to canonical section keys. Multiple labels can feed one key.
const LABEL_MAP: Array<[RegExp, SectionKey]> = [
  [/^definition\b/i, "definition"],
  [/^etymology\b/i, "etymology"],
  [/^origin(?:\s+of\s+name)?\b/i, "etymology"],
  [/^name origin\b/i, "etymology"],
  [/^history\b/i, "history"],
  [/^background\b/i, "history"],
  [/^heritage\b/i, "history"],
  [/^difficulty(?: level)?\b/i, "difficulty"],
  [/^grip(?:\s*&.*)?$/i, "grip"],
  [/^grip(?:\s*&.*)?:?$/i, "grip"],
  [/^grip\b/i, "grip"],
  [/^hand placement\b/i, "grip"],
  [/^pressure\b/i, "grip"],
  [/^fingers?\b/i, "fingerPlacement"],
  [/^finger placement\b/i, "fingerPlacement"],
  [/^wrist(?:\s*&.*)?\b/i, "wristPosition"],
  [/^wrist position\b/i, "wristPosition"],
  [/^arm(?:\s*&.*)?\b/i, "armPath"],
  [/^arm path(?:\s*&.*)?\b/i, "armPath"],
  [/^shoulder(?:s)?(?:\s*&.*)?\b/i, "shoulderMovement"],
  [/^hips?(?:\s*&.*)?\b/i, "hipRotation"],
  [/^hip rotation\b/i, "hipRotation"],
  [/^foot(?:work)?\b/i, "footPlacement"],
  [/^foot placement\b/i, "footPlacement"],
  [/^stance(?:\s*&.*)?\b/i, "footPlacement"],
  [/^release(?:\s*&.*)?\b/i, "releasePoint"],
  [/^release point\b/i, "releasePoint"],
  [/^release & geometry\b/i, "releasePoint"],
  [/^geometry\b/i, "releasePoint"],
  [/^seam(?:\s*&.*)?\b/i, "seamOrientation"],
  [/^seam & shine\b/i, "seamOrientation"],
  [/^seam orientation\b/i, "seamOrientation"],
  [/^physics(?:\s*&.*)?\b/i, "physics"],
  [/^physics involved\b/i, "physics"],
  [/^aerodynamics?\b/i, "aerodynamics"],
  [/^biomechanics?\b/i, "biomechanics"],
  [/^effect\b/i, "biomechanics"],
  [/^mechanics?\b/i, "biomechanics"],
  [/^tactical(?:\s+use)?\b/i, "tacticalUse"],
  [/^tactics?\b/i, "tacticalUse"],
  [/^ball condition\b/i, "tacticalUse"],
  [/^legality\b/i, "tacticalUse"],
  [/^common mistakes?(?:\s*&.*)?\b/i, "drills"],
  [/^mistakes?\b/i, "drills"],
  [/^drills?\b/i, "drills"],
  [/^injury(?:\s+risks?)?\b/i, "injuryRisks"],
  [/^safety\b/i, "injuryRisks"],
];

function classifyLabel(label: string): SectionKey | null {
  for (const [re, key] of LABEL_MAP) if (re.test(label)) return key;
  return null;
}

export type ParsedSections = Partial<Record<SectionKey, string[]>>;
export type ParsedLesson = {
  sections: ParsedSections;
  notes: string[]; // unlabeled body lines
};

const LABEL_LINE = /^([A-Z][A-Za-z&/\- ]{2,40}?)\s*:\s*(.+)$/;

export function parseLessonBody(lesson: Lesson): ParsedLesson {
  const sections: ParsedSections = {};
  const notes: string[] = [];
  for (const line of lesson.body) {
    const m = LABEL_LINE.exec(line.trim());
    if (m) {
      const key = classifyLabel(m[1]);
      if (key) {
        (sections[key] ||= []).push(m[2].trim());
        continue;
      }
    }
    notes.push(line);
  }
  return { sections, notes };
}

// ---------------------------------------------------------------------------
// Difficulty inference — derived from the lesson topic when not stated.
// ---------------------------------------------------------------------------
export function inferDifficulty(lesson: Lesson, parsed: ParsedSections): string | null {
  if (parsed.difficulty?.length) return parsed.difficulty.join(" ");
  const t = lesson.title.toLowerCase();
  if (/(doosra|carrom|teesra|googly|chinaman|flipper|switch hit|reverse sweep|ramp|scoop|reverse swing|knuckle)/.test(t))
    return "Advanced — high-skill ceiling, requires drilled repetition and biomechanical screening before match use.";
  if (/(yorker|bouncer|cover drive|pull|hook|sweep|outswing|inswing|leg break|off break|cutter|wobble)/.test(t))
    return "Intermediate — accessible technique with a steep accuracy curve in match conditions.";
  if (/(grip|stance|defence|trigger|forward defence|back-foot defence)/.test(t))
    return "Foundation — the first thing every player learns; the basis of every advanced variation.";
  return null;
}

// ---------------------------------------------------------------------------
// Etymology — origin of the term used in the lesson title.
// ---------------------------------------------------------------------------
const ETYMOLOGY_MAP: Array<[RegExp, string]> = [
  [/doosra/i, "'Doosra' is Urdu/Hindi for 'the other one' — coined to describe the off-spinner's ball that turns the opposite way."],
  [/teesra/i, "'Teesra' is Urdu/Hindi for 'the third one', named as the follow-up variation to the doosra."],
  [/googly/i, "'Googly' entered cricket lexicon around 1903 via English leg-spinner B. J. T. Bosanquet; the term likely evokes the confused, 'goggling' look of the batter."],
  [/chinaman/i, "'Chinaman' traces to a 1933 Old Trafford Test: West Indian left-arm wrist-spinner Ellis 'Puss' Achong (of Chinese descent) dismissed Walter Robins, who muttered 'fancy being done by a bloody Chinaman'."],
  [/carrom/i, "Named after the carrom board — the ball is flicked out with a bent middle finger, mimicking the striker flick used in the tabletop game."],
  [/flipper/i, "'Flipper' describes the wrist-spinner's back-spinning ball 'flipped' out from under the fingers, popularised by Clarrie Grimmett in the 1930s."],
  [/yorker/i, "The 'yorker' likely takes its name from Yorkshire bowlers of the 19th century known for pitching the ball at the batter's feet ('to york' a batter)."],
  [/bouncer/i, "'Bouncer' is simply descriptive — a short ball that bounces up sharply toward the batter's head or chest."],
  [/reverse swing/i, "'Reverse swing' was named in Pakistan in the 1970s–80s: an old ball that swings toward the shiny side, i.e. the reverse of conventional swing."],
  [/switch hit/i, "'Switch hit' describes the batter switching handedness mid-delivery; Kevin Pietersen brought it into the mainstream in 2008."],
  [/reverse sweep/i, "The 'reverse sweep' is a sweep played with the bat face reversed; Mushtaq Mohammad is widely credited with pioneering it in the 1970s."],
  [/scoop|ramp|dilscoop/i, "'Scoop' / 'ramp' names the shot that lifts the ball over the keeper; the 'Dilscoop' was branded after Tillakaratne Dilshan at the 2009 World T20."],
  [/knuckle ball/i, "Borrowed from baseball — the ball is held with knuckles or nails so it leaves the hand with minimal spin, mimicking baseball's knuckleball."],
  [/wobble seam/i, "'Wobble seam' describes a seam released tilted so it wobbles in flight, causing unpredictable movement off the pitch."],
  [/off[- ]?break|off[- ]?spin/i, "'Off-break' names the ball that breaks from the off side toward the leg side for a right-hand batter."],
  [/leg[- ]?break|leg[- ]?spin/i, "'Leg-break' names the ball that breaks from the leg side to the off side for a right-hand batter."],
  [/out[- ]?swing/i, "'Outswing' describes the ball moving away from the right-hand batter after pitching-line release."],
  [/in[- ]?swing/i, "'Inswing' describes the ball moving into the right-hand batter."],
  [/cover drive/i, "'Cover drive' is named after the fielding position it is hit through — cover."],
  [/pull shot|pull\b/i, "'Pull' describes the batter pulling a short ball across the line to the leg side."],
  [/hook shot|hook\b/i, "'Hook' names the shot that hooks a short ball rising toward the head to fine leg or square leg."],
  [/sweep\b/i, "'Sweep' comes from the sweeping horizontal-bat arc used against spin from a kneeling position."],
  [/stance|grip|trigger/i, "The English 'stance', 'grip' and 'trigger' terms were codified in 19th-century English coaching manuals as the fundamentals of batsmanship."],
  [/pitch\b/i, "'Pitch' comes from the Old English 'piccean' — to fix or plant — referring to the strip 'pitched' between the wickets."],
  [/wicket/i, "'Wicket' derives from the Old French 'wiket' (small gate); early cricket used a low two-stump 'gate' as the target."],
  [/stump/i, "'Stumps' are named after tree stumps — the earliest wickets were literally cut tree stumps set into the ground."],
  [/mankad/i, "'Mankading' is named after Indian all-rounder Vinoo Mankad, who ran out Australia's Bill Brown at the non-striker's end in 1947."],
];

export function inferEtymology(lesson: Lesson, parsed: ParsedSections): string | null {
  if (parsed.etymology?.length) return parsed.etymology.join(" ");
  const t = lesson.title;
  for (const [re, text] of ETYMOLOGY_MAP) if (re.test(t)) return text;
  return null;
}

// ---------------------------------------------------------------------------
// History — brief backstory of the technique/term.
// ---------------------------------------------------------------------------
const HISTORY_MAP: Array<[RegExp, string]> = [
  [/doosra/i, "Popularised by Pakistan's Saqlain Mushtaq in the late 1990s and later refined by Saeed Ajmal and Muttiah Muralitharan; the ICC's 15° elbow-flexion tolerance (2005) reshaped who could bowl it legally."],
  [/googly/i, "Invented by B. J. T. Bosanquet around 1900 (and still called 'bosie' in Australia); a staple of every top wrist-spinner from Warne to Kumble to Rashid Khan."],
  [/chinaman/i, "Named after Ellis Achong's 1933 dismissal of Walter Robins; kept alive by Garry Sobers, revived by Brad Hogg, and dominant again through Kuldeep Yadav and Tabraiz Shamsi. ICC style guides now prefer 'left-arm wrist-spin'."],
  [/carrom/i, "Popularised in Test cricket by Sri Lanka's Ajantha Mendis (2008) and later mastered by India's R. Ashwin as a T20 wicket-taking option."],
  [/flipper/i, "Perfected by Clarrie Grimmett in the 1930s, taught to Richie Benaud, and turned into an art form by Shane Warne in the 1990s."],
  [/reverse swing/i, "Pioneered in Pakistan by Sarfraz Nawaz in the 1970s, taught to Imran Khan, and later mastered by Wasim Akram and Waqar Younis — the toe-crushing reverse yorker era."],
  [/yorker/i, "A staple death-overs weapon since the 1990s ODI era; Waqar Younis and Lasith Malinga made it iconic, and Jasprit Bumrah is its modern benchmark."],
  [/bouncer/i, "The short-pitched bouncer has been law-limited since 1991 (Law 41.6 — a maximum of two per over above shoulder height); the 1932/33 Bodyline series is its most infamous chapter."],
  [/switch hit/i, "Kevin Pietersen played the first widely televised switch-hits in 2008 vs New Zealand; the MCC confirmed the shot legal under Law 41.16 (unfair play does not apply)."],
  [/reverse sweep/i, "Mushtaq Mohammad played it in the 1970s; Mike Gatting's 1987 World Cup final dismissal briefly stigmatised it before it re-entered the T20 mainstream."],
  [/scoop|ramp|dilscoop/i, "Ryan Campbell and Douglas Marillier tried early versions; Tillakaratne Dilshan branded the scoop at the 2009 World T20, and Jos Buttler industrialised the ramp."],
  [/knuckle ball/i, "Zaheer Khan popularised the cricket knuckle ball in the mid-2000s; Bhuvneshwar Kumar and Andrew Tye later turned it into a death-overs staple."],
  [/wobble seam/i, "Mohammad Asif and later Pat Cummins and Vernon Philander refined the wobble-seam release as an alternative to conventional swing on flat pitches."],
  [/mankad/i, "First seen in a Test in 1947 (Vinoo Mankad vs Bill Brown); reclassified from 'unfair play' to a regular run-out under MCC Law 38.3 in 2022."],
  [/spin|off[- ]?break|leg[- ]?break/i, "Finger- and wrist-spin have been part of cricket since the 18th century; over-arm spin was legalised in 1864, and the ICC's 15° flex tolerance (2005) modernised its regulation."],
  [/swing|seam/i, "Swing bowling grew with the introduction of the seamed leather ball in the 19th century; the saliva ban (ICC, 2020, permanent 2022) forced a shift to sweat-only shine and wobble-seam variations."],
  [/wicketkeep/i, "Wicket-keeping as a specialist role dates to the 1770s; the modern glove-work standard was set by Bert Oldfield, Alan Knott, Ian Healy, and later Adam Gilchrist and MS Dhoni."],
  [/pitch|ground|boundary/i, "MCC's Laws (first codified 1744, current 2017 edition) set the 22-yard pitch and playing-area dimensions cricket still uses today."],
  [/bat\b|willow/i, "Bats have been made from English/Kashmir willow since the 18th century; blade dimensions are fixed under MCC Law 5 (max 108 mm wide, 67 mm deep)."],
  [/ball\b/i, "The cricket ball's cork-and-leather construction dates to the 1770s (Duke's of Kent); pink and white balls were introduced later for day-night and limited-overs cricket."],
  [/helmet|equipment|pad|glove/i, "Batting helmets became common after Dennis Amiss and Graham Yallop wore them in 1977–78; British Standard BS7928:2013 is today's certification benchmark."],
  [/fielding|catch|throw|slide/i, "Modern fielding standards were rewritten by South Africa's Jonty Rhodes in the 1990s; the flat, one-bounce throw and sliding stop are now coached from junior level."],
  [/umpire|drs|review/i, "Neutral umpires became standard in the 1990s; the Decision Review System (DRS) was introduced in Test cricket in 2008 and refined with ball-tracking and UltraEdge."],
  [/fitness|nutrition|warm/i, "Cricket professionalised its strength-and-conditioning after Australia's 1990s dominance under Steve Waugh; year-round S&C, hydration protocols and GPS-tracked workloads are now standard."],
];

export function inferHistory(lesson: Lesson, parsed: ParsedSections): string | null {
  if (parsed.history?.length) return parsed.history.join(" ");
  const t = lesson.title;
  for (const [re, text] of HISTORY_MAP) if (re.test(t)) return text;
  return null;
}

// ---------------------------------------------------------------------------
// Famous Players extractor
// ---------------------------------------------------------------------------
export type FamousPlayerCard = {
  name: string;
  role?: string;
  era?: string;
  note: string;
  signature?: string;
  female?: boolean;
};

// Curated player metadata for the names most likely to appear in lessons.
const PLAYER_META: Record<string, { role: string; era: string; signature?: string }> = {
  "Shane Warne": { role: "Right-arm leg-spinner (Australia)", era: "1992–2007", signature: "Gatting Ball, 708 Test wickets" },
  "Muttiah Muralitharan": { role: "Right-arm off-spinner (Sri Lanka)", era: "1992–2011", signature: "800 Test wickets, doosra pioneer" },
  "Murali": { role: "Right-arm off-spinner (Sri Lanka)", era: "1992–2011", signature: "800 Test wickets" },
  "Anil Kumble": { role: "Right-arm wrist-spinner (India)", era: "1990–2008", signature: "Perfect 10 vs Pakistan, 1999" },
  "Rashid Khan": { role: "Right-arm leg-spinner (Afghanistan)", era: "2015–present", signature: "Fastest to 100 T20I wickets" },
  "Ravichandran Ashwin": { role: "Off-spin all-rounder (India)", era: "2010–present", signature: "Carrom ball, 500+ Test wickets" },
  "Ashwin": { role: "Off-spin all-rounder (India)", era: "2010–present", signature: "Carrom ball, 500+ Test wickets" },
  "Nathan Lyon": { role: "Right-arm off-spinner (Australia)", era: "2011–present", signature: "GOAT off-spin overspin" },
  "Saqlain Mushtaq": { role: "Right-arm off-spinner (Pakistan)", era: "1995–2004", signature: "Inventor of the doosra" },
  "Saeed Ajmal": { role: "Right-arm off-spinner (Pakistan)", era: "2008–2017", signature: "Doosra wicket-taker" },
  "Yuzvendra Chahal": { role: "Right-arm leg-spinner (India)", era: "2016–present" },
  "Kuldeep Yadav": { role: "Left-arm wrist-spinner / chinaman (India)", era: "2017–present", signature: "Hat-tricks across formats" },
  "Brad Hogg": { role: "Left-arm wrist-spinner (Australia)", era: "1996–2008" },
  "Tabraiz Shamsi": { role: "Left-arm wrist-spinner (South Africa)", era: "2016–present" },
  "Ravindra Jadeja": { role: "Left-arm orthodox all-rounder (India)", era: "2009–present", signature: "Flat-throw run-outs, slip-fielding standard" },
  "Jadeja": { role: "Left-arm orthodox all-rounder (India)", era: "2009–present" },
  "Bishan Bedi": { role: "Left-arm orthodox (India)", era: "1966–1979", signature: "Loop-and-flight master" },
  "Daniel Vettori": { role: "Left-arm orthodox (New Zealand)", era: "1997–2015" },
  "Vettori": { role: "Left-arm orthodox (New Zealand)", era: "1997–2015" },

  "James Anderson": { role: "Right-arm seamer (England)", era: "2003–2024", signature: "700+ Test wickets, swing maestro" },
  "Anderson": { role: "Right-arm seamer (England)", era: "2003–2024", signature: "700+ Test wickets" },
  "Stuart Broad": { role: "Right-arm seamer (England)", era: "2007–2023", signature: "8-15 vs Australia, 2015" },
  "Glenn McGrath": { role: "Right-arm seamer (Australia)", era: "1993–2007", signature: "563 Test wickets, perfect length" },
  "McGrath": { role: "Right-arm seamer (Australia)", era: "1993–2007" },
  "Dale Steyn": { role: "Right-arm fast (South Africa)", era: "2004–2019", signature: "439 Test wickets, peak swing+pace" },
  "Pat Cummins": { role: "Right-arm fast (Australia, captain)", era: "2011–present", signature: "Wobble-seam, 2023 WTC win" },
  "Jasprit Bumrah": { role: "Right-arm fast (India)", era: "2016–present", signature: "Death-overs yorker specialist" },
  "Bumrah": { role: "Right-arm fast (India)", era: "2016–present" },
  "Mitchell Starc": { role: "Left-arm fast (Australia)", era: "2010–present", signature: "In-swinging yorker, 2015/2023 WC" },
  "Wasim Akram": { role: "Left-arm fast (Pakistan)", era: "1984–2003", signature: "Sultan of swing, reverse pioneer" },
  "Waqar Younis": { role: "Right-arm fast (Pakistan)", era: "1989–2003", signature: "Toe-crushing reverse yorker" },
  "Shoaib Akhtar": { role: "Right-arm fast (Pakistan)", era: "1997–2011", signature: "161.3 km/h world record" },
  "Brett Lee": { role: "Right-arm fast (Australia)", era: "1999–2012", signature: "161.1 km/h, white-ball aggression" },
  "Mohammed Shami": { role: "Right-arm fast (India)", era: "2013–present", signature: "Reverse-swing wicket-taker" },
  "Bhuvneshwar Kumar": { role: "Right-arm seamer (India)", era: "2012–present", signature: "Knuckle ball + new-ball swing" },
  "Zaheer Khan": { role: "Left-arm fast (India)", era: "2000–2014", signature: "Knuckle ball pioneer in India" },
  "Lasith Malinga": { role: "Right-arm slinger (Sri Lanka)", era: "2004–2020", signature: "Round-arm yorker king" },
  "Malinga": { role: "Right-arm slinger (Sri Lanka)", era: "2004–2020" },
  "Jofra Archer": { role: "Right-arm fast (England)", era: "2019–present", signature: "Super Over hero, 2019 WC" },
  "Mitchell Johnson": { role: "Left-arm fast (Australia)", era: "2007–2015", signature: "2013/14 Ashes 37-wicket series" },
  "Vernon Philander": { role: "Right-arm seamer (South Africa)", era: "2011–2020", signature: "Upright seam, 50-Test 200-wicket" },
  "Andrew Flintoff": { role: "Right-arm seam all-rounder (England)", era: "1998–2009", signature: "2005 Ashes hero" },
  "Hardik Pandya": { role: "Right-arm seam all-rounder (India, captain)", era: "2016–present" },
  "Dwayne Bravo": { role: "Right-arm medium all-rounder (West Indies)", era: "2004–2018", signature: "Most T20 wickets ever" },
  "Trent Boult": { role: "Left-arm fast (New Zealand)", era: "2011–present", signature: "New-ball swing + relay catches" },
  "Boult": { role: "Left-arm fast (New Zealand)", era: "2011–present" },
  "Josh Hazlewood": { role: "Right-arm seamer (Australia)", era: "2014–present" },
  "Hazlewood": { role: "Right-arm seamer (Australia)", era: "2014–present" },
  "Sarfraz Nawaz": { role: "Right-arm fast (Pakistan)", era: "1969–1984", signature: "Reverse-swing pioneer" },
  "Jhye Richardson": { role: "Right-arm fast (Australia)", era: "2017–present" },

  "Sachin Tendulkar": { role: "Top-order batter (India)", era: "1989–2013", signature: "100 international hundreds" },
  "Sachin": { role: "Top-order batter (India)", era: "1989–2013" },
  "Brian Lara": { role: "Top-order batter (West Indies)", era: "1990–2007", signature: "400* vs England, 2004" },
  "Ricky Ponting": { role: "Top-order batter (Australia, captain)", era: "1995–2012", signature: "Pull-shot textbook" },
  "Rahul Dravid": { role: "Top-order batter (India)", era: "1996–2012", signature: "210 Test catches, The Wall" },
  "Dravid": { role: "Top-order batter (India)", era: "1996–2012" },
  "Virat Kohli": { role: "Top-order batter (India)", era: "2008–present", signature: "Modern chase-master" },
  "Kohli": { role: "Top-order batter (India)", era: "2008–present" },
  "Joe Root": { role: "Top-order batter (England)", era: "2012–present", signature: "Modern Test run-machine" },
  "Steve Smith": { role: "Top-order batter (Australia)", era: "2010–present", signature: "Shuffle trigger, Test avg ~58" },
  "Kane Williamson": { role: "Top-order batter (New Zealand, captain)", era: "2010–present", signature: "Back-and-across trigger" },
  "Babar Azam": { role: "Top-order batter (Pakistan)", era: "2015–present", signature: "Modern cover-drive standard" },
  "Cheteshwar Pujara": { role: "Top-order batter (India)", era: "2010–present", signature: "Test leave specialist" },
  "Alastair Cook": { role: "Opening batter (England)", era: "2006–2018", signature: "England's leading Test run-scorer" },
  "Younis Khan": { role: "Top-order batter (Pakistan)", era: "2000–2017" },
  "Rohit Sharma": { role: "Opening batter (India, captain)", era: "2007–present", signature: "Three ODI double-hundreds" },
  "MS Dhoni": { role: "Wicket-keeper batter (India, captain)", era: "2004–2019", signature: "Helicopter shot, 2011 WC final" },
  "Dhoni": { role: "Wicket-keeper batter (India)", era: "2004–2019" },
  "AB de Villiers": { role: "360° batter (South Africa)", era: "2004–2018", signature: "Fastest ODI 50/100/150" },
  "Andre Russell": { role: "Power-hitting all-rounder (West Indies)", era: "2010–present" },
  "Glenn Maxwell": { role: "Power-hitting all-rounder (Australia)", era: "2012–present", signature: "201* vs Afghanistan, 2023 WC" },
  "Heinrich Klaasen": { role: "Wicket-keeper batter (South Africa)", era: "2018–present", signature: "Death-overs spin destroyer" },
  "Travis Head": { role: "Top-order batter (Australia)", era: "2018–present", signature: "2023 WTC + WC final centuries" },
  "Jos Buttler": { role: "Wicket-keeper batter (England, captain)", era: "2011–present", signature: "Ramp/scoop master" },
  "Buttler": { role: "Wicket-keeper batter (England)", era: "2011–present" },
  "Kevin Pietersen": { role: "Top-order batter (England)", era: "2004–2014", signature: "Switch-hit pioneer" },
  "David Warner": { role: "Opening batter (Australia)", era: "2009–2024" },
  "Suryakumar Yadav": { role: "Top-order batter (India, T20 captain)", era: "2021–present", signature: "360° T20 batting" },
  "Ben Stokes": { role: "All-rounder (England, captain)", era: "2011–present", signature: "Headingley 2019, Bazball" },
  "Tillakaratne Dilshan": { role: "Opening batter (Sri Lanka)", era: "1999–2013", signature: "Dilscoop inventor" },
  "Eoin Morgan": { role: "Top-order batter (England, captain)", era: "2006–2022", signature: "2019 World Cup winning captain" },
  "Viv Richards": { role: "Top-order batter (West Indies)", era: "1974–1991", signature: "Helmet-less aggression" },
  "Kieron Pollard": { role: "Power-hitting all-rounder (West Indies)", era: "2007–2024" },
  "Mike Hussey": { role: "Middle-order batter (Australia)", era: "2005–2013" },
  "Shivnarine Chanderpaul": { role: "Middle-order batter (West Indies)", era: "1994–2015", signature: "Crab-like open stance" },
  "Mahela Jayawardene": { role: "Top-order batter (Sri Lanka)", era: "1997–2014", signature: "205 Test catches" },
  "Jonty Rhodes": { role: "Fielder par excellence (South Africa)", era: "1992–2003", signature: "Run-out of Inzamam, 1992 WC" },
  "Paul Collingwood": { role: "Middle-order batter / slip fielder (England)", era: "2001–2011" },
  "Mike Gatting": { role: "Middle-order batter (England)", era: "1977–1995" },
  "Sam Curran": { role: "Left-arm seam all-rounder (England)", era: "2018–present" },
  "Pollard": { role: "Power-hitting all-rounder (West Indies)", era: "2007–2024" },
  "Russell": { role: "Power-hitting all-rounder (West Indies)", era: "2010–present" },
  "Maxwell": { role: "Power-hitting all-rounder (Australia)", era: "2012–present" },
  "Marshall": { role: "Right-arm fast (West Indies)", era: "1978–1991", signature: "Best fast-bowling avg of all time" },
  "Lillee": { role: "Right-arm fast (Australia)", era: "1971–1984" },
  "Thomson": { role: "Right-arm fast (Australia)", era: "1972–1985", signature: "Slinging action template" },
  "Pujara": { role: "Top-order batter (India)", era: "2010–present" },
  "Cook": { role: "Opening batter (England)", era: "2006–2018" },
  "Williamson": { role: "Top-order batter (New Zealand)", era: "2010–present" },
  "Smith": { role: "Top-order batter (Australia)", era: "2010–present" },
  "Root": { role: "Top-order batter (England)", era: "2012–present" },
  "Tendulkar": { role: "Top-order batter (India)", era: "1989–2013" },
  "Ponting": { role: "Top-order batter (Australia)", era: "1995–2012" },
  "Cummins": { role: "Right-arm fast (Australia)", era: "2011–present" },
  "Starc": { role: "Left-arm fast (Australia)", era: "2010–present" },
  "Shami": { role: "Right-arm fast (India)", era: "2013–present" },
  "Akram": { role: "Left-arm fast (Pakistan)", era: "1984–2003" },
  "Steyn": { role: "Right-arm fast (South Africa)", era: "2004–2019" },
  "Broad": { role: "Right-arm seamer (England)", era: "2007–2023" },
  "Lyon": { role: "Right-arm off-spinner (Australia)", era: "2011–present" },
  "Warne": { role: "Right-arm leg-spinner (Australia)", era: "1992–2007" },
  "Kumble": { role: "Right-arm wrist-spinner (India)", era: "1990–2008" },
  "Chahal": { role: "Right-arm leg-spinner (India)", era: "2016–present" },
  "Archer": { role: "Right-arm fast (England)", era: "2019–present" },
  "Philander": { role: "Right-arm seamer (South Africa)", era: "2011–2020" },
  "Flintoff": { role: "Seam all-rounder (England)", era: "1998–2009" },
  "Bravo": { role: "Right-arm medium all-rounder (West Indies)", era: "2004–2018" },
  "Pandya": { role: "Seam all-rounder (India)", era: "2016–present" },

  // Women's game — each entry highlights what makes the player unique.
  "Mithali Raj": { role: "Top-order batter (India, former captain)", era: "1999–2022", signature: "Most runs in women's ODI history (7,805)" },
  "Jhulan Goswami": { role: "Right-arm fast (India)", era: "2002–2022", signature: "Leading wicket-taker in women's ODIs (255)" },
  "Smriti Mandhana": { role: "Opening batter (India)", era: "2013–present", signature: "Fastest century in the Women's Premier League" },
  "Harmanpreet Kaur": { role: "Top-order batter (India, captain)", era: "2009–present", signature: "171* vs Australia, 2017 World Cup semi-final" },
  "Deepti Sharma": { role: "Off-spin all-rounder (India)", era: "2014–present", signature: "All-round match-winner — bat and ball in the same game" },
  "Poonam Yadav": { role: "Leg-spinner (India)", era: "2013–present", signature: "Loop-and-dip leg-spin in T20Is" },
  "Meg Lanning": { role: "Top-order batter (Australia, former captain)", era: "2010–2023", signature: "7 ICC titles as captain" },
  "Ellyse Perry": { role: "Seam-bowling all-rounder (Australia)", era: "2007–present", signature: "Only player to score a Test 200 and take an 8-wicket haul" },
  "Megan Schutt": { role: "Right-arm seamer (Australia)", era: "2013–present", signature: "Two-way new-ball swing specialist" },
  "Alyssa Healy": { role: "Wicket-keeper batter (Australia, captain)", era: "2010–present", signature: "170 in a Women's World Cup final" },
  "Suzie Bates": { role: "Top-order batter (New Zealand, former captain)", era: "2006–present", signature: "Most international runs in women's cricket" },
  "Sophie Devine": { role: "Top-order batter (New Zealand, captain)", era: "2006–present", signature: "Six consecutive WBBL fifties — a world record" },
  "Sophie Ecclestone": { role: "Left-arm orthodox spinner (England)", era: "2016–present", signature: "World No. 1 ODI bowler ranking" },
  "Nat Sciver-Brunt": { role: "Top-order batter / seam all-rounder (England)", era: "2013–present", signature: "Inventor of the 'Natmeg' between-the-legs shot" },
  "Heather Knight": { role: "Top-order batter (England, captain)", era: "2010–present", signature: "Captained England to 2017 World Cup title" },
  "Hayley Matthews": { role: "Opening batter / off-spinner (West Indies, captain)", era: "2014–present", signature: "Youngest woman to score a T20 World Cup final century" },
  "Stafanie Taylor": { role: "Top-order all-rounder (West Indies)", era: "2008–present", signature: "First player (women or men) to 5,000 ODI runs + 100 wickets" },
  "Chamari Athapaththu": { role: "Top-order batter (Sri Lanka, captain)", era: "2009–present", signature: "Multiple ODI hundreds carrying her team" },
  "Laura Wolvaardt": { role: "Top-order batter (South Africa, captain)", era: "2016–present", signature: "Trademark cover drive, fastest woman to 2,000 ODI runs" },
};

// Order matters — longer/more-specific names first so a multi-token match
// (e.g. "Pat Cummins") wins before a generic single-token ("Cummins").
const PLAYER_NAMES = Object.keys(PLAYER_META).sort((a, b) => b.length - a.length);

import { isFemalePlayer } from "@/lib/glossary";
import { getPlayerDetails } from "@/lib/player-details";

// Build a unique, plain-English blurb for each player so multiple players
// mentioned in the same sentence don't end up with identical notes. When a
// topic-specific achievement/trick exists for the player, append it so the
// reader gets a concrete moment or technique, not just a role + era line.
function buildBlurb(name: string, meta: { role: string; era: string; signature?: string }): string {
  const role = meta.role.replace(/\s*\(.*?\)\s*/g, "").trim();
  const country = meta.role.match(/\(([^)]+)\)/)?.[1];
  const where = country ? ` for ${country}` : "";
  const head = meta.signature
    ? `${name} (${role}${where}, ${meta.era}). Best known for: ${meta.signature}.`
    : `${name} — ${role}${where}, active ${meta.era}.`;
  const story = getPlayerDetails(name);
  return story ? `${head} ${story}` : head;
}

export function extractFamousPlayers(lesson: Lesson): FamousPlayerCard[] {
  const cards = new Map<string, FamousPlayerCard>();
  for (const raw of lesson.body) {
    const line = raw.replace(/\s+/g, " ");
    for (const name of PLAYER_NAMES) {
      const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`);
      if (!re.test(line)) continue;
      const meta = PLAYER_META[name];
      const canonical = canonicalName(name);
      if (cards.has(canonical)) continue;
      cards.set(canonical, {
        name: canonical,
        role: meta.role,
        era: meta.era,
        signature: meta.signature,
        note: buildBlurb(canonical, PLAYER_META[canonical] ?? meta),
        female: isFemalePlayer(canonical),
      });
    }
  }
  return [...cards.values()].slice(0, 8);
}

function canonicalName(name: string): string {
  const longer = PLAYER_NAMES.find(
    (other) => other !== name && other.length > name.length && other.includes(name),
  );
  return longer ?? name;
}

