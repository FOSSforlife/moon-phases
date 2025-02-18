let textureData;
let phaseSlider;

function setup() {
  createCanvas(400, 400);
  textureData = Array(40)
    .fill(0)
    .map(() => ({
      size: random(25),
      x: random(width),
      y: random(height),
      shade: random(50) + 200,
    }));

  phaseSlider = createSlider(1, 28, 1, 1);
  phaseSlider.position(30, 10);
  phaseSlider.size(340);
}
function draw() {
  background(0);
  fill(255);
  text(`${phaseSlider.value()}`, 10, 26);
  drawMoon(300, color(2, 15, 200), phaseSlider.value());
}

function drawMoon(size, col, phase) {
  // shape outline (for debugging)
  // strokeWeight(1);
  // stroke(255);
  // noFill();
  // outer(phase)();
  // inner(phase)();

  stroke(0);
  push();

  // mask
  clip(outer(size));
  clip(inner(phase, size));

  // texture
  background(lerpColor(color(220), col, 0.1));
  strokeWeight(0);
  textureData.forEach(({ x, y, size, shade }) => {
    fill(lerpColor(color(shade, shade, shade), col, 0.1));
    circle(x, y, size);
  });

  pop();

  // shade
  coverHalf(phase);
  innerArc(phase, size);
}

function outer(size) {
  return () => {
    arc(200, 200, size, size, 0, 2 * PI);
  };
}

function inner(phase, size) {
  return () => {
    if (phase >= 8 && phase < 15) {
      const control = -800 * (size / 300) + phase * (130 * (size / 300));
      curve(
        control,
        200 - size / 2,
        200,
        200 - size / 2,
        200,
        200 + size / 2,
        control,
        200 + size / 2
      );
      rect(200, 50, 350, 350);
    } else if (phase >= 16 && phase < 22) {
      const control = -800 * (size / 300) + (phase % 15) * (130 * (size / 300));
      curve(
        control,
        200 - size / 2,
        200,
        200 - size / 2,
        200,
        200 + size / 2,
        control,
        200 + size / 2
      );
      rect(50, 50, 150, 350);
    } else {
      // deactivate clipping
      rect(0, 0, width, height);
    }
  };
}

function coverHalf(phase) {
  fill(0);
  if (phase < 8) {
    rect(50, 50, 150, 350);
  } else if (phase >= 22) {
    rect(200, 50, 350, 350);
  }
}

function innerArc(phase, size) {
  fill(0);
  // stroke(255);
  if (phase < 8) {
    const control = -800 * (size / 300) + phase * (130 * (size / 300));
    curve(
      control,
      200 - size / 2,
      200,
      200 - size / 2,
      200,
      200 + size / 2,
      control,
      200 + size / 2
    );
  } else if (phase > 22) {
    const control = -800 * (size / 300) + (phase % 15) * (160 * (size / 300));
    curve(
      control,
      200 - size / 2,
      200,
      200 - size / 2,
      200,
      200 + size / 2,
      control,
      200 + size / 2
    );
  }
}

function textureCircle(tintColor) {
  const size = random(25);
  const xPos = random(width);
  const yPos = random(height);
  const shade = random(50) + 200;
  fill(lerpColor(color(shade, shade, shade), tintColor, 0.1));
  strokeWeight(0);
  circle(xPos, yPos, size);
}
