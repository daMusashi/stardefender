function Star(x, y, size){
    this.size = size;
    this.pos = new Vector(x, y);
    this.health = SDCONFIG.starHealth;
    this.color = new Color(SDCONFIG.starColor);
    //this.colorBackground = new Color(SDCONFIG.starSecondaryColor);

    this.energy = new Energy(SDCONFIG.starEnergy, SDCONFIG.starEnergyGrowRate);
    this.energy.fillMax();
    this.energyUI = new UIEnergyPie(this.pos.x, this.pos.y, this.size+8, this.energy.max, SDCONFIG.energyColor);

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
    this.energy.update();
    this.energyUI.value = this.energy.value;

    this.uiTextHealth.text = this._healthToString();

    if(this.health < 0){
        this.diedHandler.handlerCall();
    }


};

Star.prototype.draw = function(drawOptions){

    this.energyUI.draw(drawOptions);

    noStroke();

    fill(this.color.getCSS());
    ellipse(this.pos.x, this.pos.y, this.size, this.size);



    this.uiTextHealth.draw();
};
