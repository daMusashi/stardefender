function UIText(text, size, x, y){
    this.align = "l"; // l, c, cc, r, rb  default vert är top +c(enter) och +b(ottom) är valbara med extra bokstav
    this.text = text;
    this.size = size;
    this.pos = new Vector(x, y);
    this.color = [255, 255, 255];

};

UIText.prototype.draw = function(){
    textSize(this.size);
    fill(this.color[0], this.color[1], this.color[2]);
    textAlign(LEFT, TOP);
    switch(this.align){
        case "lb":
            textAlign(LEFT, BOTTOM);
            break;
        case "r":
            textAlign(RIGHT, TOP);
            break;
        case "rb":
            textAlign(RIGHT, BOTTOM);
            break;
        case "c":
            textAlign(CENTER, TOP);
            break;
        case "cc":
            textAlign(CENTER, CENTER);
            break;
        case "cb":
            textAlign(CENTER, BOTTOM);
            break;
        default:
            textAlign(LEFT, TOP);
    }
    text(this.text, this.pos.x, this.pos.y);
}
