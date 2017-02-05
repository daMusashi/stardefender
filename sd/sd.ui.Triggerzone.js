function UITriggerzone(x, y, triggerRange){
    this.pos = new Vector(x, y);
    this.size = triggerRange*2;
    this.colorFill = new Color(SDCONFIG.triggerzonesColor);
    this.colorStroke = this.colorFill.copy();
    this.colorStroke.a *= 2;
}

UITriggerzone.prototype.update = function(){

}

UITriggerzone.prototype.draw = function(drawOptions){
    //console.log(this);
   // console.log(this.color.r);
    if(drawOptions.triggerzones){
        //console.log("draw");
        stroke(this.colorStroke.getCSS());
        fill(this.colorFill.getCSS());
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}
