// Title: Bezier Curves
// Date: 2024-02-12
// Category: flow
// Ported from kindl.work p5.js Editor (mBliasgJD)

p5.disableFriendlyErrors = true;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
let t = 0;

function setup() {
  pixelDensity(1);
  noiseSeed(Date.now());
  createCanvas(windowWidth, windowHeight);
  frameRate(isMobile ? 30 : 60);
  background(0);
  if (parent !== window) parent.postMessage({ type: 'ready' }, '*');
}

function draw() {
  background(0, 0, 0, 10);
  t += 0.005;

  const x1 = width * 2 * noise(t + 15) - width / 2;
  const x2 = width * 2 * noise(t + 25) - width / 2;
  const x3 = width * 2 * noise(t + 35) - width / 2;
  const x4 = width * 2 * noise(t + 45) - width / 2;
  const y1 = height * 2 * noise(t + 55) - height / 2;
  const y2 = height * 2 * noise(t + 65) - height / 2;
  const y3 = height * 2 * noise(t + 75) - height / 2;
  const y4 = height * 2 * noise(t + 85) - height / 2;

  const brightness = 80 + noise(t) * 148;
  noFill();
  stroke(brightness, brightness, brightness);
  strokeWeight(isMobile ? 6 : 10);
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
}

function mousePressed() {
  background(0);
  return false;
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); background(0); }
function touchStarted() { }
