// Gopher sprite — based on the official Go mascot reference.
// Proportions match: wide square head, two big white eyes (small black pupils
// near center), beige snout with two teeth, teardrop body, small arms, beige feet.
//
// Color codes:
//   B = body cyan (main)
//   D = body shadow (under chin / belly fold)
//   O = outline (very dark navy)
//   W = white of eye
//   E = eye pupil black
//   S = snout/beige (nose + feet)
//   s = snout shadow
//   T = tooth white
//   . = transparent
//
// Grid: 32 wide × 32 tall.

const GOPHER_PALETTE = {
  B: "#7FCFE4",   // main body cyan (matches reference)
  D: "#5BB1CB",   // shadow cyan
  O: "#1F3742",   // outline navy
  W: "#FFFFFF",   // eye white
  E: "#0A0A0A",   // pupil
  S: "#F2D9B6",   // beige (snout, feet, hands)
  s: "#D9B98A",   // beige shadow
  T: "#FFFFFF",   // tooth
};

// IDLE — reference pose. Big head dominates, body is teardrop, arms tiny on sides.
const GOPHER_IDLE = [
  "................................",
  "................................",
  "..........OOOO........OOOO......",  // ears top
  ".........OBBBBO......OBBBBO.....",
  ".......OOOBBBBBOOOOOOBBBBBOO....",  // top of head meets ears
  "......OBBBBBBBBBBBBBBBBBBBBBO...",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBO..",
  "....OBBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",  // eyes
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWEEWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWEEWWWOBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBBBOOOOOBBBSSBBBOOOOOBBBBO",  // bottom of eyes, snout starts
  "....OBBBBBBBBBBSSSSBBBBBBBBBBBBO",
  "....OBBBBBBBBSSTTTTSSBBBBBBBBBBO",  // teeth
  ".....OBBBBBBBSSTTTTSSBBBBBBBBBO.",
  ".....OBBBBBBBBSSssssSSBBBBBBBBO.",
  "......OBBBBBBBBBssssBBBBBBBBBO..",  // chin
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OSBBBBBBBBBBBBBBBBBBBBBBBBSO",  // body widest, hands peek
  "....OSSBBBBBBBBBBBBBBBBBBBBBBSSO",
  ".....OSBBBBBBBBBBBBBBBBBBBBBBSO.",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".......OBBBBBBBBBBBBBBBBBBBBO...",
  "........OOBBBBBBOOOOBBBBBBOO....",  // legs notch
  "..........OSSSSO....OSSSSO......",  // feet beige
  "..........OssssO....OssssO......",
  "...........OOOO......OOOO.......",
];

// RUN frame 1 — left foot forward, right foot back
const GOPHER_RUN_1 = [
  "................................",
  "................................",
  "..........OOOO........OOOO......",
  ".........OBBBBO......OBBBBO.....",
  ".......OOOBBBBBOOOOOOBBBBBOO....",
  "......OBBBBBBBBBBBBBBBBBBBBBO...",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBO..",
  "....OBBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBOWWEEWWWOBBBBOWWWEEWWOBBO",  // pupils slightly off — running glance
  "....OBBOWWEEWWWOBBBBOWWWEEWWOBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBBBOOOOOBBBSSBBBOOOOOBBBBO",
  "....OBBBBBBBBBBSSSSBBBBBBBBBBBBO",
  "....OBBBBBBBBSSTTTTSSBBBBBBBBBBO",
  ".....OBBBBBBBSSTTTTSSBBBBBBBBBO.",
  ".....OBBBBBBBBSSssssSSBBBBBBBBO.",
  "......OBBBBBBBBBssssBBBBBBBBBO..",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OSBBBBBBBBBBBBBBBBBBBBBBBBSO",
  "....OSSBBBBBBBBBBBBBBBBBBBBBBSSO",
  ".....OSBBBBBBBBBBBBBBBBBBBBBBSO.",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".......OBBBBBBBBBBBBBBBBBBBBO...",
  "......OOBBBBBBOOO......OBBBBBOO.",  // left leg forward
  "....OSSSSSSSO............OBBBBO.",
  "....OssssssO..............OssO..",
  ".....OOOOOO................OO...",
];

// RUN frame 2 — both feet centered (passing pose)
const GOPHER_RUN_2 = [
  "................................",
  "..........OOOO........OOOO......",
  ".........OBBBBO......OBBBBO.....",
  ".......OOOBBBBBOOOOOOBBBBBOO....",
  "......OBBBBBBBBBBBBBBBBBBBBBO...",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBO..",
  "....OBBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWEEWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWEEWWWOBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBBBOOOOOBBBSSBBBOOOOOBBBBO",
  "....OBBBBBBBBBBSSSSBBBBBBBBBBBBO",
  "....OBBBBBBBBSSTTTTSSBBBBBBBBBBO",
  ".....OBBBBBBBSSTTTTSSBBBBBBBBBO.",
  ".....OBBBBBBBBSSssssSSBBBBBBBBO.",
  "......OBBBBBBBBBssssBBBBBBBBBO..",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OSBBBBBBBBBBBBBBBBBBBBBBBBSO",
  "....OSSBBBBBBBBBBBBBBBBBBBBBBSSO",
  ".....OSBBBBBBBBBBBBBBBBBBBBBBSO.",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".......OBBBBBBBBBBBBBBBBBBBBO...",
  "........OOBBBBBOOOOOOBBBBBBOO...",
  ".........OSSSSO......OSSSSO.....",
  ".........OssssO......OssssO.....",
  "..........OOOO........OOOO......",
  "................................",
];

