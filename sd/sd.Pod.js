function Pod(spawnAngle, star, player){
    this.star = star;
    this.player = player;

    this.haloPos = new Vector();
    this.haloPos.setPolar(spawnAngle, this.player.size/2);
    console.log(this.haloPos.toString());

    this.pos = new Vector(this.star.pos.x + this.haloPos.x, this.star.pos.y + this.haloPos.y);
    console.log(this.pos.toString());

    this.angleVelocity = SDCONFIG.playerPodAngleVel;
    this.direction = 0; // 0 = stilla, 1 = cw, -1 = ccw
}

Pod.prototype.update = function(){
    this.direction = 0; // resetar

    // Skapar kloner av nuvarande halo-pos (relativt pos mot star) och förändrar vinkelhastigheten för att motsvara::
    // cw - nästa potentiella placering clock-wise
    // ccw - nästa potentiella placering counter-clock-wise
    var cwHaloPos = this.haloPos.clone();
    cwHaloPos.angle += this.angleVelocity;
    var ccwHaloPos = this.haloPos.clone();
    ccwHaloPos.angle -= this.angleVelocity;

    // omvandlar till reell pos (mot origo) genom att lägga på star.pos
    var cwPos = new Vector(this.star.pos.x + cwHaloPos.x, this.star.pos.y + cwHaloPos.y); //
    var ccwPos = new Vector(this.star.pos.x + ccwHaloPos.x, this.star.pos.y + ccwHaloPos.y); // nästa ev placering counter-clock-wise

    // skapar en pouse-pos (vektor av x, y)
    var mousePos = new Vector(mouseX, mouseY);
    // tar fram tre avstånd till musmarkören: från nuvarande pos, nästa cw-pos, nästa ccw-pos
    var distancePos = Vector.distance(mousePos, this.pos);
    var distanceCwPos = Vector.distance(mousePos, cwPos);
    var distanceCcwPos = Vector.distance(mousePos, ccwPos);

    // kollar vilket avstånd som är kortast. Om nuvarande kortast förändras inte nuvarande position (ingen förfyttning)
    // Annars ändras pos till cw- eller ccw-pos, beroende på vilken som har kortast avstånd till mouse
    if(distancePos > distanceCwPos || distancePos > distanceCcwPos) {
        if (Vector.distance(mousePos, cwPos) < Vector.distance(mousePos, ccwPos)) {
            this.haloPos = cwHaloPos;
            this.direction = 1;
        } else {
            this.haloPos = ccwHaloPos;
            this.direction = -1;
        }
        this.pos = new Vector(this.star.pos.x + this.haloPos.x, this.star.pos.y + this.haloPos.y);
    }
};

Pod.prototype.draw = function(drawOptions){
    var angle = Vector.angleBetween(this.pos, this.star.pos) + Math.PI/2; // vinkel till star + 90 grader
    var w = SDCONFIG.playerPodBodySize[0];
    var h = SDCONFIG.playerPodBodySize[1];

    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    // pod
    noStroke();
    fill(SDCONFIG.playerPodColor[0], SDCONFIG.playerPodColor[1], SDCONFIG.playerPodColor[2]);
    rect(-w/2, -h/2, w, h);
    // jets
    stroke(SDCONFIG.playerPodJetColor[0], SDCONFIG.playerPodJetColor[1], SDCONFIG.playerPodJetColor[2]);
    strokeWeight(SDCONFIG.playerPodJetWidth);
    if(this.direction > 0){ // cw - jet på ccw
        line(w/2, 0, w/2+SDCONFIG.playerPodJetLength, 0);
    }
    if(this.direction < 0) { // ccw - jet på cw
        line(-w/2, 0, -w/2-SDCONFIG.playerPodJetLength, 0);
    }
    pop();
};
