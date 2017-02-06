function Magnet(x, y, size, colorArr, maxEnergy, burnRate){
    this.pos = new Vector(x, y);
    this.force = SDCONFIG.magnetForce;
    this.forceRange = SDCONFIG.magnetForceRange;

    this.size = size;
    this.color = new Color(colorArr);

    this.energy = new Energy(maxEnergy, -burnRate);
    this.energyUI = new UIEnergyPie(this.pos.x, this.pos.y, this.size-1, this.energy.max, SDCONFIG.energyColor);

    this.uiTriggerzone = new UITriggerzone(this.pos.x, this.pos.y, this.forceRange);

    this.mouse = new MouseEvents(this);
}

Magnet.prototype.getForce = function(pos){
    var f = new Vector(); // polar force-vector
    f.setPolar(Vector.angleBetween(pos, this.pos), this.force);

    return f;
}

Magnet.prototype.update = function(){
    this.energy.update();
    if(this.energy.empty){
        this.active = false;
    } else {
        this.active = true;
    }

    this.energyUI.value = this.energy.value;
    this.energyUI.pos = this.pos.clone();

    this.uiTriggerzone.pos = this.pos;

}

Magnet.prototype.draw = function(drawOptions){

    if(this.mouse.hover()) {
        this.uiTriggerzone.draw(drawOptions);
    }

    noStroke();
    fill(this.color.getCSS());
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    this.energyUI.draw(drawOptions);
}
