function UITriggerzone(x, y, triggerRange){
    this.pos = new Vector(x, y);
    this.size = triggerRange*2;
    this.colorFill = new Color(SDCONFIG.triggerzonesColor);
    this.colorFillInactive = new Color(SDCONFIG.triggerzonesInactiveColor);
    this.colorStroke = this.colorFill.copy();
    this.colorStroke.a *= 2;
    this.colorStrokeInactive = this.colorFillInactive.copy();
    this.colorStrokeInactive.a *= 2;

    this.active = true;
}

UITriggerzone.prototype.update = function(){

}

UITriggerzone.prototype.draw = function(drawOptions){
    //console.log(this);
   // console.log(this.color.r);
    if(drawOptions.triggerzones){
        //console.log("draw");

        if(this.active){
            stroke(this.colorStroke.getCSS());
            fill(this.colorFill.getCSS());
        } else {
            stroke(this.colorStrokeInactive.getCSS());
            fill(this.colorFillInactive.getCSS());
        }
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}
