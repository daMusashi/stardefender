function Star(x, y, size){
    this.size = size;
    this.pos = new Vector(x, y);
    this.health = SDCONFIG.starHealth;

    this.uiTextHealth = new UIText(this._healthToString(), 18, this.pos.x, this.pos.y);
    this.uiTextHealth.color = [0, 0, 0];
    this.uiTextHealth.align = "cc";

    this.diedHandler = new Handler();
}

Star.prototype.takeDamage = function(damage){
    this.health -= damage;
}

Star.prototype._healthToString = function(){
    var h = (this.health/SDCONFIG.starHealth) * 100;
    return h.toFixed(1) + "%";
}

Star.prototype.update = function(){
    this.uiTextHealth.text = this._healthToString();

    if(this.health < 0){
        this.diedHandler.handlerCall();
    }
};

Star.prototype.draw = function(){
    noStroke();
    fill(SDCONFIG.starColor[0], SDCONFIG.starColor[1], SDCONFIG.starColor[2]);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    this.uiTextHealth.draw();
};
