let car, environment;
let offsetX = 0;
let offsetY = 30;
let rotateAmount = 0;
function setup() {
  createCanvas(300, 300);
  car = new Car();
  environment = new Environment();
}

function draw() {
  background(255);

  // rotate around center
  rotateAmount += 0.001;
  translate(width/2, height/2);
  rotate(rotateAmount);
  translate(-width/2, -height/2);

  environment.update();
  environment.draw();
  car.draw();

}

class Car {

  draw() {

    line(80, 60, 220, 60);
    line(220, 60, 260, 100);
    line(260, 100, 260, 120);
    line(260, 120, 220, 120);
    line(180, 120, 130, 120);
    line(90,  120, 40,  120);
    line(40, 100, 40, 120);
    line(40, 100, 80, 60);

    circle(200, 120, 40);
    circle(110, 120, 40);
  }
}

class Environment {
  constructor() {
    this.lines = [];
    this.spawnLikeliness = 0.05;
  }

  update() {
    this.spawnLikeliness += 0.001;
    if (Math.random() < this.spawnLikeliness) {
      this.lines.push(new Line(this.spawnLikeliness * 200));
      // print('new line')
    }
    for (const line of this.lines) {
      line.update();
    }
  }

  draw() {
    for (const line of this.lines) {
      line.draw();
    }
  }
}

class Line {
  constructor(speed) {
    this.x = width;
    this.y = random(height);
    this.speed = speed;
    this.length = random(30);
  }

  update() {
    this.x -= this.speed;
  }

  draw() {
    line(this.x, this.y, this.x + this.length, this.y);
  }
}