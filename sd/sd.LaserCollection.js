function LaserCollection(color){
    this.lasers = [];
    this.targets = [];
    this.color = color;
}

LaserCollection.prototype.shoot = function(shootingObjectWithPos, enemy, burnLength){ // shootingObjectWithPos & enemy måste ha en .pos som Vector
    var laser = new Laser(shootingObjectWithPos, enemy, burnLength, this.color.copy());
    laser.removeMeHandler = new Handler(this.removeLaser, this);
    this.lasers.push(laser);
};

LaserCollection.prototype.removeLaser = function(laser){
    for(var i = 0; i < this.lasers.length; i++) {
        if(this.lasers[i] === laser){
            this.lasers.splice(i, 1);
        }
    }
};

LaserCollection.prototype.update = function(){
    for(var i = 0; i < this.lasers.length; i++) {
        this.lasers[i].update();
    }
}

LaserCollection.prototype.draw = function(){
    for(var i = 0; i < this.lasers.length; i++) {
        this.lasers[i].draw();
    }
}
