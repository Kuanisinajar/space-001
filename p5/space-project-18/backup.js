class Star {
    constructor() {
  
      // Calculating x and y and Speed
      this.distance = random(0, displayWidth);
      this.angle = random(0, 360);
      this.moveSpeed = 1;
      this.boost = 0;
      this.isBoosting = false;
  
      // Position
      this.x = this.distance * cos(this.angle);
      this.y = this.distance * sin(this.angle);
      this.px = this.x;
      this.py = this.y;
  
      // radius of dot
      this.r = 2;
  
      // Colors
      this.colorSet = [];
      this.colorSet[0] = [];
      this.colorSet[1] = [];
      this.colorSet[2] = [];
      this.colorSet[3] = [];
      this.colorSet[0][0] = color(0, 0, 0);
      this.colorSet[0][1] = color(255, 255, 255);
      this.colorSet[1][0] = color(47, 44, 180);
      this.colorSet[1][1] = color(225, 24, 154);
      this.colorSet[2][0] = color(44, 166, 220);
      this.colorSet[2][1] = color(223, 225, 48);
      this.colorSet[3][0] = color(201, 29, 69);
      this.colorSet[3][1] = color(64, 34, 125);
  
      this.colorIndex = 0;
      this.darkColor = this.colorSet[0][0];
      this.brightColor = this.colorSet[0][1];
      this.reverseColor = false;
  
      // still star
      this.scatterX = [];
      this.scatterY = [];
  
      // Line or Dot
      this.isLine = true;
  
      // Vibrate 
      this.isVibrating = false;
      this.vLevel = 6;
  
      // Outline or Solid
      this.isOutline = false;
    }
  
    update() {
      this.distance += this.moveSpeed + this.boost;
      this.x = this.distance * cos(this.angle);
      this.y = this.distance * sin(this.angle);
      this.r += 0.03;
      this.px += this.distance * cos(this.angle) * 0.1;
      this.py += this.distance * sin(this.angle) * 0.1;
      // Initiate if out of screen
      if (this.x > displayWidth || this.x < -displayWidth || this.y > displayHeight || this.y < -displayHeight) {
        this.r = 2;
        this.distance = random(0, displayWidth / 2);
        this.angle = random(0, 360);
        this.x = this.distance * cos(this.angle);
        this.y = this.distance * sin(this.angle);
        this.px = this.x;
        this.py = this.y;
      }
  
      // boost 
      if (this.isBoosting) {
        this.boost += 0.2;
        if (this.boost > 11) {
          this.boost = 0;
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
    }
  
    show() {
  
      if (this.isLine) {
        if (this.isOutline) {
          dottedLine(this.x, this.y, this.px, this.py, 40);
        } else {
          stroke(this.brightColor);
          strokeWeight(this.r / 6);
          line(this.x, this.y, this.px, this.py);
        }
      } else {
        if (this.isOutline) {
          noFill();
          stroke(this.brightColor);
          strokeWeight(this.r / 6);
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
      for (i = 0; i < 5; i++) {
        ellipse(this.scatterX[i], this.scatterY[i], 1, 1);
      }
    }
  
    changeColorSet() {
      this.colorIndex += 1;
      if (this.colorIndex > this.colorSet.length - 1) {
        this.colorIndex = 0;
      }
      if (this.reverseColor) {
        this.darkColor = this.colorSet[this.colorIndex][1];
        this.brightColor = this.colorSet[this.colorIndex][0];
      } else {
        this.darkColor = this.colorSet[this.colorIndex][0];
        this.brightColor = this.colorSet[this.colorIndex][1];
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
      this.r = this.r * 1.2;
    }
  
    boost() {
      this.isBoosting = true;
    }
  
    vibrate() {
      this.isVibrating = false;
      this.isVibrating = true;
    }
  
    beOutline() {
      this.isOutline = !this.isOutline;
    }
  
    dottedLine(x1, y1, x2, y2, steps) {
      for (i = 0; i <= steps; i++) {
        var xx = lerp(x1, x2, i / steps);
        var yy = lerp(y1, y2, i / steps);
        noStroke();
        ellipse(xx, yy, this.r / 2, this.r / 2);
      }
    }
  
  }
  