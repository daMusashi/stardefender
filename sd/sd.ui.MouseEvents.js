function MouseEvents(hostPosSizeObject){
    this.host = hostPosSizeObject;
}

MouseEvents.prototype.hover = function(){
    var mousePos = new Vector(mouseX, mouseY);
    var mouseDist = Vector.distance(mousePos, this.host.pos);


    if(this.host.size) { // cirkelformad
        if (mouseDist < this.host.size) {
            return true;
        } else {
            return false;
        }
    } else { // annars rektangel (med width & height
        var hostTop = this.host.pos.y; // top-kanten
        var hostBottom = this.host.pos.y + this.host.height; // bottom-kanten
        var hostLeft = this.host.pos.x; // left-kanten
        var hostRight = this.host.pos.x + this.host.width; // bottom-kanten

        // kollar om det stämmer att mouse inte överlappar (och inverterar med !)
        if(!(hostLeft > mousePos.x ||
            hostRight < mousePos.x ||
            hostTop > mousePos.y ||
            hostBottom < mousePos.y))
        {
            return true;
        } else {
            return false;
        }
    }

}

MouseEvents.prototype.drawUiCursor = function(){
    var color = new Color(SDCONFIG.uiCursorColor);
    var pos = new Vector(mouseX, mouseY);
    var size = SDCONFIG.uiCursorSize;

    noStroke();
    fill(color.getCSS());
    var bottomLeft = new Vector(pos.x - size/2 , pos.y + size);
    var bottomRight = new Vector(pos.x + size/2, pos.y + size);
    var topMiddle = new Vector(pos.x, pos.y);
    triangle(bottomLeft.x, bottomLeft.y, topMiddle.x, topMiddle.y, bottomRight.x, bottomRight.y);
    //ellipse(pos.x, pos.y, 2, 2);
    //fill(color.getCSS());
}
