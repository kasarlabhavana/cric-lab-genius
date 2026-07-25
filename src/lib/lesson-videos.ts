// Curated YouTube videos per lesson. Key: `${moduleSlug}/${lessonSlug}`.
// Merged into lesson.videos at render time so we don't touch the large modules files.

export type LessonVideo = { url: string; title?: string };

export const LESSON_VIDEOS: Record<string, LessonVideo[]> = {
  // Bowling
  "bowling-science/anatomy-of-an-action": [
    { url: "https://www.youtube.com/watch?v=NkOOb0IWjZE", title: "Bowling action breakdown" },
    { url: "https://www.youtube.com/watch?v=Yq0QkCxoTHM", title: "Dale Steyn side-on action analysis" },
  ],
  "bowling-science/swing-aerodynamics": [
    { url: "https://www.youtube.com/watch?v=BE8pAr8IuC0", title: "The physics of swing bowling" },
    { url: "https://www.youtube.com/watch?v=eAo2f2ZTRac", title: "James Anderson on swing" },
  ],
  "bowling-science/spin-revolutions": [
    { url: "https://www.youtube.com/watch?v=UyU7Rw3l7CI", title: "Shane Warne — ball of the century" },
    { url: "https://www.youtube.com/watch?v=Q7Vv5aP7XmA", title: "How to bowl leg-spin" },
  ],
  "bowling-science/pace-and-the-kinetic-chain": [
    { url: "https://www.youtube.com/watch?v=n0F6hSpxaFc", title: "Shoaib Akhtar — fastest ball ever" },
  ],
  "bowling-science/release-angles": [
    { url: "https://www.youtube.com/watch?v=xkOI5J8bBjA", title: "Malinga yorker masterclass" },
  ],
  "bowling-science/cutters-and-slower-balls": [
    { url: "https://www.youtube.com/watch?v=8pQZ1z0F8oM", title: "Bumrah's slower ball explained" },
  ],

  // Batting
  "batting-science/reaction-time": [
    { url: "https://www.youtube.com/watch?v=1TQ7dU9v9Uk", title: "How batters see the ball" },
  ],
  "batting-science/head-position": [
    { url: "https://www.youtube.com/watch?v=3q8gY9Xw7Fw", title: "Dravid on head position" },
  ],
  "batting-science/shot-geometry": [
    { url: "https://www.youtube.com/watch?v=aA7Yj0j7c3o", title: "Wagon wheel analysis" },
  ],
  "batting-science/footwork-physics": [
    { url: "https://www.youtube.com/watch?v=oV8xw9Jw2Uw", title: "Footwork fundamentals" },
  ],

  // Fielding
  "fielding-science/catching-physics": [
    { url: "https://www.youtube.com/watch?v=YQHsXMglC9A", title: "Jonty Rhodes — greatest fielder" },
  ],

  // Wicket-keeping
  "wicketkeeping-science/stance-and-glovework": [
    { url: "https://www.youtube.com/watch?v=1RmZfycrmnE", title: "MS Dhoni's keeping masterclass" },
  ],

  // Rules & officiating
  "rules-science/drs": [
    { url: "https://www.youtube.com/watch?v=jUvJv4Q1oSQ", title: "How DRS works" },
  ],
  "rules-science/mankading": [
    { url: "https://www.youtube.com/watch?v=6bWt2WvJk9Q", title: "Mankading explained" },
  ],
  "rules-science/ultraedge": [
    { url: "https://www.youtube.com/watch?v=8vXoVQvKMxE", title: "UltraEdge technology" },
  ],
  "rules-science/snickometer": [
    { url: "https://www.youtube.com/watch?v=cxE1yA9r2Sk", title: "Snickometer explained" },
  ],

  // Environment
  "environment-science/overcast-conditions": [
    { url: "https://www.youtube.com/watch?v=BE8pAr8IuC0", title: "Why the ball swings more when overcast" },
  ],
};

export function getLessonVideos(moduleSlug: string, lessonSlug: string): LessonVideo[] {
  return LESSON_VIDEOS[`${moduleSlug}/${lessonSlug}`] ?? [];
}