// RUN frame 3 — right foot forward (mirror of frame 1)
const GOPHER_RUN_3 = [
  "................................",
  "................................",
  "..........OOOO........OOOO......",
  ".........OBBBBO......OBBBBO.....",
  ".......OOOBBBBBOOOOOOBBBBBOO....",
  "......OBBBBBBBBBBBBBBBBBBBBBO...",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBO..",
  "....OBBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWWEEWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWWEEWWOBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBBBOOOOOBBBSSBBBOOOOOBBBBO",
  "....OBBBBBBBBBBSSSSBBBBBBBBBBBBO",
  "....OBBBBBBBBSSTTTTSSBBBBBBBBBBO",
  ".....OBBBBBBBSSTTTTSSBBBBBBBBBO.",
  ".....OBBBBBBBBSSssssSSBBBBBBBBO.",
  "......OBBBBBBBBBssssBBBBBBBBBO..",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OSBBBBBBBBBBBBBBBBBBBBBBBBSO",
  "....OSSBBBBBBBBBBBBBBBBBBBBBBSSO",
  ".....OSBBBBBBBBBBBBBBBBBBBBBBSO.",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".......OBBBBBBBBBBBBBBBBBBBBO...",
  ".OBBBBBO......OOOBBBBBBOO.......",  // right leg forward
  ".OBBBBO............OSSSSSSSO....",
  "..OssO..............OssssssO....",
  "...OO................OOOOOO.....",
];

// RUN frame 4 — passing pose (re-use frame 2 for natural cycle)
const GOPHER_RUN_4 = GOPHER_RUN_2;

// JUMP — same body, both feet tucked under
const GOPHER_JUMP = [
  "..........OOOO........OOOO......",
  ".........OBBBBO......OBBBBO.....",
  ".......OOOBBBBBOOOOOOBBBBBOO....",
  "......OBBBBBBBBBBBBBBBBBBBBBO...",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBO..",
  "....OBBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWEEWWWOBBO",
  "....OBBOWWWEEWWOBBBBOWWEEWWWOBBO",
  "....OBBOWWWWWWWOBBBBOWWWWWWWOBBO",
  "....OBBBOWWWWWOBBBBBBOWWWWWOBBBO",
  "....OBBBBOOOOOBBBSSBBBOOOOOBBBBO",
  "....OBBBBBBBBBBSSSSBBBBBBBBBBBBO",
  "....OBBBBBBBBSSTTTTSSBBBBBBBBBBO",
  ".....OBBBBBBBSSTTTTSSBBBBBBBBBO.",
  ".....OBBBBBBBBSSssssSSBBBBBBBBO.",
  "......OBBBBBBBBBssssBBBBBBBBBO..",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "....OSBBBBBBBBBBBBBBBBBBBBBBBBSO",
  "....OSSBBBBBBBBBBBBBBBBBBBBBBSSO",
  ".....OSBBBBBBBBBBBBBBBBBBBBBBSO.",
  ".....OBBBBBBBBBBBBBBBBBBBBBBBBO.",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  ".......OBBBBBBBBBBBBBBBBBBBBO...",
  "........OBBBBSSSSSSSSBBBBBBO....",  // feet tucked
  "........OBBBBSSSSSSSSBBBBBBO....",
  ".........OOOOSssssssSOOOOOOO....",
  "................................",
  "................................",
  "................................",
];

// DUCK — body flattened, head forward, very low silhouette
const GOPHER_DUCK = [
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "..........OOOO........OOOO......",
  "........OOBBBBOOOOOOOOBBBBOO....",
  ".......OBBBBBBBBBBBBBBBBBBBBO...",
  "......OBBBBBBBBBBBBBBBBBBBBBBO..",
  "....OBBBOWWWWOBBBBBBBOWWWWOBBBBO",
  "....OBBOWWEEWOBBBBBBBOWEEWWOBBBO",
  "....OBBOWWWWWOBSSSSSBOWWWWWOBBBO",
  "....OBBBOOOOBSSTTTTSSBOOOOBBBBBO",
  ".....OBBBBBBBSSTTTTSSBBBBBBBBBBO",
  "....OBBBBBBBBBSSssssSSBBBBBBBBBO",
  "...OBBBBBBBBBBBBssssBBBBBBBBBBBO",
  "...OBBBBBBBBBBBBBBBBBBBBBBBBBBBO",
  "...OBBBBBBBBBBBBBBBBBBBBBBBBBBBO",
  "....OBBBBBBBBBBBBBBBBBBBBBBBBBO.",
  ".....OOOSSSSOOOOOOOOOOOOSSSSOO..",
  "........OssO..............OssO..",
  ".........OO................OO...",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
];

window.GOPHER_PALETTE = GOPHER_PALETTE;
window.GOPHER_FRAMES = {
  idle: GOPHER_IDLE,
  run1: GOPHER_RUN_1,
  run2: GOPHER_RUN_2,
  run3: GOPHER_RUN_3,
  run4: GOPHER_RUN_4,
  jump: GOPHER_JUMP,
  duck: GOPHER_DUCK,
};
