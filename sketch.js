let starOpacity = 255; // Starting opacity of stars
let starFading = false; // Whether the stars should start fading
const snowflakes = [];
const ground = [];

const minSpeed = 1;
const maxSpeed = 5;

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

}

var fromX, fromY;
var toX, toY;
var step = 2.5;


function draw() {
  // draw background that fades stars slowly
  background(0, 20, 80, 1);

  // Check if stars should be fading
  if (starFading && starOpacity > 0) {
    starOpacity -= 2; // Gradually reduce opacity of stars
  }

  

  // if (random() > 0.9) {
  //   stroke(255);
  //   point(random(width), random(height));
  // }
  
  // If stars are still visible, draw them
  if (starOpacity > 0) {
    if (random() > 0.9) {
      stroke(255, starOpacity); // Apply fading to stars
      point(random(width), random(height));
    }

    // draw stars
    if (random() > 0.95 && step >= 2.5) {
      fromX = random(width);
      fromY = random(height / 2);
      toX = random(fromX + 10, width);
      toY = random(fromY + 10, height / 2);
      step = 0;
    }

    // draw shooting stars
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

  // Transition to snow when stars have fully faded
  if (starOpacity <= 0) {
    drawSnow(); // Call the function to draw snow
  }

  // // draw stars
  // if (random() > 0.95 && step >= 2.5) {
  //   fromX = random(width);
  //   fromY = random(height / 2);
  //   toX = random(fromX + 10, width);
  //   toY = random(fromY + 10, height / 2);
  //   step = 0;
  // }

  // // draw shooting stars
  // if (step < 2.5) {
  //   // fade background
  //   let nextStep = step + 0.02;
  //   strokeWeight(3);
  //   stroke(0, 20, 80, 30);
  //   line(fromX, fromY, toX, toY);
  //   strokeWeight(1);
  //   // draw star
  //   if (step < 1) {
  //     stroke(255, (1 - step) * 200);
  //     line(lerp(fromX, toX, step), lerp(fromY, toY, step),
  //       lerp(fromX, toX, nextStep), lerp(fromY, toY, nextStep));
  //   }
  //   step = nextStep;
  // }

  // draw ground
  noStroke();
  fill(0, 10, 20);
  rect(0, height * 0.6, width, height);

  

  // draw lake
  noStroke();
  fill(0, 20, 60);
  ellipse(0, height, width * 2.5, height * 0.75);
}

// Function to handle the snow drawing
function drawSnow() {
  background(0, 0, 32, 20); // Faded dark background for snow

  // Snowflake falling
  for (const snowflake of snowflakes) {
    snowflake.y += snowflake.z;
    rect(snowflake.x, snowflake.y, 1, 1);

    if (snowflake.y >= ground[floor(snowflake.x)]) {
      ground[floor(snowflake.x)]--;
      snowflake.x = random(width);
      snowflake.y = 0;
    }
  }

  // Draw the snow accumulated on the ground
  for (let x = 0; x < width; x++) {
    rect(x, ground[x], 1, height - ground[x]);
  }
}

function mousePressed() {
  starFading = true; // Start fading the stars when the user clicks
}