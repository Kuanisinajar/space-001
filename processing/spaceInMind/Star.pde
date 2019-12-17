class Star {
  float x;
  float y;
  float px;
  float py;

  // Calculating x and y and Speed
  float distance;
  float angle;
  float moveSpeed = 1;
  float boost = 0;
  Boolean isBoosting = false;

  // radius of dot
  float r = 2;

  // Colors
  color[][] set = new color[4][2];
  int colorIndex = 0;
  color darkColor;
  color brightColor;
  Boolean reverseColor = false;

  // still star
  float[] scatterX = new float[5];
  float[] scatterY = new float[5];

  // Line or Dot
  Boolean isLine = true;

  // Vibrate 
  Boolean isVibrating = false;
  float vLevel = 6;

  // Outline or Solid
  Boolean isOutline = false;



  Star() {
    distance = random(0, width/2);
    angle = random(0, 360);
    x = distance * cos(angle);
    y = distance * sin(angle);
    px = x;
    py = y;
    for (int i = 0; i < scatterX.length; i++) {
      scatterX[i] = random(-width, width);
      scatterY[i] = random(-height, height);
    }

    // Color Set 
    set[0][0] = color(0, 0, 0);
    set[0][1] = color(255, 255, 255);
    set[1][0] = color(47, 44, 180);
    set[1][1] = color(225, 24, 154);
    set[2][0] = color(44, 166, 220);
    set[2][1] = color(223, 225, 48);
    set[3][0] = color(201, 29, 69);
    set[3][1] = color(64, 34, 125);
    brightColor = set[0][1];
    darkColor = set[0][0];
  }

  void update() {
    distance += moveSpeed + boost;
    x = distance * cos(angle);
    y = distance * sin(angle);
    r += 0.03;
    px += distance * cos(angle) * 0.1;
    py += distance * sin(angle) * 0.1;
    // Initiate if out of screen
    if (x > width || x < -width || y > height || y < -height) {
      r = 2;
      distance = random(0, width/2);
      angle = random(0, 360);
      x = distance * cos(angle);
      y = distance * sin(angle);
      px = x;
      py = y;
    }

    // boost 
    if (isBoosting) {
      boost += 0.2;
      if (boost > 11) {
        boost = 0;
        isBoosting = false;
      }
    }

    // Vibrate
    if (isVibrating) {
      x += random(-vLevel, vLevel);
      vLevel -=0.1;
      if (vLevel < 0) {
        isVibrating = false;
        vLevel = 6;
      }
    }
  }

  void show() {

    if (isLine) {
      if (isOutline) {
        dottedLine(x, y, px, py, 40);
      } else {
        stroke(brightColor);
        strokeWeight(r/6);
        line(x, y, px, py);
      }
    } else {
      if (isOutline) {
        noFill();
        stroke(brightColor);
        strokeWeight(r/6);
        ellipse(x, y, r, r);
      } else {
        fill(brightColor);
        noStroke();
        ellipse(x, y, r, r);
      }
    }

    //random scatter star
    fill(brightColor);
    noStroke();
    for (int i = 0; i < 5; i++) {
      ellipse(scatterX[i], scatterY[i], 1, 1);
    }
  }

  void changeColorSet() {
    colorIndex += 1;
    if (colorIndex > set.length-1) {
      colorIndex = 0;
    }
    if (reverseColor) {
      darkColor = set[colorIndex][1];
      brightColor = set[colorIndex][0];
    } else {
      darkColor = set[colorIndex][0];
      brightColor = set[colorIndex][1];
    }
  }

  void colorReverse() {
    reverseColor = !reverseColor;
    color temp = brightColor;
    brightColor = darkColor;
    darkColor = temp;
    
  }

  void toggleLine() {
    isLine = !isLine;
  }

  void changeSize() {
    r = r*1.2;
  }

  void boost() {
    isBoosting = true;
  }

  void vibrate() {
    isVibrating = false;
    isVibrating = true;
  }

  void beOutline() {
    isOutline = !isOutline;
  }

  void dottedLine(float x1, float y1, float x2, float y2, float steps) {
    for (int i=0; i<=steps; i++) {
      float xx = lerp(x1, x2, i/steps);
      float yy = lerp(y1, y2, i/steps);
      noStroke();
      ellipse(xx, yy, r/2, r/2);
    }
  }
}
