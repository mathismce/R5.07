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
    
    let radius = 100;
    let centerX = Math.random() * windowWidth;
    let centerY = Math.random() * windowHeight;
    let segments = 20;
    
    for (let i = 0; i < segments; i++) {
      let angle = i * (2.0 * Math.PI / segments);
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      
      masses.push(new Mass(x, y));
    }
    
    for (let i = 0; i < segments; i++) {
      for (let j = i + 1; j < segments; j++) {
        springs.push(new Spring(masses[i], masses[j]));
      }
    }

    
    // for (let i = 0; i < 2; i++) {
    //   let m1 = new Mass(Math.random() * windowWidth, Math.random() * windowHeight);
    //   let m2 = new Mass(Math.random() * windowWidth, Math.random() * windowHeight);
      
    //   springs.push(new Spring(m1, m2));
    // }
  }
  
function mousePressed(){

    for(let m of masses){

        let p = m.position.copy(); 
        p.sub(createVector(mouseX, mouseY)); 
        p.normalize(); 
        p.mult(100);
        m.velocity.sub(p)
    }
}


function draw() {
	background(255);

  
    for (let mass of masses) {
        mass.updatePosition();
    }

    for (let mass of masses) {
      mass.checkCollisionWithBox(width/2 - 100, height - 200, width/2 + 100, height);
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
