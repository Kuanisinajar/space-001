var windowWidth = window.innerWidth;
var canvasWidth = windowWidth * 0.67;
var canvasHeight = canvasWidth * 0.67;

var stars = [];
var numOfStars = 300;
var sampleList = [];

// Colors 
var colorSet = [];
colorSet[0] = [];
colorSet[1] = [];
colorSet[2] = [];
colorSet[3] = [];


function preload() {
    // preLoad is a p5 function
    sampleList[0] = loadSound("./data/main_kepler_star_KIC12268220C.mp3");
    sampleList[1] = loadSound("./data/eKick.mp3");
    sampleList[2] = loadSound("./data/countDown.mp3");
    sampleList[3] = loadSound("./data/perc01.mp3");
    sampleList[4] = loadSound("./data/dKick.mp3");
    sampleList[5] = loadSound("./data/sun_sonification.mp3");
    sampleList[6] = loadSound("./data/dBell.mp3");
    sampleList[7] = loadSound("./data/main_kepler_star.mp3");
}

function setup() {
    createCanvas(canvasWidth, canvasHeight, P2D);


    // Colors 
    colorSet[0][0] = color(0, 0, 0);
    colorSet[0][1] = color(255, 255, 255);
    colorSet[1][0] = color(47, 44, 180);
    colorSet[1][1] = color(225, 24, 154);
    colorSet[2][0] = color(44, 166, 220);
    colorSet[2][1] = color(223, 225, 48);
    colorSet[3][0] = color(201, 29, 69);
    colorSet[3][1] = color(64, 34, 125);

    // Initiate Stars
    for (var i = 0; i < numOfStars; i++) {
        stars[i] = new Star();
    }

}

function draw() {
    background(stars[0].darkColor);
    translate(width / 2, height / 2);
    for (var i = 0; i < numOfStars; i++) {
        stars[i].show();
    }
    for (var i = 0; i < numOfStars; i++) {
        stars[i].update();
    }
}

function keyPressed() {
    if (keyCode == 81) {
        sampleList[2].stop();
        sampleList[2].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].changeColorSet();
        }

    }
    if (keyCode == 87) {
        sampleList[3].stop();
        sampleList[3].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].toggleLine();
        }
    }
    if (keyCode == 69) {
        sampleList[6].stop();
        sampleList[6].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].vibrate();
        }
    }
    if (keyCode == 82) {
        sampleList[0].stop();
        sampleList[0].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].colorReverse();
        }
    }
    if (keyCode == 65) {
        sampleList[1].stop();
        sampleList[1].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].changeSize();
        }
    }
    if (keyCode == 83) {
        sampleList[4].stop();
        sampleList[4].play();
        for (var i = 0; i < 11; i++) {
            var tempX = stars[floor(random(0, stars.length - 1))].x;
            var tempY = stars[floor(random(0, stars.length - 1))].y;
            stars[i].messUp(tempX, tempY);
        }
    }
    if (keyCode == 68) {
        sampleList[5].stop();
        sampleList[5].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].boost();
        }
    }
    if (keyCode == 70) {
        sampleList[7].stop();
        sampleList[7].play();
        for (var i = 0; i < stars.length; i++) {
            stars[i].beOutline();
        }
    }

}