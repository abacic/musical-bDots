let img;
let myMobileNet;
let smallPoint, largePoint;
let osc;
let canvas;

function preload() {
  img = loadImage('myAnimal.jpg');
}

function setup() {
  canvas = createCanvas(720, 400);
  canvas.parent('container')
  // point numbers determines the key music note - these numbers can be changed
  smallPoint = 30;
  largePoint = 80;
  imageMode(CENTER);
  noStroke();
  background(128);
  // number in brackets below determine how fast each dot is played
  frameRate(50);
  img.loadPixels();
  
      // A triangle oscillator
    osc = new p5.TriOsc();
    // Start silent
    osc.start();
    osc.amp(0);
}

function drawPoints(){
   let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
  // note will play the x coordinate measured above at a speed of 3000 milliseconds, or 3 seconds
  playNote(x, 3000)
}

function draw() {
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
  // note will play the x coordinate measured above at a speed of 3000 milliseconds, or 3 seconds
  playNote(x, 3000)
}

// canvas seems to be wiped clean of dots when its resized and begin again
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawPoints();
  }

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we set a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}
