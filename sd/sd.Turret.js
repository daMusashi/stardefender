function Turret(x, y, size, colorArr, maxEnergy, burnLength, triggerRange, laserCollection){
    this.pos = new Vector(x, y);

    this.lasers = laserCollection;

    this.size = size;

    this.burnLength = burnLength;

    this.triggerRange = triggerRange;
    this.uiTriggerzone = new UITriggerzone(this.pos.x, this.pos.y, this.triggerRange);

    this.energy = new Energy(maxEnergy);
    this.energyUI = new UIEnergyPie(this.pos.x, this.pos.y, this.size-1, this.energy.max, SDCONFIG.energyColor);

    this.color = new Color(colorArr);

    this.active = false;
    this.isShooting = false; // uppdateras true/false av Laser

    this.mouse = new MouseEvents(this);
}

Turret.prototype.shoot = function(enemy){
    //console.log("SHOOT [e:"+this.energy.value+"]");
    this.energy.value -= SDCONFIG.LaserEnergyCost;
    this.lasers.shoot(this, enemy, this.burnLength);
}


Turret.prototype.update = function(){
    this.energy.update();
    if(this.energy.empty){
        this.active = false;
    } else {
        if(this.energy.canIUse(SDCONFIG.LaserEnergyCost)) {
            this.active = true;
        } else {
            this.active = false;
        }
    }

    this.energyUI.value = this.energy.value;
    this.energyUI.pos = this.pos.clone();

    this.uiTriggerzone.pos = this.pos;
    if(this.active){
        this.uiTriggerzone.active = true;
    } else {
        this.uiTriggerzone.active = false;
    }
}

Turret.prototype.draw = function(drawOptions){

    if(this.mouse.hover()) {
        this.uiTriggerzone.draw(drawOptions);
    }

    noStroke();
    fill(this.color.getCSS());
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    this.energyUI.draw();

    if(drawOptions.cooldowns) {

    }
}
