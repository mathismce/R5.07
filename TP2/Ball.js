class Ball {
    constructor(x, y, segment, radius) {
        this.center = createVector(x, y);
        this.masses = [];
        this.springs = [];
        this.radius = radius;

        for (let i = 0; i < segment; i++) {
            let angle = i * (2.0 * Math.PI / segment);
            let x = this.center.x + radius * Math.cos(angle);
            let y = this.center.y + radius * Math.sin(angle);

            this.masses.push(new Mass(x, y));
        }

        for (let i = 0; i < this.masses.length; i++) {
            for (let j = i + 1; j < this.masses.length; j++) {
                this.springs.push(new Spring(this.masses[i], this.masses[j]));
            }
        }

    }

    updateMasses() {
        for (let mass of this.masses) {
            mass.updatePosition();

        }
        this.center = createVector(0, 0);
        for (let mass of this.masses) {
            this.center.add(mass.position);
        }
        this.center.div(this.masses.length);
    }

    checkCollisionWithBox(x, y, width, height) {
        for (let mass of this.masses) {
            mass.checkCollisionWithBox(x, y, width, height);
        }
    }

    checkCollisionBalls(balls) {
        for (let otherBall of balls) {

            if (this === otherBall) {
                continue;
            }

            let distance = this.center.copy().sub(otherBall.center).mag();

            if (distance > (this.radius + otherBall.radius)) {
                continue;
            }


            for (let m of this.masses) {

                let d = m.position.copy();
                d.sub(otherBall.center);
                if (d.mag() < otherBall.radius) {
                    m.velocity.add(d);
                    d.normalize();
                    d.mult(otherBall.radius);
                    d.add(otherBall.center);
                    m.position = d.copy();
                }

            }
        }
    }

    updateSprings() {
        for (let s of this.springs) {
            s.applyConstraint();
        }
    }

    display() {
        for (let mass of this.masses) {
            mass.display();
        }

        for (let s of this.springs) {
            s.display();
        }
    }

}