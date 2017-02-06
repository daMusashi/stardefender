function MouseEvents(hostPosSizeObject){
    this.host = hostPosSizeObject;
}

MouseEvents.prototype.hover = function(){
    var mousePos = new Vector(mouseX, mouseY);

    if(Vector.distance(mousePos, this.host.pos) < this.host.size){
        return true;
    } else {
        return false;
    }

}
