// Sköter beräkningar för placeringar och rotation runt star
// Objektet skickas i update() till de objekt som behöver datan under Player-objektet, eller hämtas från egenskap av objekt utanför

function PlayerPodPosition(spawnAngle, star, player){
    this.star = star;
    this.player = player;

    this.podPosOnHalo = new Vector();
    this.podPosOnHalo.setPolar(spawnAngle, this.player.size/2);

    this.podPos = new Vector(this.star.pos.x + this.podPosOnHalo.x, this.star.pos.y + this.podPosOnHalo.y);

    this.angleVelocity = SDCONFIG.playerPodAngleVel;
    this.direction = 0; // 0 = stilla, 1 = cw, -1 = ccw
    this.angle = 0;

}

PlayerPodPosition.prototype.update = function(){
    this.direction = 0; // resetar

    // Skapar kloner av nuvarande halo-pos (relativt pos mot star) och förändrar vinkelhastigheten för att motsvara::
    // cw - nästa potentiella placering clock-wise
    // ccw - nästa potentiella placering counter-clock-wise
    var cwHaloPos = this.podPosOnHalo.clone();
    cwHaloPos.angle += this.angleVelocity;
    var ccwHaloPos = this.podPosOnHalo.clone();
    ccwHaloPos.angle -= this.angleVelocity;

    // omvandlar till reell pos (mot origo) genom att lägga på star.pos
    var cwPos = new Vector(this.star.pos.x + cwHaloPos.x, this.star.pos.y + cwHaloPos.y); //
    var ccwPos = new Vector(this.star.pos.x + ccwHaloPos.x, this.star.pos.y + ccwHaloPos.y); // nästa ev placering counter-clock-wise

    // skapar en pouse-pos (vektor av x, y)
    var mousePos = new Vector(mouseX, mouseY);
    // tar fram tre avstånd till musmarkören: från nuvarande pos, nästa cw-pos, nästa ccw-pos
    var distancePos = Vector.distance(mousePos, this.podPos);
    var distanceCwPos = Vector.distance(mousePos, cwPos);
    var distanceCcwPos = Vector.distance(mousePos, ccwPos);

    // kollar vilket avstånd som är kortast. Om nuvarande kortast förändras inte nuvarande position (ingen förfyttning)
    // Annars ändras pos till cw- eller ccw-pos, beroende på vilken som har kortast avstånd till mouse
    if(distancePos > distanceCwPos || distancePos > distanceCcwPos) {
        if (Vector.distance(mousePos, cwPos) < Vector.distance(mousePos, ccwPos)) {
            this.podPosOnHalo = cwHaloPos;
            this.direction = 1;
        } else {
            this.podPosOnHalo = ccwHaloPos;
            this.direction = -1;
        }
        this.podPos = new Vector(this.star.pos.x + this.podPosOnHalo.x, this.star.pos.y + this.podPosOnHalo.y);
    }

    this.angle = Vector.angleBetween(this.podPos, this.star.pos) + Math.PI/2; // vinkel till star + 90 grader
}
