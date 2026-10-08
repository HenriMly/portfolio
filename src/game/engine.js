// Moteur du Space Invaders, sans aucune dépendance à React.
// createGame() crée une partie, update() la fait avancer, draw() la dessine.

export const WIDTH = 400;
export const HEIGHT = 480;

const PX = 2; // taille d'un pixel de sprite
const CELL_X = 36;
const CELL_Y = 28;
const CELL_W = 24; // largeur du plus gros alien
const GRID_Y = 44;
const GROUND_Y = HEIGHT - 16;
const PLAYER_Y = HEIGHT - 44;
const BUNKER_Y = PLAYER_Y - 52;
const BUNKER_CELL = 4;
const PLAYER_SPEED = 220;
const PLAYER_BULLET_SPEED = 430;
const ALIEN_BULLET_SPEED = 170;
const ALIEN_BASE_SPEED = 14;
const ALIEN_WAVE_SPEED = 2; // vitesse ajoutée à chaque vague
const ALIEN_DROP = 10;

// Si tu changes les cadences de tir, les points ou les bonus, adapte MAX_POINTS_PER_SECOND dans server/server.js
const FIRE_COOLDOWN = 0.4;
const RAPID_COOLDOWN = 0.16;
const TRIPLE_SPREAD = 90; // vitesse latérale des deux tirs de côté
const PIERCE_COUNT = 3; // nombre d'aliens traversés par un tir perçant
const POWER_DURATION = 10;
const POINTS = { squid: 30, crab: 20, octopus: 10 };

// Les bonus tombent en zigzag, plus vite sur les côtés que le vaisseau : il faut anticiper
const BONUS_SIZE = 16;
const BONUS_FALL_SPEED = 120;
const BONUS_SWAY = 55;
const BONUS_SWAY_SPEED = 5.5;
const POWERS = {
  rapid: { label: "TIR RAPIDE", letter: "R" },
  triple: { label: "TIR TRIPLE", letter: "T" },
  pierce: { label: "TIR PERÇANT", letter: "P" },
};

const RED = "#dc2626";
const WHITE = "#ffffff";
const YELLOW = "#facc15";

// Une disposition par vague, de plus en plus fournie. # = un alien.
const FORMATIONS = [
  { name: "BLOC", rows: ["#######", "#######", "#######", "#######", "#######"] },
  { name: "FLÈCHE", rows: ["#########", "#########", ".#######.", ".#######.", "..#####..", "...###..."] },
  { name: "LOSANGE", rows: ["..#####..", ".#######.", "#########", "#########", ".#######.", "..#####.."] },
  {
    name: "SABLIER",
    rows: ["#########", ".#######.", "..#####..", "...###...", "..#####..", ".#######.", "#########"],
  },
  { name: "ESCADRONS", rows: ["####.####", "####.####", "####.####", "####.####", "####.####", "####.####"] },
  {
    name: "FORTERESSE",
    rows: ["#########", "#########", "##.....##", "##.###.##", "##.....##", "#########", "#########"],
  },
  {
    name: "CRÉNEAUX",
    rows: ["#.#.#.#.#", "#########", "#########", "#########", "#########", "#########", "#.#.#.#.#"],
  },
  {
    name: "MUR",
    rows: ["#########", "#########", "#########", "#########", "#########", "#########", "#########"],
  },
];

// Après la dernière formation, on reprend les quatre plus grosses
function formationFor(wave) {
  if (wave <= FORMATIONS.length) return FORMATIONS[wave - 1];
  return FORMATIONS[4 + ((wave - FORMATIONS.length - 1) % 4)];
}

