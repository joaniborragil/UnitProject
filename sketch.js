let pendulum;
let dragging = false;

function setup() {
  createCanvas(800, 600);
  pendulum = new ThreePartPendulum(createVector(width / 2, 150));
}

function draw() {
  background(255);

  pendulum.update();
  pendulum.display();
}

function mousePressed() {
  pendulum.tryDrag(mouseX, mouseY);
}

function mouseReleased() {
  pendulum.stopDrag();
}

class PendulumSegment {
  constructor(origin, length, angle) {
    this.origin = origin.copy();
    this.length = length;
    this.angle = angle;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.damping = 0.995;
    this.position = createVector();
  }

  update(prevPos, force = 0) {
    this.aAcceleration = force;
    this.aVelocity += this.aAcceleration;
    this.aVelocity *= this.damping;
    this.angle += this.aVelocity;

    this.origin = prevPos.copy();
    this.position.set(
      this.origin.x + this.length * sin(this.angle),
      this.origin.y + this.length * cos(this.angle)
    );
  }

  display(color_) {
    stroke(color_);
    strokeWeight(4);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    fill(color_);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
}

class ThreePartPendulum {
  constructor(origin) {
    this.origin = origin;
    this.segments = [];

    this.lengths = [120, 100, 80];
    this.angles = [PI / 2, PI / 2, PI / 2];
    this.aVelocities = [0, 0, 0];
    this.aAccelerations = [0, 0, 0];
    this.damping = 0.995;
    this.gravity = 1;

    this.segments = [
      new PendulumSegment(origin, this.lengths[0], this.angles[0]),
      new PendulumSegment(createVector(), this.lengths[1], this.angles[1]),
      new PendulumSegment(createVector(), this.lengths[2], this.angles[2]),
    ];

    this.trail = [];
    this.maxTrailLength = 200;
    this.draggingSegment = -1;
  }

  update() {
    if (this.draggingSegment === -1) {
      this.physicsUpdate();
    } else {
      let dragged = this.segments[this.draggingSegment];
      let diff = p5.Vector.sub(createVector(mouseX, mouseY), dragged.origin);
      this.angles[this.draggingSegment] = atan2(diff.x, diff.y) - HALF_PI;
      this.segments[this.draggingSegment].angle = this.angles[this.draggingSegment];
      this.aVelocities[this.draggingSegment] = 0; // reset velocity when dragging
    }

    this.segments[0].update(this.origin);
    this.segments[1].update(this.segments[0].position);
    this.segments[2].update(this.segments[1].position);

    this.trail.push(this.segments[2].position.copy());
    if (this.trail.length > this.maxTrailLength) this.trail.shift();
  }

  physicsUpdate() {
    let [a1, a2, a3] = this.angles;
    let [v1, v2, v3] = this.aVelocities;
    let g = this.gravity;
    let [l1, l2, l3] = this.lengths;


    let num1 = -g * (2) * sin(a1);
    let num2 = -g * sin(a1 - 2 * a2);
    let num3 = -2 * sin(a1 - a2);
    let den = l1 * (2 - cos(2 * a1 - 2 * a2));

    let aAcc1 = (num1 + num2 + num3) / den;

    let aAcc2 = (-g / l2) * sin(a2);
    let aAcc3 = (-g / l3) * sin(a3);

    this.aAccelerations[0] = aAcc1;
    this.aAccelerations[1] = aAcc2;
    this.aAccelerations[2] = aAcc3;

    for (let i = 0; i < 3; i++) {
      this.aVelocities[i] += this.aAccelerations[i];
      this.aVelocities[i] *= this.damping;
      this.angles[i] += this.aVelocities[i];
      this.segments[i].angle = this.angles[i];
    }
  }

  display() {
    noFill();
    stroke(200, 50, 50, 150);
    strokeWeight(2);
    beginShape();
    for (let v of this.trail) {
      vertex(v.x, v.y);
    }
    endShape();

    // Draw segments with distinct colors
    this.segments[0].display(color(100, 100, 255));
    this.segments[1].display(color(100, 200, 100));
    this.segments[2].display(color(255, 100, 100));
  }

  tryDrag(mx, my) {
    // Check if mouse is near any bob, allow dragging that segment
    for (let i = 0; i < this.segments.length; i++) {
      let d = dist(mx, my, this.segments[i].position.x, this.segments[i].position.y);
      if (d < 20) {
        this.draggingSegment = i;
        break;
      }
    }
  }

  stopDrag() {
    this.draggingSegment = -1;
  }
}

