// Moteur du Space Invaders, sans aucune dépendance à React.
// createGame() crée une partie, update() la fait avancer, draw() la dessine.

export const WIDTH = 400;
export const HEIGHT = 480;

const PX = 2; // taille d'un pixel de sprite
const COLS = 7;
const ROWS = 5;
const CELL_X = 40;
const CELL_Y = 30;
const GRID_X = 68;
const GRID_Y = 56;
const GROUND_Y = HEIGHT - 16;
const PLAYER_Y = HEIGHT - 44;
const BUNKER_Y = PLAYER_Y - 52;
const BUNKER_CELL = 4;
const PLAYER_SPEED = 220;
const PLAYER_BULLET_SPEED = 430;
const ALIEN_BULLET_SPEED = 170;

// Si tu changes la cadence de tir ou les points, adapte MAX_POINTS_PER_SECOND dans server/server.js
const FIRE_COOLDOWN = 0.4;
const POINTS = { squid: 30, crab: 20, octopus: 10 };
const ROW_TYPES = ["squid", "crab", "crab", "octopus", "octopus"];

const RED = "#dc2626";
const WHITE = "#ffffff";

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
  // À chaque vague, les aliens démarrent un peu plus bas
  const offsetY = Math.min(game.wave - 1, 4) * 14;
  game.aliens = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const type = ROW_TYPES[row];
      const w = SPRITES[type][0][0].length * PX;
      game.aliens.push({
        type,
        col,
        x: GRID_X + col * CELL_X + (24 - w) / 2,
        y: GRID_Y + offsetY + row * CELL_Y,
        w,
        h: 8 * PX,
        alive: true,
      });
    }
  }
  game.direction = 1;
  game.bullets = [];
  game.alienBullets = [];
  game.bunkers = createBunkers();
  game.fireTimer = 1;
}

export function createGame() {
  const game = {
    score: 0,
    lives: 3,
    wave: 1,
    over: false,
    time: 0,
    player: { x: WIDTH / 2 - 13, y: PLAYER_Y, w: 13 * PX, h: 8 * PX, cooldown: 0, invincible: 0 },
    aliens: [],
    direction: 1,
    frameTimer: 0,
    fireTimer: 1,
    waveDelay: 0,
    bullets: [],
    alienBullets: [],
    bunkers: [],
    effects: [],
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
  player.x = Math.max(4, Math.min(WIDTH - player.w - 4, player.x));
  player.cooldown -= dt;
  player.invincible -= dt;
  if (input.fire && player.cooldown <= 0) {
    game.bullets.push({ x: player.x + player.w / 2 - 1, y: player.y - 8, w: 2, h: 8 });
    player.cooldown = FIRE_COOLDOWN;
  }

  const alive = game.aliens.filter((alien) => alien.alive);
  if (alive.length > 0) {
    // Moins il reste d'aliens, plus ils vont vite
    const killed = 1 - alive.length / (COLS * ROWS);
    const speed = (18 + game.wave * 4) * (1 + killed * 2.5);
    const left = Math.min(...alive.map((alien) => alien.x));
    const right = Math.max(...alive.map((alien) => alien.x + alien.w));
    let dx = game.direction * speed * dt;
    let dy = 0;
    if (right + dx > WIDTH - 6 || left + dx < 6) {
      // Arrivés au bord : demi-tour et descente d'un cran
      game.direction *= -1;
      dx = 0;
      dy = 12;
    }
    alive.forEach((alien) => {
      alien.x += dx;
      alien.y += dy;
    });
    game.frameTimer += dt * (1 + killed * 2);

    // Tir de l'alien le plus bas d'une colonne prise au hasard
    game.fireTimer -= dt;
    if (game.fireTimer <= 0 && game.alienBullets.length < 2 + game.wave) {
      const columns = [...new Set(alive.map((alien) => alien.col))];
      const col = columns[Math.floor(Math.random() * columns.length)];
      const shooter = alive.filter((alien) => alien.col === col).reduce((low, alien) => (alien.y > low.y ? alien : low));
      game.alienBullets.push({ x: shooter.x + shooter.w / 2 - 1.5, y: shooter.y + shooter.h, w: 3, h: 9 });
      game.fireTimer = Math.max(0.35, 1.1 - game.wave * 0.1) * (0.6 + Math.random() * 0.8);
    }
  }

  game.bullets.forEach((bullet) => (bullet.y -= PLAYER_BULLET_SPEED * dt));
  game.alienBullets.forEach((bullet) => (bullet.y += ALIEN_BULLET_SPEED * dt));

  // Tirs du joueur sur les aliens
  game.bullets.forEach((bullet) => {
    const target = alive.find((alien) => alien.alive && overlap(alien, bullet));
    if (!target) return;
    target.alive = false;
    bullet.hit = true;
    game.score += POINTS[target.type];
    game.effects.push({ x: target.x + target.w / 2, y: target.y + target.h / 2, ttl: 0.25 });
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

  // Tirs des aliens sur le joueur
  if (player.invincible <= 0 && game.alienBullets.some((bullet) => !bullet.hit && overlap(bullet, player))) {
    game.lives -= 1;
    player.invincible = 1.5;
    game.alienBullets = [];
    game.effects.push({ x: player.x + player.w / 2, y: player.y + player.h / 2, ttl: 0.4 });
    if (game.lives <= 0) game.over = true;
  }

  game.bullets = game.bullets.filter((bullet) => !bullet.hit && bullet.y + bullet.h > 0);
  game.alienBullets = game.alienBullets.filter((bullet) => !bullet.hit && bullet.y + bullet.h < GROUND_Y);
  game.effects = game.effects.filter((effect) => (effect.ttl -= dt) > 0);

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

  ctx.fillStyle = RED;
  game.bullets.forEach((bullet) => ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), bullet.w, bullet.h));
  ctx.fillStyle = WHITE;
  game.alienBullets.forEach((bullet) => ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), bullet.w, bullet.h));

  game.effects.forEach((effect) => drawSprite(ctx, EXPLOSION_SPRITE, effect.x - 7, effect.y - 7, PX, WHITE));

  ctx.fillStyle = RED;
  ctx.fillRect(0, GROUND_Y, WIDTH, 2);

  if (game.waveDelay > 0) {
    ctx.fillStyle = WHITE;
    ctx.font = "bold 22px monospace";
    ctx.fillText(`VAGUE ${game.wave}`, WIDTH / 2, HEIGHT / 2 - 40);
  }
}