// Chaque alien a deux images pour l'animation
const SPRITES = {
  squid: [
    ["...##...", "..####..", ".######.", "##.##.##", "########", "..#..#..", ".#.##.#.", "#.#..#.#"],
    ["...##...", "..####..", ".######.", "##.##.##", "########", ".#.##.#.", "#......#", ".#....#."],
  ],
  crab: [
    [
      "..#.....#..",
      "...#...#...",
      "..#######..",
      ".##.###.##.",
      "###########",
      "#.#######.#",
      "#.#.....#.#",
      "...##.##...",
    ],
    [
      "..#.....#..",
      "#..#...#..#",
      "#.#######.#",
      "###.###.###",
      "###########",
      ".#########.",
      "..#.....#..",
      ".#.......#.",
    ],
  ],
  octopus: [
    [
      "....####....",
      ".##########.",
      "############",
      "###..##..###",
      "############",
      "...##..##...",
      "..##.##.##..",
      "##........##",
    ],
    [
      "....####....",
      ".##########.",
      "############",
      "###..##..###",
      "############",
      "..###..###..",
      ".##..##..##.",
      "..##....##..",
    ],
  ],
};

const PLAYER_SPRITE = [
  "......#......",
  ".....###.....",
  ".....###.....",
  ".###########.",
  "#############",
  "#############",
  "#############",
  "#############",
];

const EXPLOSION_SPRITE = ["#..#..#", ".#.#.#.", "..###..", "###.###", "..###..", ".#.#.#.", "#..#..#"];

const BUNKER_SHAPE = [
  "..#######..",
  ".#########.",
  "###########",
  "###########",
  "###########",
  "###.....###",
  "##.......##",
];

const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// La rangée du haut rapporte le plus, la moitié basse le moins
function rowType(row, rowCount) {
  if (row === 0) return "squid";
  return row < Math.ceil(rowCount / 2) ? "crab" : "octopus";
}

function createBunkers() {
  const count = 3;
  const width = BUNKER_SHAPE[0].length * BUNKER_CELL;
  const gap = (WIDTH - count * width) / (count + 1);
  const cells = [];
  for (let i = 0; i < count; i++) {
    const left = gap + i * (width + gap);
    BUNKER_SHAPE.forEach((line, row) => {
      for (let col = 0; col < line.length; col++) {
        if (line[col] === "#") {
          cells.push({ x: left + col * BUNKER_CELL, y: BUNKER_Y + row * BUNKER_CELL, w: BUNKER_CELL, h: BUNKER_CELL });
        }
      }
    });
  }
  return cells;
}

function spawnWave(game) {
  const formation = formationFor(game.wave);
  const cols = formation.rows[0].length;
  const left = (WIDTH - ((cols - 1) * CELL_X + CELL_W)) / 2;
  game.aliens = [];
  formation.rows.forEach((line, row) => {
    for (let col = 0; col < cols; col++) {
      if (line[col] !== "#") continue;
      const type = rowType(row, formation.rows.length);
      const w = SPRITES[type][0][0].length * PX;
      game.aliens.push({
        type,
        col,
        x: left + col * CELL_X + (CELL_W - w) / 2,
        y: GRID_Y + row * CELL_Y,
        w,
        h: 8 * PX,
        alive: true,
      });
    }
  });
  game.formation = formation.name;
  game.waveTotal = game.aliens.length;
  game.kills = 0;
  // Un bonus par vague, parfois deux, lâché par un alien détruit à un moment tiré au hasard
  const bonusCount = Math.random() < 0.35 ? 2 : 1;
  game.bonusKills = Array.from({ length: bonusCount }, () =>
    Math.floor(game.waveTotal * (0.2 + Math.random() * 0.65))
  );
  game.direction = 1;
  game.bullets = [];
  game.alienBullets = [];
  game.bunkers = createBunkers();
  game.fireTimer = 1;
}

function spawnBonus(game, alien) {
  const types = Object.keys(POWERS);
  const center = alien.x + alien.w / 2 - BONUS_SIZE / 2;
  game.bonuses.push({
    type: types[Math.floor(Math.random() * types.length)],
    // le zigzag reste entièrement dans l'écran
    baseX: clamp(center, 4 + BONUS_SWAY, WIDTH - BONUS_SIZE - 4 - BONUS_SWAY),
    x: center,
    y: alien.y,
    w: BONUS_SIZE,
    h: BONUS_SIZE,
    age: 0,
  });
}

