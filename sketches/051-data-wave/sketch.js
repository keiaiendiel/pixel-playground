// Title: Data Wave
// Date: 2023-11-20
// Category: geometry
// Inspired by kindl.work p5.js Editor (7-DHnL3ZL) - global temperature anomaly wave
// Rewritten without CSV dependency: generates synthetic climate-like data

p5.disableFriendlyErrors = true;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const NUM_BARS = 143; // 1880-2022
let values = [];
let waveOffset = 0;

function setup() {
  pixelDensity(1);
  noiseSeed(42);
  createCanvas(windowWidth, windowHeight);
  frameRate(isMobile ? 30 : 60);

  // Generate synthetic temperature anomaly curve (rising trend with noise)
  for (let i = 0; i < NUM_BARS; i++) {
    const t = i / NUM_BARS;
    const trend = -0.2 + t * t * 1.3; // accelerating rise
    const noise_val = (noise(i * 0.1) - 0.5) * 0.3;
    values.push(trend + noise_val);
  }

  if (parent !== window) parent.postMessage({ type: 'ready' }, '*');
}

function draw() {
  background(0);

  const barW = width / NUM_BARS;
  const amplitude = height * 0.3;

  for (let i = 0; i < NUM_BARS; i++) {
    const val = values[i];
    const normalized = map(val, -0.25, 1, 0, 1);

    // Wave motion
    const wave = Math.sin(waveOffset + i * 0.02) * amplitude;
    const y = height / 2 + wave * normalized;

    // Monochrome: cold = dim, warm = bright
    const brightness = Math.floor(40 + normalized * 188);

    fill(brightness);
    noStroke();
    rectMode(CORNER);
    const barH = barW * 0.5 + normalized * height * 0.3;
    rect(i * barW, y, barW, barH, 2);
  }

  // Year label
  const mouseYear = Math.floor(map(mouseX, 0, width, 1880, 2023));
  const idx = constrain(mouseYear - 1880, 0, NUM_BARS - 1);
  fill(201, 168, 76);
  noStroke();
  textSize(10);
  textFont('monospace');
  textAlign(CENTER);
  text(mouseYear, mouseX, height - 20);

  // Indicator line
  stroke(201, 168, 76, 80);
  strokeWeight(0.5);
  line(mouseX, 0, mouseX, height);

  waveOffset += 0.01;
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }
function touchStarted() { }
