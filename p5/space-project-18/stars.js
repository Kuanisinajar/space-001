class Star {
  constructor() {
    this.distance = random(0, width);
    this.angle = random(0, 360);
    this.moveSpeed = 1;
    this.boostSpeed = 0;
    this.isBoosting = false;

    // Position
    this.x = this.distance * cos(this.angle);
    this.y = this.distance * sin(this.angle);
    this.px = this.x;
    this.py = this.y;

    // Radius of dot
    this.initR = 4;
    this.r = this.initR;
    this.lineWeight = this.r / 4;
    // Colors
    this.colorIndex = 0;
    this.darkColor = colorSet[0][0];
    this.brightColor = colorSet[0][1];
    this.reverseColor = false;

    // Line or Dot
    this.isLine = true;

    // Vibrate 
    this.isVibrating = false;
    this.vLevel = 6;

    // Outline or Solid
    this.isOutline = false;

    // Mess up Line
    this.isMessUp = false;
    this.mx;
    this.my;
    this.messUpCounter = 15;

    // still star
    this.scatterX = [];
    this.scatterY = [];
    for (var i = 0; i < 5; i++) {
      this.scatterX[i] = random(-width, width);
      this.scatterY[i] = random(-height, height);
    }
  }

  show() {
    if (this.isLine) {
      if (this.isOutline) {
        this.dottedLine(this.x, this.y, this.px, this.py, 40, false);
      } else {
        stroke(this.brightColor);
        strokeWeight(this.lineWeight);
        line(this.x, this.y, this.px, this.py);
      }
    } else {
      if (this.isOutline) {
        noFill();
        stroke(this.brightColor);
        strokeWeight(this.lineWeight);
        ellipse(this.x, this.y, this.r, this.r);
      } else {
        fill(this.brightColor);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
      }
    }


    //random scatter star
    fill(this.brightColor);
    noStroke();
    for (var i = 0; i < 5; i++) {
      ellipse(this.scatterX[i], this.scatterY[i], random(1, 2), random(1, 2));
    }
  }

  update() {
    this.distance += this.moveSpeed + this.boostSpeed;
    this.x = this.distance * cos(this.angle);
    this.y = this.distance * sin(this.angle);
    this.r += 0.03;
    this.lineWeight = this.r / 4;
    this.px += this.distance * cos(this.angle) * 0.1;
    this.py += this.distance * sin(this.angle) * 0.1;
    // Initiate if out of screen
    if (this.x > width || this.x < -width || this.y > height || this.y < -height) {
      this.r = this.initR;
      this.lineWeight = this.r / 4;
      this.distance = random(0, width / 2);
      this.angle = random(0, 360);
      this.x = this.distance * cos(this.angle);
      this.y = this.distance * sin(this.angle);
      this.px = this.x;
      this.py = this.y;
    }

    // boost 
    if (this.isBoosting) {
      this.boostSpeed += 0.2;
      if (this.boostSpeed > 11) {
        this.boostSpeed = 0;
        this.isBoosting = false;
      }
    }

    // Vibrate
    if (this.isVibrating) {
      this.x += random(-this.vLevel, this.vLevel);
      this.vLevel -= 0.1;
      if (this.vLevel < 0) {
        this.isVibrating = false;
        this.vLevel = 6;
      }
    }

    // mess up line 
    if (this.isMessUp) {
      this.messUpCounter -= 1;
      if (this.messUpCounter === 0) {
        this.isMessUp = false;
      }

      if (this.isOutline && !this.isLine) {
        stroke(this.brightColor);
        strokeWeight(this.lineWeight);
        this.dottedLine(this.x, this.y, this.mx, this.my, 4, true);
      } else if (this.isOutline && this.isLine) {
        stroke(this.brightColor);
        strokeWeight(this.lineWeight);
        this.dottedLine(this.x, this.y, this.mx, this.my, 4, false);
      } else {
        stroke(this.brightColor);
        strokeWeight(this.lineWeight);
        line(this.x, this.y, this.mx, this.my);
      }
    }
  }

  changeColorSet() {
    this.colorIndex += 1;
    if (this.colorIndex > colorSet.length - 1) {
      this.colorIndex = 0;
    }
    if (this.reverseColor) {
      this.darkColor = colorSet[this.colorIndex][1];
      this.brightColor = colorSet[this.colorIndex][0];
    } else {
      this.darkColor = colorSet[this.colorIndex][0];
      this.brightColor = colorSet[this.colorIndex][1];
    }
  }

  colorReverse() {
    this.reverseColor = !this.reverseColor;
    var temp = this.brightColor;
    this.brightColor = this.darkColor;
    this.darkColor = temp;

  }

  toggleLine() {
    this.isLine = !this.isLine;
  }

  changeSize() {
    if (this.r > 16) {
      this.r = this.r * 0.7;
    } else if (this.r < 16) {
      this.r = this.r * 1.9;
    }
  }

  boost() {
    this.isBoosting = true;
  }

  vibrate() {
    this.isVibrating = false;
    this.isVibrating = true;
    this.vLevel += 3;
  }

  beOutline() {
    this.isOutline = !this.isOutline;
  }

  messUp(x, y) {
    this.isMessUp = true;
    this.mx = x;
    this.my = y;
    this.messUpCounter = 15;
  }

  dottedLine(x1, y1, x2, y2, steps, outLine) {
    for (var i = 0; i <= steps; i++) {
      var xx = lerp(x1, x2, i / steps);
      var yy = lerp(y1, y2, i / steps);
      if (outLine) {
        stroke(this.brightColor);
        strokeWeight(this.lineWeight);
        noFill();
        ellipse(xx, yy, this.r / 2, this.r / 2);
      } else {
        noStroke();
        ellipse(xx, yy, this.r / 2, this.r / 2);
      }
    }
  }


}