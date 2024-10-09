const deltaT = 0.1;
const gravity = 1;
const damping = 0.99;
const stiffness = 0.99;
const friction = 0.005;
const maxVel = 150;

// let maMass; 
let masses = []; 
let springs = [];
let balls = [];

function createCircle(centerX, centerY, radius, segments) {
    let c0 = masses.length;
    for (let i = 0; i < segments; i++) {
        let angle = i * (2.0 * Math.PI / segments);
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        masses.push(new Mass(x, y));
    }

    let c1 = masses.length;

    for (let i = c0; i < c1; i++) {
        for (let j = i + 1; j < c1; j++) {
            springs.push(new Spring(masses[i], masses[j]));
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 100; i++) {
        let segment = Math.random() * 10 + 10;
        let radius = Math.random() * 50 + 4;
        balls.push(new Ball(Math.random() * windowWidth, Math.random() * windowHeight, segment, radius));
    }
}

  
function mousePressed(){

    for(let ball of balls){
        for(let m of ball.masses){
        let p = m.position.copy(); 
        p.sub(createVector(mouseX, mouseY)); 
        p.normalize(); 
        p.mult(100);
        m.velocity.sub(p)
    }
}
}


function draw() {
	background(255);

    for (let ball of balls) {
        ball.updateMasses();
    }

    for (let ball of balls) {
        ball.checkCollisionWithBox(width/2 - 100, height - 200, 200, 200);
    }

    for (ball of balls) {
        ball.checkCollisionBalls(balls);
    }

    for (ball of balls) {
        ball.updateSprings();
    }

  
    for (let ball of balls) {
        ball.display();
    }

    
    fill("white");
    rect(width/2 - 100, height - 200, 200, 200);
 
}
