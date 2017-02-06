function MagnetCollection(energySystem){
    this.magnets = [];
    this.energySystem = energySystem;
}

MagnetCollection.prototype.influence = function(enemy){
    for(var i = 0; i < this.magnets.length; i++) {
        var magnet = this.magnets[i];
        if (magnet.active && Vector.distance(magnet.pos, enemy.pos) < magnet.forceRange) {
            //console.log("in triggerzone - to star [" + enemy.distanceToStar + "]");
            enemy.addForce(magnet.getForce(enemy.pos));
        }
    }
};

MagnetCollection.prototype.add = function(x, y, size, colorArr, maxEnergy, burnRate){
    var magnet = new Magnet(x, y, size, colorArr, maxEnergy, burnRate);
    this.energySystem.registerConsumer(magnet);
    this.magnets.push(magnet);
};

MagnetCollection.prototype.addMagnetT1 = function(x, y){
    this.add(x, y, SDCONFIG.magnetSize, SDCONFIG.magnetColor, SDCONFIG.magnetMaxEnergy, SDCONFIG.magnetBurnRate);
};


MagnetCollection.prototype.remove = function(magnet){
    for(var i = 0; i < this.magnets.length; i++) {
        if(this.magnets[i] === magnet){
            this.magnets.splice(i, 1);
        }
    }
};

MagnetCollection.prototype.update = function(){
    for(var i = 0; i < this.magnets.length; i++) {
        this.magnets[i].update();
    }
}

MagnetCollection.prototype.draw = function(drawOptions){
    for(var i = 0; i < this.magnets.length; i++) {
        this.magnets[i].draw(drawOptions);

    }
}
