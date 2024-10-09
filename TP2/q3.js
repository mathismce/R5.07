const deltaT = 0.1;
const gravity = 4;
const damping = 0.99;
const stiffness = 0.99;
const friction = 0.005;
const maxVel = 150;

// let maMass; 
let masses = []; 
let springs = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

    let size = 400;

    // 4 masses 
    let m1 = new Mass(width / 2 - size / 2, height / 2 - size / 2);
    let m2 = new Mass(width / 2 + size / 2, height / 2 - size / 2);
    let m3 = new Mass(width / 2 + size / 2, height / 2 + size / 2);
    let m4 = new Mass(width / 2 - size / 2, height / 2 + size / 2);

    masses.push(m1, m2, m3, m4);

    // ressorts des carrés
    springs.push(new Spring(m1, m2)); 
    springs.push(new Spring(m2, m3));
    springs.push(new Spring(m3, m4)); 
    springs.push(new Spring(m4, m1)); 

    // ressorts diagonaux
    springs.push(new Spring(m1, m3)); 
    springs.push(new Spring(m2, m4)); 
}

function draw() {
	background(255);

  
    for (let mass of masses) {
        mass.updatePosition();
    }


    for (let s of springs) {
       s.applyConstraint();
    }

    for (let mass of masses) {
        mass.display();
    }

  
    for (let s of springs) {
        s.display();
    }
}
