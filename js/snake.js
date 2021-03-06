class Snake {
  constructor(direction, segments) {
    this.direction = direction; // ["N", "E", "S", "W"]
    this.segments = segments; // grid coordinates
    this.head = this.segments[0];
    this.appleCounter = 0;
  }

  move() {
    const head = this.segments[0];
    // debugger
    if (this.direction === "N") {
      this.segments.unshift([head[0] - 1, head[1]]);
    } else if (this.direction === "S") {
      this.segments.unshift([head[0] + 1, head[1]]);
    } else if (this.direction === "W") {
      this.segments.unshift([head[0], head[1] - 1]);
    } else {
      this.segments.unshift([head[0], head[1] + 1]);
    }
    if (this.appleCounter > 0) {
      this.appleCounter--;
    } else {
      this.segments.pop();
    }
    this.head = this.segments[0];
  }

  turn(direction) {
    if (direction === null) {
      return false;
    }

    this.direction = direction;
  }

  eat() {
    this.appleCounter+=3
  }

}


module.exports = Snake;
