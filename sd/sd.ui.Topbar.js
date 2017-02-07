function UITopbar(player){
    this.colorPanelBackground = new Color(SDCONFIG.uiColorMain);
    this.colorPanelBorder = this.colorPanelBackground.copy();
    this.colorPanelBorder.shade(20);

    this.pos = new Vector(0, 0); // behövs för UI-funktioner som MouseEvent

    this.height = SDCONFIG.uiTopbarHeight;

    this.mouse = new MouseEvents(this);

    this.player = player;

    this.focus = false; // om cursor är över topbar eller ej. Spara i  egenskap från koll i uppdate för optimering då flera steg använder infon
}

UITopbar.prototype.update = function(){
    if(this.mouse.hover()){
        this.focus = true;
        this.player.holdPod = true;
    } else {
        this.focus = false;
        this.player.holdPod = false;
    }
}

UITopbar.prototype.draw = function(){
    // panel
    stroke(this.colorPanelBorder.getCSS());
    fill(this.colorPanelBackground.getCSS());
    rect(this.pos.x, this.pos.y, SDCONFIG.canvasWidth, this.height);

    if(this.focus){
        this.mouse.drawUiCursor();
    }
}
