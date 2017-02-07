function PlayerCursor(){
    this.pos = new Vector();
    this.podPos = new Vector();
    this.podCursorVector = new Vector();

    this.size = SDCONFIG.uiPlayerCursorSize;

    this.cursorColor = new Color(SDCONFIG.uiPlayerCursorColor);
    this.cursorLineColor = this.cursorColor.copy();
    this.cursorLineColor.a = SDCONFIG.uiPlayerCursorLineAlfa;
    this.cursorLineDotSpacing = SDCONFIG.uiPlayerCursorLineDotSpacing;
}

PlayerCursor.prototype.update = function(podPosition){
    this.pos = new Vector(mouseX, mouseY);
    this.podPos = podPosition.podPos;
    this.podCursorVector = Vector.minus(this.pos, this.podPos);
}

PlayerCursor.prototype.draw = function(drawOptions, hold){
    noFill();

    // guid-linje
    if(!hold){
        strokeWeight(1);
        stroke(this.cursorLineColor.getCSS());
        var dotX = this.podPos.x;
        var dotY = this.podPos.y;
        for(var i = 0; i < this.podCursorVector.length/this.cursorLineDotSpacing; i++){
            dotX += this.cursorLineDotSpacing * Math.cos(this.podCursorVector.angle);
            dotY += this.cursorLineDotSpacing * Math.sin(this.podCursorVector.angle);
            point(dotX, dotY);
        }
    }

    // cursor
    stroke(this.cursorColor.getCSS());
    var bottomLeft = new Vector(this.pos.x - this.size/2 , this.pos.y + this.size/2);
    var bottomRight = new Vector(this.pos.x + this.size/2, this.pos.y  + this.size/2);
    var topMiddle = new Vector(this.pos.x, this.pos.y - this.size/2);
    triangle(bottomLeft.x, bottomLeft.y, topMiddle.x, topMiddle.y, bottomRight.x, bottomRight.y);
    fill(this.cursorColor.getCSS());
    //ellipse(this.pos.x, this.pos.y, 2, 2);
}
