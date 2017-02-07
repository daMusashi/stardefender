function Enemy(x, y, speed, star) {
    this.star = star;
    this.pos = new Vector(x, y);
    this.size = 2;
    this.speed = speed;

    //var ang = this.pos.angleBetween(this.star.pos);

    this.forces = []; // fylls utifrån med addForce och påverkar pos i update() . Resetas efter användning i update(), måste fyllas på inför varje update();

    this.damage = SDCONFIG.enenmyDamage;

    /*this.vel = new Vector();
    this.vel.length = speed;
    this.vel.angle = ang;

    this.vel = Vector.minus(this.star.pos, this.pos);
    this.vel.length = speed;*/

    this.status = "normal"; // normal: mot star, dying: die-anim, fool: mot proxy-bomb, impact: star-krock-anim, dead: väntar på att tas bort av swarm

    this.isTargeted = false; // om under beskjutning sätts av laser
    this.inTriggerRange = false; // om i en lasers triggerzone, används för debug

    this.distanceToStar = 2000; // sätts/uppdaertas av update och används för sortering av enemy-listan i swarm (närmast star först)

    // anims
    this.enemiesImpactIndex = 0;
    this.enemiesDieIndex = 0;

    // handlers
    this.dieHandlers = new HandlerStack(); // när enemies dör (blir träffade av spelare)
    this.impactHandler = new Handler(); // när enemies träffas star och ger damage (+ ev andra händelser då enemy krockar med damage)
    this.removeMeHandler = new Handler(); // handler som tar bort enemy från draw-list (SwarmControl har den)

    this.debug = {};
    this.debug.forces = {};
    this.debug.forces.total = new Vector();
    this.debug.forces.forces = new Vector();
    this.debug.forces.speed = new Vector();
}

Enemy.prototype.addForce = function(force){ // polär force-vector
    this.forces.push(force);
}

Enemy.prototype.kill = function(){
    this.removeMeHandler.handlerCall(this);
};

Enemy.prototype.update = function(){
    if(this.status == "normal" || this.status == "fool"){

        var speed = Vector.minus(this.star.pos, this.pos);
        speed.length = this.speed;

        // Lägger på forces (från Magnets)
        var forces = new Vector();
        for(var i = 0; i < this.forces.length; i++){
            var f = this.forces[i];
            forces.x += f.x;
            forces.y += f.y;
        }

        var velocity = new Vector(speed.x + forces.x, speed.y + forces.y);

        this.pos.x += velocity.x;
        this.pos.y += velocity.y;

        // kollar out-of-bounds SDCONFIG.swarmSpawnLength
        if(Vector.distance(this.pos, this.star.pos) > SDCONFIG.swarmOutOfBounds){
            //console.log("ENEMY OUT-OF-BOUNDS");
            this.status = "dead";
            this.removeMeHandler.handlerCall(this);
        }
        // kolla star-krock
        if(Vector.distance(this.pos, this.star.pos) < this.star.size/2){
            //console.log("ENEMY IMPACT");
            this.status = "impact";
            this.impactHandler.handlerCall(this);
        }

        this.distanceToStar = Vector.distance(this.pos, this.star.pos) - this.star.size/2;
    }

    this.debug.forces.total = velocity;
    this.debug.forces.forces = forces;
    this.debug.forces.speed = speed;

    this.forces = [];
};

Enemy.prototype.draw = function(drawOptions){

    if(drawOptions.debug) {
        var velMagnify = 100;
        // total
        stroke("#fff");
        line(this.pos.x, this.pos.y, this.pos.x + this.debug.forces.total.x*velMagnify, this.pos.y + this.debug.forces.total.y*velMagnify);
        // speed
        stroke("green");
        line(this.pos.x, this.pos.y, this.pos.x + this.debug.forces.speed.x*velMagnify, this.pos.y + this.debug.forces.speed.y*velMagnify);
        // forces (magnets)
        stroke("red");
        line(this.pos.x, this.pos.y, this.pos.x + this.debug.forces.forces.x*velMagnify, this.pos.y + this.debug.forces.forces.y*velMagnify);
    }

    switch(this.status) {
        case "impact":
            // impact anim
            if(this.enemiesImpactIndex < SDCONFIG.enemiesImpactLength){

                var impactSize = (SDCONFIG.enemiesImpactSize / SDCONFIG.enemiesImpactLength) * this.enemiesImpactIndex;
                var impactAlfaStroke = 255 * (this.enemiesImpactIndex / SDCONFIG.enemiesImpactLength);
                var impactAlfaFill = 255 - impactAlfaStroke;

                strokeWeight(SDCONFIG.enemiesImpactStroke);

                stroke(SDCONFIG.enemiesImpactColorStroke[0], SDCONFIG.enemiesImpactColorStroke[1], SDCONFIG.enemiesImpactColorStroke[2], impactAlfaStroke);
                fill(SDCONFIG.enemiesImpactColorFill[0], SDCONFIG.enemiesImpactColorFill[1], SDCONFIG.enemiesImpactColorFill[2], impactAlfaFill);
                ellipse(this.pos.x, this.pos.y, impactSize, impactSize);

                this.enemiesImpactIndex++;
            } else {
                // remove
                this.removeMeHandler.handlerCall(this);
            }
            break;
        default:
            /*strokeWeight(1);
            stroke(60, 60, 60, 50);
            line(this.pos.x, this.pos.y, this.star.pos.x, this.star.pos.y);
            */

            noStroke();
            fill(255);
            if(drawOptions.debug) {
                if(this.isTargeted) {
                    fill(255, 0, 0);
                }
                if(this.inTriggerRange) {
                    fill(109, 255, 5);
                }
            }
            ellipse(this.pos.x, this.pos.y, this.size, this.size);

    }
};




