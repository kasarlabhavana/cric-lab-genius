// Topic-relevant "story" details for famous players. Appended to the standard
// blurb to elaborate on a specific trick, record, or moment that's relevant
// to what the lesson is about. Keyed by canonical player name.
//
// Keep each entry to 1–2 plain-English sentences.

export const PLAYER_DETAILS: Record<string, string> = {
  "Shane Warne":
    "His 1993 'Ball of the Century' to Mike Gatting at Old Trafford pitched well outside leg and spun across to clip off-stump — the gold-standard leg-break.",
  "Muttiah Muralitharan":
    "Bowled 44,039 Test deliveries — more than any other bowler — and combined an off-break, doosra and top-spinner using the same hyper-flexible wrist.",
  "Anil Kumble":
    "Took all 10 Pakistan wickets in an innings at Delhi in 1999 — only the second bowler ever to do so — relying on top-spin and skid more than side-turn.",
  "Rashid Khan":
    "Bowls his googly without an obvious wrist tell, releasing it from the same arm slot as his leg-break — that's why he's the fastest to 100 T20I wickets.",
  "Ravichandran Ashwin":
    "His carrom ball — flicked out with the middle finger like a striker — turns away from the right-hander and lets him attack both edges in one over.",
  "Saqlain Mushtaq":
    "Invented the doosra in the late 1990s by squeezing the ball out the back of the hand while keeping the off-spinner's arm action — a complete optical illusion.",
  "Nathan Lyon":
    "Generates more revs per minute than most off-spinners — the ball dips late, then bounces above stump-height even on flat tracks.",
  "Kuldeep Yadav":
    "Only Indian to take a hat-trick in all three formats — uses the chinaman wrong'un to bowl right-handers behind their legs.",
  "Ravindra Jadeja":
    "Fires the ball in flat at 90+ km/h on a length, denying batters any room to come down the pitch — the modern blueprint for restrictive left-arm orthodox.",
  "Bishan Bedi":
    "Used loop and flight so seductively that batters mis-judged the dip and got stumped by yards — the textbook 'invite the drive' artist.",

  "James Anderson":
    "Holds the record for Test wickets by a seamer because he learned to wobble the seam upright at 135 km/h — late movement in both directions with no obvious wrist change.",
  "Stuart Broad":
    "His 8-15 against Australia at Trent Bridge in 2015 came in a single spell of full, swinging deliveries from over the wicket — Australia were bowled out for 60.",
  "Glenn McGrath":
    "Hit the same length on or just outside off-stump for 124 Tests — built pressure that forced edges, especially with the wobble-seam in English conditions.",
  "Dale Steyn":
    "Combined 145+ km/h pace with late outswing — his 6-8 vs India at Nagpur in 2010 is a textbook of reverse swing on a hot afternoon.",
  "Pat Cummins":
    "Uses a scrambled-seam wobble at 145 km/h to deviate either way off the surface; led Australia to the 2023 World Test Championship and ODI World Cup.",
  "Jasprit Bumrah":
    "His short, hyperextended arm action releases the ball from a uniquely close-to-the-stumps angle — making his yorker land exactly on the toe at 145 km/h in death overs.",
  "Mitchell Starc":
    "Specialist of the in-swinging yorker first ball — picked up the new ball in the 2015 and 2023 World Cups and dismantled top orders in the powerplay.",
  "Wasim Akram":
    "Generated late swing both ways from a short, whippy run-up and is credited (with Waqar) for turning reverse swing into a strike weapon.",
  "Waqar Younis":
    "His reverse-swinging yorker on middle-and-leg crushed toes for two decades; 'toe-crushers' as a genre is essentially named after him.",
  "Shoaib Akhtar":
    "Bowled the fastest recorded delivery in international cricket — 161.3 km/h to Nick Knight at the 2003 World Cup.",
  "Mohammed Shami":
    "Hits the seam vertical on the pitch ball after ball — at the 2023 World Cup he took 24 wickets at 10.7 with reverse swing and seam.",
  "Bhuvneshwar Kumar":
    "Pioneered the knuckle ball in Indian cricket — gripped between bent knuckles, it kills 20 km/h off the pace at release without changing the action.",
  "Lasith Malinga":
    "Slings the ball from a near-horizontal arm — the low release point makes his yorker dip below the bat-swing arc; took two World Cup hat-tricks.",
  "Jofra Archer":
    "Bowled the deciding Super Over of the 2019 World Cup final — uses a relaxed, deceptive run-up to hide a 150+ km/h bouncer.",
  "Sarfraz Nawaz":
    "Widely credited as the original reverse-swing bowler in the 1970s; taught the technique to Imran Khan, who then taught Wasim and Waqar.",

  "Sachin Tendulkar":
    "Hundred international hundreds across 24 years — re-engineered his stance and trigger movement multiple times to keep adapting to bowling generations.",
  "Brian Lara":
    "Holds the highest Test (400*) and first-class (501*) individual scores — his high backlift and late wrist-flick on the cut shot are still taught as a standard.",
  "Ricky Ponting":
    "His pull shot off the front foot — rocking back inside the line of a short ball and rolling the wrists — is the textbook for hitting bouncers safely along the ground.",
  "Rahul Dravid":
    "Holds the record for most catches as a non-keeper (210) — his slip technique used soft hands and waited for the ball, becoming the model for India's cordon.",
  "Virat Kohli":
    "Has chased down more ODI targets than anyone in history — splits the innings into 8-ball blocks and prefers running twos to manage strike against spin.",
  "Joe Root":
    "Master of the late steer through third — uses an open bat face and almost no follow-through to manipulate length balls behind point.",
  "Steve Smith":
    "His unorthodox shuffle-across trigger lets him cover swing and access the leg side without committing front-foot — averages 58 in Tests as a result.",
  "Kane Williamson":
    "Uses a back-and-across trigger to play the ball under his eyes; rarely moves his head, which is why he can play late against both swing and spin.",
  "Babar Azam":
    "His cover drive is taught as the modern textbook — high front elbow, knee bent just enough to keep the bat coming down straight.",
  "Rohit Sharma":
    "Holds the record for most sixes in international cricket and three ODI double-hundreds — uses the pull from outside off as his release shot.",
  "MS Dhoni":
    "The helicopter shot is a wristy flick to the yorker — the bottom-hand whip turns a defensive ball into a leg-side six. Captained India to all three ICC trophies.",
  "AB de Villiers":
    "The first 360° batter — premeditates the shot before the bowler releases and shifts his stance to play it; holds the fastest ODI 50, 100 and 150.",
  "Glenn Maxwell":
    "His 201* vs Afghanistan at the 2023 World Cup is the highest individual ODI score in a chase — played most of it on one leg with cramp.",
  "Travis Head":
    "Hundreds in the 2023 World Test Championship final AND the 2023 ODI World Cup final — both at Ahmedabad, both off the back of an attacking left-handed cut.",
  "Jos Buttler":
    "Made the ramp over the keeper a respectable Test shot — uses soft hands to deflect 140 km/h pace, not power.",
  "Kevin Pietersen":
    "Popularised the switch hit — turning grip and stance mid-delivery to bat the 'wrong' way around; first hit it for six off Muralitharan in 2008.",
  "Suryakumar Yadav":
    "The modern 360° T20 batter — practises one-handed scoops in the nets and is the fastest Indian to 1000 T20I runs.",
  "Ben Stokes":
    "Headingley 2019: chased 359 vs Australia with an unbeaten 135, scoring the last 74 with Jack Leach — a masterclass in pacing a chase.",
  "Tillakaratne Dilshan":
    "Invented the Dilscoop at the 2009 World T20 — bends forward and helps the yorker over his own head for six.",
  "Eoin Morgan":
    "Captained England to their first World Cup in 2019 — re-engineered England's ODI batting around aggression and depth, not preservation.",
  "Viv Richards":
    "Faced Lillee, Marshall and Holding without a helmet — averaged 50 in Tests using a high backlift and the famous flick off the hip.",
  "Shivnarine Chanderpaul":
    "Open, crab-like stance — face pointing at the bowler — allowed him to play both sides of the wicket equally; averaged 51 in Tests across 21 years.",
  "Mahela Jayawardene":
    "Most catches by a non-keeper in Tests at the time of retirement (205) — combined slip standing with first-slip wicketkeeping cues.",
  "Jonty Rhodes":
    "Run-out of Inzamam at the 1992 World Cup — the moment fielding became a third discipline. Trained by anticipating, not reacting.",

  // Women's game
  "Mithali Raj":
    "Most runs in women's ODI history (7,805) across 232 matches — built her game around the cover drive and a calm trigger movement.",
  "Jhulan Goswami":
    "Leading wicket-taker in women's ODIs (255) — hit the seam at 120 km/h for 20 years, the standard for new-ball seam in women's cricket.",
  "Smriti Mandhana":
    "Owns the fastest hundred in WPL history (50 balls) — left-handed, the cover drive and pulled-back cut are her signature scoring zones.",
  "Harmanpreet Kaur":
    "171* off 115 vs Australia at the 2017 World Cup semi-final — used the slog-sweep off front foot to take down the off-spinners.",
  "Deepti Sharma":
    "All-round match-winner — has scored a 188 in an ODI AND taken a six-wicket haul; one of the few who can spin the new ball with off-breaks.",
  "Meg Lanning":
    "Captained Australia to 7 ICC titles (five T20 World Cups, two ODI World Cups) — bats with a still head and back-and-across trigger like Williamson.",
  "Ellyse Perry":
    "Only cricketer (male or female) to score a Test 213* and take an 8-wicket haul in the same format — opens the bowling at 115 km/h with late outswing.",
  "Megan Schutt":
    "Two-way new-ball swing — outswinger to the right-hander, inswinger held cross-seam — has 100+ ODI wickets and a women's ODI hat-trick.",
  "Alyssa Healy":
    "Hit 170 in the 2022 ODI World Cup final — the highest score ever in a World Cup final, women's or men's. Wicket-keeper opener.",
  "Suzie Bates":
    "Most international runs in women's cricket history (8,000+) — captained New Zealand for a decade and made the cover drive her release shot.",
  "Sophie Devine":
    "Six consecutive WBBL fifties — the longest streak ever — hits straight down the ground with one of the cleanest swings in women's T20.",
  "Sophie Ecclestone":
    "World No. 1 ODI bowler at age 22 — left-arm orthodox who flights the ball above the eyeline and beats the bat in the air, not off the pitch.",
  "Nat Sciver-Brunt":
    "Invented the 'Natmeg' — a between-the-legs scoop to the yorker — and is one of three women to score a World Cup final century.",
  "Heather Knight":
    "Captained England to the 2017 World Cup title in front of a full Lord's — built her batting around the sweep against spin.",
  "Hayley Matthews":
    "Youngest woman to score a T20 World Cup final century (66-ball 100 vs Australia at age 18) — opening batter who also bowls top-quality off-spin.",
  "Stafanie Taylor":
    "First player ever — men's or women's — to 5,000 ODI runs and 100 wickets. Bats top-order and bowls off-spin from a high arm.",
  "Chamari Athapaththu":
    "Carries Sri Lanka's batting almost single-handedly — 195* in an ODI at the 2017 World Cup is the second-highest individual women's ODI score.",
  "Laura Wolvaardt":
    "Fastest woman ever to 2,000 ODI runs — her cover drive (high elbow, full extension) is the modern textbook in the women's game.",
};

export function getPlayerDetails(name: string): string | undefined {
  return PLAYER_DETAILS[name];
}
