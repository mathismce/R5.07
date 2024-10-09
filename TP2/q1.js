const deltaT = 0.1;
const gravity = 1;
const damping = 0.99;
const stiffness = 0.99;
const friction = 0.005;
const maxVel = 150;

// let maMass; 
let masses = []

function setup() {
	createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        masses.push(new Mass(random(width), random(height)));
      };
}


function draw() {
	background(255);
    for (let mass of masses) {
        mass.updatePosition();
        mass.display();
    }
}
