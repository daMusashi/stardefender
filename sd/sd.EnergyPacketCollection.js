function EnergyPacketCollection(star){
    this.star = star;

    this.packets = [];

    this.color = SDCONFIG.energyPacketColor;
}

EnergyPacketCollection.prototype.makeDelivery = function(targetPosAndEnergyObj){
    var packet = new EnergyPacket(this.star, targetPosAndEnergyObj, this.color, new Handler(this.remove, this));
    this.packets.push(packet);
}

EnergyPacketCollection.prototype.remove = function(packet){
    for(var i = 0; i < this.packets.length; i++) {
        if(this.packets[i] === packet){
            this.packets.splice(i, 1);
        }
    }
};

EnergyPacketCollection.prototype.update = function(){
    for(var i = 0; i < this.packets.length; i++) {
        this.packets[i].update();
    }
}

EnergyPacketCollection.prototype.draw = function(drawOptions){
    for(var i = 0; i < this.packets.length; i++) {
        this.packets[i].draw(drawOptions);
    }
}
