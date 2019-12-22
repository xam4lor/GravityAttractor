class Particle {
    constructor(mass, isStatic, x0, y0, vx0, vy0, r, g, b, a, showTrack) {
        this.mass = mass;

        this.pos = new Vector(x0 , y0 );
        this.vel = new Vector(vx0, vy0);
        this.acc = new Vector(0  , 0);

        this.color    = {r:Math.round(r), g:Math.round(g), b:Math.round(b), a:1};
        this.isStatic = isStatic;

        this.showTrack = showTrack;
        this.track     = [];
    }



    update(dt, everyObjects) {
        // If same object, return
        if(this.isStatic) return;

        // Update position
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        // Calculate new velocity and acceleration
        this.acc.set(0, 0);
        for (let i = 0; i < everyObjects.length; i++) {
            if (everyObjects[i] == this) continue;

            let d    = Vector.dist(this.pos, everyObjects[i].pos);
            this.acc.add(Vector
                    .sub(this.pos, everyObjects[i].pos)
                    .div  (d * d * d)
                    .mult (-1/2 * getCustomConfig().constants.G * everyObjects[i].mass)
            );
        }
        this.vel.add(this.acc.limit(0, 1000).mult(dt));

        // Handle the track of the motion of the Particle
        if(this.showTrack) {
            this.track.push({x: this.pos.x, y: this.pos.y});

            if(this.track.length > getCustomConfig().trackLength)
                this.track.shift();
        }
    }

    draw(drawer) {
        let md = Math.log(this.mass * getCustomConfig().massDrawSize + 1);
        drawer
            .noStroke()
            .fill(this.color.r, this.color.g, this.color.b, this.color.a)
            .ellipse(this.pos.x, this.pos.y, md, md);

        for (let i = 0; i < this.track.length; i++) {
            if(this.track[i + 1] == undefined) continue;

            let a = 1 - (this.track.length - i) / this.track.length - 0.3;
            if(a <= 0.01) a = 0.01;
            drawer
                .noFill()
                .stroke(this.color.r, this.color.g, this.color.b, a)
                .line(this.track[i].x, this.track[i].y, this.track[i + 1].x, this.track[i + 1].y);
        }
    }
}
