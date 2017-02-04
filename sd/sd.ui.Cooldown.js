function UICooldown(x, y, size, colorBackground, colorPie) {
    this.pos = new Vector(x, y);
    this.size = size;
    this.value = 0; // max från start, ska vara mellan 0-1

    this.colorBg = colorBackground;
    this.colorPie = colorPie;
}

// draw
UICooldown.prototype.draw = function(drawOptions){
    var translator = -Math.PI/2; // snurrar vinklar så 0/100 pekar +y (topp) istället för +x (höger)

    if(this.value > 1){
        this.value = 1;
    }

    if(this.value < 0){
        this.value = 0;
    }

    var valueAngle = this.value * (2*Math.PI);

    // background/stroke
    noFill();
    strokeWeight(1);
    stroke(this.colorBg[0], this.colorBg[1], this.colorBg[2]);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    // pie
    noStroke();
    fill(this.colorPie[0], this.colorPie[1], this.colorPie[2]);
    if(this.value > 0) { // p5 ritar en halva när allt är 0, fix: rita bara pie när value > 0 annars hel
        arc(this.pos.x, this.pos.y, this.size, this.size, translator, valueAngle + translator, PIE);
    } else {
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}