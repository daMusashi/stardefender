function EnergyPacket(star, targetPosAndEnergyObj, color, onDeliveredHandler){
    this.consumer = targetPosAndEnergyObj;
    this.consumer.energy.waitingForPacket = true;

    this.star = star;

    this.value = this.consumer.energy.getMissing();
    this.star.energy.value -= this.value; // tar bort paketets storlek från stars energy

    this.speed = SDCONFIG.energyPacketSpeed;

    var travelVector = Vector.minus(this.consumer.pos, this.star.pos);
    var starSurfacePos = new Vector();
    starSurfacePos.setPolar(travelVector.angle, this.star.size/2); // polär
    this.pos = new Vector(this.star.pos.x + starSurfacePos.x, this.star.pos.y + starSurfacePos.y);

    this.color = new Color(color);

    this.onDeliveredHandler = onDeliveredHandler; // använd för att ta detta objekt
}

EnergyPacket.prototype._deliver = function(){
    this.consumer.energy.add(this.value);
    this.consumer.energy.waitingForPacket = false;
    this.onDeliveredHandler.handlerCall(this);
}

EnergyPacket.prototype.update = function(){
    var travelVector = Vector.minus(this.consumer.pos, this.pos);
    var velocity = new Vector();
    velocity.setPolar(travelVector.angle, this.speed); // polär
    this.pos.x += velocity.x;
    this.pos.y += velocity.y;

    if(Vector.distance(this.pos, this.consumer.pos) < this.consumer.size){
        this._deliver();
    }
}

EnergyPacket.prototype.draw = function(drawOptions){
    console.log("drawing paket");
    noStroke();
    fill(this.color.getCSS());
    ellipse(this.pos.x, this.pos.y, 5, 5);
}
