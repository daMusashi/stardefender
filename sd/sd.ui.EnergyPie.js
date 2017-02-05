function UIEnergyPie(x, y, size, maxValue, colorPie, colorBackground, startValue) {
    this.pos = new Vector(x, y);
    this.size = size;
    this.sizePie = size - 1;

    this.max = maxValue;
    this.value = startValue || maxValue;

    this.colorPie = new Color(colorPie);
    this.colorBackground = null;
    if (colorBackground){
        this.colorBackground = new Color(colorBackground);
    }
}

// draw
UIEnergyPie.prototype.draw = function(drawOptions){
    var translator = -Math.PI/2; // snurrar vinklar så 0/100 pekar +y (topp) istället för +x (höger)

    if(this.value > this.max){
        this.value = this.max;
    }

    if(this.value < 0){
        this.value = 0;
    }

    var valueAngle = (this.value/this.max) * (2*Math.PI);

    // background/stroke
    if(this.colorBackground) {
        noStroke();
        fill(this.colorBackground.getCSS());
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    // pie
    noStroke();
    fill(this.colorPie.getCSS());
    // p5 ritar en halva när vinkelvalue är 0 eller 2*Math.PI. Troligen beroende på p5 arc-algoritm i kombination med min translotor som roterar 0. fix: sätt translator = 0 vid anglevalue 0 || 0
    if(valueAngle == 0 || valueAngle == 2*Math.PI){
        translator = 0;
    }
    if(this.value > 0) { // behöver inte rita något om 0
        arc(this.pos.x, this.pos.y, this.sizePie, this.sizePie, translator, valueAngle + translator, PIE);
    } else {
        //ellipse(this.pos.x, this.pos.y, this.sizePie, this.sizePie);
    }

    /*console.log("--");
    console.log("val:"+this.value);
    console.log("max:"+this.max);
    console.log("valueAngle:"+valueAngle);
    console.log("translator:"+translator);*/
}