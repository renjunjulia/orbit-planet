let planets = [];
let orbitRadii = [];
let numOfPlanets = 6;
let speed = 0.001;
let minPlanetRadius = 5;
let maxPlanetRadius = 20;
let sunRadius = 20;

function setup() {
  createCanvas(400, 400);
  generateOrbitRadii();
  generatePlanets();
}

function draw() {
  if (focused || frameCount < 30) {
    background(0);
    translate(width / 2, height / 2);
    drawSun();
    drawAllOrbits();
    moveAllPlanets();
    drawAllPlanets();
  } else {
    drawUnpauseInstructions();
  }
}

function drawUnpauseInstructions() {
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text('click to activate', width / 2, height - height / 5);
}

function generatePlanets() {
  for (let i = 0; i < numOfPlanets; i++) {
    if (i == 0) {
      planets.push(new Planet(orbitRadii[i], sunRadius, orbitRadii[i + 1]));
    } else if (i < numOfPlanets - 1) {
      planets.push(new Planet(orbitRadii[i], orbitRadii[i - 1], orbitRadii[i + 1]));
    } else {
      planets.push(new Planet(orbitRadii[i], orbitRadii[i - 1], orbitRadii[i] * 2));
    }
  }
}

// ensures radi don't overlap and are evenly spaced
function generateOrbitRadii() {
  let previousRadius = sunRadius;
  let numOfPlanetsRemaining = numOfPlanets;
  let minOrbitForNextPlanet = previousRadius + minPlanetRadius;
  let availableSpaceForNextOrbit = width / 2 - previousRadius;
  let maxOrbitForNextPlanet = (availableSpaceForNextOrbit / numOfPlanetsRemaining) + previousRadius;
  for (let i = numOfPlanets; i > 0; i--) {
    orbitRadii.push(random(minOrbitForNextPlanet, maxOrbitForNextPlanet));
    previousRadius = orbitRadii[orbitRadii.length - 1];
    // numOfPlanetsRemaining -= 1;
    minOrbitForNextPlanet = previousRadius + minPlanetRadius;
    availableSpaceForNextOrbit = width / 2 - previousRadius;
    maxOrbitForNextPlanet = (availableSpaceForNextOrbit / i) + previousRadius;
  }
  print(orbitRadii);
}

function drawAllPlanets() {
  for (let planet of planets) {
    planet.draw();
  }
}

function moveAllPlanets() {
  for (let planet of planets) {
    planet.move();
  }
}

function drawSun() {
  fill(253, 184, 19); // sun yellow/orange
  noStroke();
  circle(0, 0, sunRadius * 2);
}

function drawAllOrbits() {
  for (let planet of planets) {
    planet.drawOrbit();
  }
}

function isHovered() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return true;
  } else {
    noStroke();
    fill(255);
    textAlign(CENTER);
    text('mouseover canvas to activate', width / 2, height - 30);
    return false;
  }
}