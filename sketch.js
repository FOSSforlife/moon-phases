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
  stroke(255);
  text(`${phaseSlider.value()}`, 10, 26);
  drawMoon(300, color(130, 15, 130), phaseSlider.value());
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
  clip(outer(phase));
  clip(inner(phase));

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
  innerArc(phase);
}

function outer(phase) {
  return () => {
    arc(200, 200, 300, 300, 0, 2 * PI);
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

function innerArc(phase) {
  fill(0);
  // stroke(255);
  if (phase < 8) {
    const control = -800 + phase * 130;
    curve(control, 50, 200, 50, 200, 350, control, 350);
  } else if (phase > 22) {
    const control = -800 + (phase % 15) * 160;
    curve(control, 50, 200, 50, 200, 350, control, 350);
  }
}

function inner(phase) {
  return () => {
    if (phase >= 8 && phase < 15) {
      const control = -800 + phase * 130;
      curve(control, 50, 200, 50, 200, 350, control, 350);
      rect(200, 50, 350, 350);
    } else if (phase >= 16 && phase < 22) {
      const control = -800 + (phase % 15) * 130;
      curve(control, 50, 200, 50, 200, 350, control, 350);
      rect(50, 50, 150, 350);
    } else {
      // deactivate clipping
      rect(0, 0, width, height);
    }
  };
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