export function createGame() {
  const game = {
    score: 0,
    lives: 3,
    wave: 1,
    over: false,
    time: 0,
    player: { x: WIDTH / 2 - 13, y: PLAYER_Y, w: 13 * PX, h: 8 * PX, cooldown: 0, invincible: 0, power: null },
    aliens: [],
    formation: "",
    waveTotal: 0,
    kills: 0,
    bonusKills: [],
    direction: 1,
    frameTimer: 0,
    fireTimer: 1,
    waveDelay: 0,
    bullets: [],
    alienBullets: [],
    bunkers: [],
    bonuses: [],
    effects: [],
    notice: null,
  };
  spawnWave(game);
  return game;
}

// input : { left, right, fire }, dt : temps écoulé en secondes
export function update(game, dt, input) {
  if (game.over) return;
  game.time += dt;
  const player = game.player;

  // Nouvelle vague après une courte pause
  if (game.waveDelay > 0) {
    game.waveDelay -= dt;
    if (game.waveDelay <= 0) spawnWave(game);
  }

  // Joueur
  if (input.left) player.x -= PLAYER_SPEED * dt;
  if (input.right) player.x += PLAYER_SPEED * dt;
  player.x = clamp(player.x, 4, WIDTH - player.w - 4);
  player.cooldown -= dt;
  player.invincible -= dt;
  if (player.power && (player.power.time -= dt) <= 0) player.power = null;

  if (input.fire && player.cooldown <= 0) {
    const power = player.power ? player.power.type : null;
    const pierce = power === "pierce";
    const shot = (vx) => ({
      x: player.x + player.w / 2 - (pierce ? 2 : 1),
      y: player.y - (pierce ? 12 : 8),
      w: pierce ? 4 : 2,
      h: pierce ? 12 : 8,
      vx,
      strength: pierce ? PIERCE_COUNT : 1, // nombre d'aliens que le tir peut encore détruire
      boosted: power !== null,
    });
    game.bullets.push(shot(0));
    if (power === "triple") game.bullets.push(shot(-TRIPLE_SPREAD), shot(TRIPLE_SPREAD));
    player.cooldown = power === "rapid" ? RAPID_COOLDOWN : FIRE_COOLDOWN;
  }

  const alive = game.aliens.filter((alien) => alien.alive);
  if (alive.length > 0) {
    // Moins il reste d'aliens, plus ils vont vite
    const killed = 1 - alive.length / game.waveTotal;
    const speed = (ALIEN_BASE_SPEED + game.wave * ALIEN_WAVE_SPEED) * (1 + killed * 2.5);
    const left = Math.min(...alive.map((alien) => alien.x));
    const right = Math.max(...alive.map((alien) => alien.x + alien.w));
    let dx = game.direction * speed * dt;
    let dy = 0;
    if (right + dx > WIDTH - 6 || left + dx < 6) {
      // Arrivés au bord : demi-tour et descente d'un cran
      game.direction *= -1;
      dx = 0;
      dy = ALIEN_DROP;
    }
    alive.forEach((alien) => {
      alien.x += dx;
      alien.y += dy;
    });
    game.frameTimer += dt * (1 + killed * 2);

    // Tir de l'alien le plus bas d'une colonne prise au hasard
    game.fireTimer -= dt;
    if (game.fireTimer <= 0 && game.alienBullets.length < Math.min(2 + game.wave, 7)) {
      const columns = [...new Set(alive.map((alien) => alien.col))];
      const col = columns[Math.floor(Math.random() * columns.length)];
      const shooter = alive.filter((alien) => alien.col === col).reduce((low, alien) => (alien.y > low.y ? alien : low));
      game.alienBullets.push({ x: shooter.x + shooter.w / 2 - 1.5, y: shooter.y + shooter.h, w: 3, h: 9 });
      game.fireTimer = Math.max(0.4, 1.1 - game.wave * 0.08) * (0.6 + Math.random() * 0.8);
    }
  }

  game.bullets.forEach((bullet) => {
    bullet.x += bullet.vx * dt;
    bullet.y -= PLAYER_BULLET_SPEED * dt;
  });
  game.alienBullets.forEach((bullet) => (bullet.y += ALIEN_BULLET_SPEED * dt));

  // Tirs du joueur sur les aliens
  game.bullets.forEach((bullet) => {
    const target = alive.find((alien) => alien.alive && overlap(alien, bullet));
    if (!target) return;
    target.alive = false;
    bullet.strength -= 1;
    if (bullet.strength <= 0) bullet.hit = true;
    game.score += POINTS[target.type];
    game.effects.push({ x: target.x + target.w / 2, y: target.y + target.h / 2, ttl: 0.25 });
    game.kills += 1;
    const bonusIndex = game.bonusKills.indexOf(game.kills);
    if (bonusIndex !== -1) {
      game.bonusKills.splice(bonusIndex, 1);
      spawnBonus(game, target);
    }
  });

  // Bunkers : chaque tir détruit les blocs qu'il touche, les aliens les écrasent
  [...game.bullets, ...game.alienBullets].forEach((bullet) => {
    if (bullet.hit) return;
    const before = game.bunkers.length;
    game.bunkers = game.bunkers.filter((cell) => !overlap(cell, bullet));
    if (game.bunkers.length < before) bullet.hit = true;
  });
  if (alive.some((alien) => alien.alive && alien.y + alien.h >= BUNKER_Y)) {
    game.bunkers = game.bunkers.filter((cell) => !alive.some((alien) => alien.alive && overlap(cell, alien)));
  }

  // Bonus : chute en zigzag, à attraper avec le vaisseau
  game.bonuses.forEach((bonus) => {
    bonus.age += dt;
    bonus.y += BONUS_FALL_SPEED * dt;
    bonus.x = bonus.baseX + Math.sin(bonus.age * BONUS_SWAY_SPEED) * BONUS_SWAY;
    if (overlap(bonus, player)) {
      bonus.caught = true;
      player.power = { type: bonus.type, time: POWER_DURATION };
      game.notice = { text: `${POWERS[bonus.type].label} !`, ttl: 1.2 };
    }
  });
  game.bonuses = game.bonuses.filter((bonus) => !bonus.caught && bonus.y < GROUND_Y);

  // Tirs des aliens sur le joueur : une vie en moins, et le bonus en cours est perdu
  if (player.invincible <= 0 && game.alienBullets.some((bullet) => !bullet.hit && overlap(bullet, player))) {
    game.lives -= 1;
    player.invincible = 1.5;
    player.power = null;
    game.alienBullets = [];
    game.effects.push({ x: player.x + player.w / 2, y: player.y + player.h / 2, ttl: 0.4 });
    if (game.lives <= 0) game.over = true;
  }

  game.bullets = game.bullets.filter(
    (bullet) => !bullet.hit && bullet.y + bullet.h > 0 && bullet.x + bullet.w > 0 && bullet.x < WIDTH
  );
  game.alienBullets = game.alienBullets.filter((bullet) => !bullet.hit && bullet.y + bullet.h < GROUND_Y);
  game.effects = game.effects.filter((effect) => (effect.ttl -= dt) > 0);
  if (game.notice && (game.notice.ttl -= dt) <= 0) game.notice = null;

  // Invasion : un alien a atteint la ligne du joueur
  if (alive.some((alien) => alien.alive && alien.y + alien.h >= player.y)) game.over = true;

  // Vague terminée
  if (game.waveDelay <= 0 && !game.aliens.some((alien) => alien.alive)) {
    game.wave += 1;
    game.waveDelay = 1.2;
  }
}

