function Enemy(x, y, speed, star) {
    this.star = star;
    this.pos = new Vector(x, y);
    this.size = 2;

    var ang = this.pos.angleBetween(this.star.pos);

    this.damage = SDCONFIG.enenmyDamage;

    this.vel = new Vector();
    this.vel.length = speed;
    this.vel.angle = ang;

    this.vel = Vector.minus(this.star.pos, this.pos);
    this.vel.length = speed;

    this.status = "normal"; // normal: mot star, dying: die-anim, fool: mot proxy-bomb, impact: star-krock-anim, dead: väntar på att tas bort av swarm

    this.isTargeted = false; // om under beskjutning sätts av laser
    this.inTriggerzone = false; // om i en lasers triggerzone, används för debug

    this.distanceToStar = 2000; // sätts/uppdaertas av update och används för sortering av enemy-listan i swarm (närmast star först)

    // anims
    this.enemiesImpactIndex = 0;
    this.enemiesDieIndex = 0;

    // handlers
    this.dieHandlers = new HandlerStack(); // när enemies dör (blir träffade av spelare)
    this.impactHandler = new Handler(); // när enemies träffas star och ger damage (+ ev andra händelser då enemy krockar med damage)
    this.removeMeHandler = new Handler(); // handler som tar bort enemy från draw-list (Swarm har den)


}

Enemy.prototype.kill = function(){
    this.removeMeHandler.handlerCall(this);
};

Enemy.prototype.update = function(){
    if(this.status == "normal" || this.status == "fool"){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

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
};

Enemy.prototype.draw = function(drawOptions){

    if(drawOptions.debug) {
        var velMagnify = 20;
        stroke(229, 66, 244, 50);
        line(this.pos.x, this.pos.y, this.pos.x + this.vel.x*velMagnify, this.pos.y + this.vel.y*velMagnify);
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
                if(this.inTriggerzone) {
                    fill(109, 255, 5);
                }
            }
            ellipse(this.pos.x, this.pos.y, this.size, this.size);

    }
};




