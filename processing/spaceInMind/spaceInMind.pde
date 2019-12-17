import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.effects.*;
import ddf.minim.signals.*;
import ddf.minim.spi.*;
import ddf.minim.ugens.*;



// VISUAL DECLARE
Star[] stars = new Star[300];

// AUDIO  DECLARE
Minim minim;
AudioPlayer[] mySampleList;

void setup(){
  size(1200, 800);
  for (int i = 0; i< stars.length; i++){
    stars[i] = new Star();
  }
  
  minim = new Minim(this);
  mySampleList = new AudioPlayer[8];
  mySampleList[0] = minim.loadFile("main_kepler_star_KIC12268220C.mp3");
  mySampleList[1] = minim.loadFile("eKick.mp3");
  mySampleList[2] = minim.loadFile("countDown.mp3");
  mySampleList[3] = minim.loadFile("perc01.mp3");
  mySampleList[4] = minim.loadFile("dKick.mp3");
  mySampleList[5] = minim.loadFile("sun_sonification.mp3");
  mySampleList[6] = minim.loadFile("dBell.mp3");
  mySampleList[7] = minim.loadFile("main_kepler_star.mp3");

}

void draw(){
  background(stars[0].darkColor);
  translate(width/2, height/2);
  for (int i = 0; i< stars.length; i++) {
    stars[i].show();
  }
  for (int i = 0; i< stars.length; i++) {
    stars[i].update();
  }

}

void keyPressed(){
  if (key == 'q' || key =='Q') {
    mySampleList[2].rewind();
    mySampleList[2].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].changeColorSet();
    }
    
  }
  if (key == 'w' || key =='W') {
    mySampleList[3].rewind();
    mySampleList[3].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].toggleLine();
    }
  }
  if (key == 'e' || key =='E') {
    mySampleList[6].rewind();
    mySampleList[6].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].vibrate();
    }
  }
  if (key == 'r' || key =='R') {
    mySampleList[0].rewind();
    mySampleList[0].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].colorReverse();
    }
  }
  if (key == 'a' || key =='A') {
    mySampleList[1].rewind();
    mySampleList[1].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].changeSize();
    }
  }
  if (key == 's' || key =='S') {
    mySampleList[4].rewind();
    mySampleList[4].play();
    for(int i = 0; i < 21; i++){
      stroke(stars[0].brightColor);
      strokeWeight(1);
      float x1 = stars[floor(random(0, stars.length-1))].x;
      float x2 = stars[floor(random(0, stars.length-1))].x;
      float y1 = stars[floor(random(0, stars.length-1))].y;
      float y2 = stars[floor(random(0, stars.length-1))].y;
      line(x1, y1, x2, y2);
    }
  }
  if (key == 'd' || key =='D') {
    mySampleList[5].rewind();
    mySampleList[5].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].boost();
    }
  }
  if (key == 'f' || key =='F') {
    mySampleList[7].rewind();
    mySampleList[7].play();
    for(int i = 0; i < stars.length; i++) {
      stars[i].beOutline();
    }
  }

}
