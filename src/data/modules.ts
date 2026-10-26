export type ModuleInfo = {
  slug: string;
  title: string;
  question: string; // the question this science answers, shown in the scorecard
  intro: string;
};

export const MODULES: ModuleInfo[] = [
  {
    slug: "ball-in-flight",
    title: "The ball in flight",
    question: "Why does a ball swing, drift and slow down in the air?",
    intro:
      "Between the bowler's hand and the pitch, a cricket ball is a small aerodynamics experiment. Drag slows it, the seam and the surface decide whether it swings, and spin bends its path. These lessons explain the air around the ball.",
  },
  {
    slug: "off-the-pitch",
    title: "Off the pitch",
    question: "What happens in the instant the ball bounces?",
    intro:
      "The pitch is twenty-two yards of rolled soil and grass, and how it was prepared changes everything: bounce, pace, seam movement and turn. These lessons cover the ball-surface collision and the conditions that change it.",
  },
  {
    slug: "bat-and-ball",
    title: "Bat and ball",
    question: "What makes a ball fly off the bat?",
    intro:
      "Hitting is a collision problem. Where the ball meets the blade, how fast the bat is moving and what the bat is made of decide whether a shot races away or dies. These lessons cover bat physics and the flight of a hit ball.",
  },
  {
    slug: "the-bowling-body",
    title: "The bowling body",
    question: "How does a body create pace — and why does it get injured?",
    intro:
      "Fast bowling is one of the most demanding repeated movements in sport. These lessons cover how the action produces speed, what the laws say about the arm, and what research shows about back injuries and workload.",
  },
  {
    slug: "seeing-the-ball",
    title: "Seeing the ball",
    question: "How can anyone hit a ball they barely have time to see?",
    intro:
      "Against fast bowling, the ball arrives faster than pure reaction allows. These lessons cover how batters actually track the ball, how they read the bowler before release, and what pressure does to skill.",
  },
  {
    slug: "technology-and-decisions",
    title: "Technology and decisions",
    question: "How do cameras and microphones decide an appeal?",
    intro:
      "Modern cricket decisions lean on ball-tracking, edge detection and speed measurement. These lessons explain how each system works, what it can and cannot know, and how the review rules treat uncertainty.",
  },
  {
    slug: "ball-and-gear",
    title: "Ball and gear",
    question: "What is inside the ball, the bat and the helmet?",
    intro:
      "Equipment is regulated by the Laws of Cricket and by safety standards. These lessons cover how balls are made and why brands behave differently, and how protective gear is tested.",
  },
];

export const MODULE_BY_SLUG = Object.fromEntries(MODULES.map((m) => [m.slug, m]));