function drawSprite(ctx, rows, x, y, px, color) {
  ctx.fillStyle = color;
  const left = Math.round(x);
  const top = Math.round(y);
  rows.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      if (line[col] === "#") ctx.fillRect(left + col * px, top + row * px, px, px);
    }
  });
}

export function draw(ctx, game) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Score, vague et vies
  ctx.fillStyle = WHITE;
  ctx.font = "bold 14px monospace";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(`SCORE ${String(game.score).padStart(5, "0")}`, 10, 10);
  ctx.textAlign = "center";
  ctx.fillText(`VAGUE ${game.wave}`, WIDTH / 2, 10);
  for (let i = 0; i < game.lives; i++) {
    drawSprite(ctx, PLAYER_SPRITE, WIDTH - 10 - (i + 1) * 18, 12, 1, RED);
  }

  const frame = Math.floor(game.frameTimer / 0.5) % 2;
  game.aliens.forEach((alien) => {
    if (alien.alive) drawSprite(ctx, SPRITES[alien.type][frame], alien.x, alien.y, PX, WHITE);
  });

  ctx.fillStyle = RED;
  game.bunkers.forEach((cell) => ctx.fillRect(cell.x, cell.y, cell.w, cell.h));

  // Le vaisseau clignote tant qu'il est invincible
  const player = game.player;
  if (player.invincible <= 0 || Math.floor(game.time * 12) % 2 === 0) {
    drawSprite(ctx, PLAYER_SPRITE, player.x, player.y, PX, RED);
  }

  game.bullets.forEach((bullet) => {
    ctx.fillStyle = bullet.boosted ? YELLOW : RED;
    ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), bullet.w, bullet.h);
  });
  ctx.fillStyle = WHITE;
  game.alienBullets.forEach((bullet) => ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), bullet.w, bullet.h));

  // Bonus : capsule jaune marquée d'une lettre, avec un contour qui clignote
  ctx.font = "bold 12px monospace";
  ctx.textBaseline = "middle";
  game.bonuses.forEach((bonus) => {
    const x = Math.round(bonus.x);
    const y = Math.round(bonus.y);
    if (Math.floor(bonus.age * 8) % 2 === 0) {
      ctx.fillStyle = WHITE;
      ctx.fillRect(x - 1, y - 1, bonus.w + 2, bonus.h + 2);
    }
    ctx.fillStyle = YELLOW;
    ctx.fillRect(x, y, bonus.w, bonus.h);
    ctx.fillStyle = "#000000";
    ctx.fillText(POWERS[bonus.type].letter, x + bonus.w / 2, y + bonus.h / 2 + 1);
  });
  ctx.textBaseline = "top";

  game.effects.forEach((effect) => drawSprite(ctx, EXPLOSION_SPRITE, effect.x - 7, effect.y - 7, PX, WHITE));

  ctx.fillStyle = RED;
  ctx.fillRect(0, GROUND_Y, WIDTH, 2);

  // Bonus en cours : nom et temps restant, sous la ligne du sol
  if (player.power) {
    ctx.fillStyle = YELLOW;
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(POWERS[player.power.type].label, 10, GROUND_Y + 5);
    ctx.fillRect(90, GROUND_Y + 7, 80 * (player.power.time / POWER_DURATION), 5);
    ctx.textAlign = "center";
  }

  if (game.waveDelay > 0) {
    ctx.fillStyle = WHITE;
    ctx.font = "bold 22px monospace";
    ctx.fillText(`VAGUE ${game.wave}`, WIDTH / 2, HEIGHT / 2 - 40);
    ctx.font = "bold 12px monospace";
    ctx.fillText(formationFor(game.wave).name, WIDTH / 2, HEIGHT / 2 - 12);
  } else if (game.notice) {
    ctx.fillStyle = YELLOW;
    ctx.font = "bold 16px monospace";
    ctx.fillText(game.notice.text, WIDTH / 2, HEIGHT / 2 + 10);
  }
}
