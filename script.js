const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball
let ball = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  radius: 15,
  color: "red",
  speedX: 0,
  speedY: -2
};

// Obstacles
let obstacles = [];
let obstacleSpeed = 2;

// Controls
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

// Create random obstacles
function spawnObstacle() {
  let width = Math.random() * 100 + 20;
  let x = Math.random() * (canvas.width - width);
  obstacles.push({ x: x, y: -20, width: width, height: 20 });
}

// Collision detection
function checkCollision() {
  for (let obs of obstacles) {
    if (
      ball.x + ball.radius > obs.x &&
      ball.x - ball.radius < obs.x + obs.width &&
      ball.y + ball.radius > obs.y &&
      ball.y - ball.radius < obs.y + obs.height
    ) {
      alert("Game Over!");
      document.location.reload();
    }
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move ball
  if (leftPressed) ball.x -= 5;
  if (rightPressed) ball.x += 5;
  ball.y += ball.speedY;

  // Draw ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  // Move and draw obstacles
  for (let obs of obstacles) {
    obs.y -= ball.speedY; // obstacles move downward as ball goes up
    ctx.fillStyle = "#0f0";
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }

  // Spawn obstacles occasionally
  if (Math.random() < 0.02) spawnObstacle();

  checkCollision();
  requestAnimationFrame(gameLoop);
}

gameLoop();
