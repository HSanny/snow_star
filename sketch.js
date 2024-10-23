let starOpacity = 255; // Starting opacity of stars
let snowOpacity = 255; // Opacity for snow
let mode = "stars";    // Initial mode set to "stars"
const snowflakes = [];
const ground = [];

const minSpeed = 1;
const maxSpeed = 5;

let toggleButton;

function setup() {
  createCanvas(400, 400);
  background(0, 20, 80);

  // Snow setup
  noSmooth();
  stroke(255);
  fill(255);

  for (let i = 0; i < 100; i++) {
    snowflakes.push(createVector(
      random(width), random(height),
      random(minSpeed, maxSpeed)));
  }

  for (let x = 0; x < width; x++) {
    ground[x] = height;
  }

  // Create button to toggle between modes
  toggleButton = createButton('Switch to Snow Mode');
  toggleButton.position(10, 410);
  toggleButton.mousePressed(toggleMode);
}

var fromX, fromY;
var toX, toY;
var step = 2.5;

function draw() {
  // Clear the screen for the current animation mode
  if (mode === "stars") {
    drawStars(); // Only draw stars
  } else if (mode === "snow") {
    drawSnow(snowOpacity); // Only draw snow
  }

  // Draw ground and lake independently of the mode
  drawGroundAndLake();
}

// Function to draw stars
function drawStars() {
  background(0, 20, 80); // Clear the star background

  // Draw stars if opacity allows it
  if (starOpacity > 0) {
    if (random() > 0.9) {
      stroke(255, starOpacity); // Apply opacity to stars
      point(random(width), random(height));
    }

    // draw shooting stars
    if (random() > 0.95 && step >= 2.5) {
      fromX = random(width);
      fromY = random(height / 2);
      toX = random(fromX + 10, width);
      toY = random(fromY + 10, height / 2);
      step = 0;
    }

    // Animate shooting stars
    if (step < 2.5) {
      let nextStep = step + 0.02;
      strokeWeight(3);
      stroke(0, 20, 80, 30);
      line(fromX, fromY, toX, toY);
      strokeWeight(1);
      if (step < 1) {
        stroke(255, (1 - step) * starOpacity); // Apply fading to shooting stars
        line(lerp(fromX, toX, step), lerp(fromY, toY, step),
          lerp(fromX, toX, nextStep), lerp(fromY, toY, nextStep));
      }
      step = nextStep;
    }
  }
}

// Function to handle snow drawing
function drawSnow(snowOpacity) {
  background(0, 0, 32); // Clear the snow background

  // Snowflake falling animation
  for (const snowflake of snowflakes) {
    snowflake.y += snowflake.z;
    stroke(255, snowOpacity);  // Apply snow opacity for the snowflakes
    rect(snowflake.x, snowflake.y, 1, 1);

    if (snowflake.y >= ground[floor(snowflake.x)]) {
      ground[floor(snowflake.x)]--;
      snowflake.x = random(width);
      snowflake.y = 0;
    }
  }

  // Draw snow accumulated on the ground
  for (let x = 0; x < width; x++) {
    fill(255, snowOpacity); // Apply opacity to accumulated snow as well
    rect(x, ground[x], 1, height - ground[x]);
  }
}

// Draw ground and lake
function drawGroundAndLake() {
  // draw ground
  noStroke();
  fill(0, 10, 20);
  rect(0, height * 0.6, width, height);

  // draw lake
  noStroke();
  fill(0, 20, 60);
  ellipse(0, height, width * 2.5, height * 0.75);
}

// Function to toggle between Star Mode and Snow Mode
function toggleMode() {
  if (mode === "stars") {
    mode = "snow"; // Switch to Snow Mode
    toggleButton.html('Switch to Star Mode'); // Update button text
    resetSnow(); // Reset snow when switching back to Snow Mode
  } else {
    mode = "stars"; // Switch to Star Mode
    toggleButton.html('Switch to Snow Mode'); // Update button text
    resetStars(); // Reset star parameters
  }
}

// Function to reset snow parameters when switching modes
function resetSnow() {
  for (let i = 0; i < snowflakes.length; i++) {
    snowflakes[i].y = random(height); // Reset snowflake positions
    snowflakes[i].x = random(width);
  }

  for (let x = 0; x < width; x++) {
    ground[x] = height; // Reset ground to initial state
  }
}

// Function to reset stars when switching modes
function resetStars() {
  starOpacity = 255; // Reset star opacity
  step = 2.5; // Reset star shooting step
}
