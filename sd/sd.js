/**
 * Created by Martin on 2015-10-14.
 */

var SDCONFIG = new CONFIG();

// Skapar namespace
var SD = function(){

    this.config = null;
    this.canvas = null;
    this.mode = 2; // 0-pause, 1-start, 2-running, 3-end

    this.star = null;


};

SD.prototype.preload = function(){
    sdinfo("Preload");
    /*Pd.Tools.log("Preloading");
    this.font = loadFont("fonts/silkscreen.ttf");
    this.handCursor = loadImage("gfx/cursor_hand.png");
    this.startScreen = loadImage("gfx/startscreen.jpg");
    this.endScreen = loadImage("gfx/endscreen.jpg");
    this.gameScreen = loadImage("gfx/gamescreen.jpg");*/
};

SD.prototype.setup = function(){
    sdinfo("Setup");
    angleMode(RADIANS);

    // ta bort webbläsarens kontext-menu (högerklick, behöver den själv :)
    document.oncontextmenu = function(event){
        event.preventDefault();
        return false;
    }

    SDCONFIG.drawOptions = new DrawOptions();
    SDCONFIG.drawOptions.debug = false;
    SDCONFIG.drawOptions.triggerzones = true;
    SDCONFIG.drawOptions.triggerzonesAlwaysOn = true;
    SDCONFIG.drawOptions.cooldowns = true;

    this.canvas = createCanvas(SDCONFIG.canvasWidth, SDCONFIG.canvasHeight);

    this.star = new Star(SDCONFIG.canvasWidth/2, SDCONFIG.canvasHeight/2, SDCONFIG.starSize, SDCONFIG.starSize);
    this.star.diedHandler = new Handler(this.starDiedHandler, this);

    this.energy = new EnergySystem(this.star);

    this.player = new Player(this.star, this.energy);
    this.turrets = new TurretCollection(this.energy);
    this.magnets = new MagnetCollection(this.energy);

    this.swarms = new SwarmControl(this.star, this.player, this.turrets, this.magnets);

    this.uiTopbar = new UITopbar(this.player);

    this.swarms.nextSwarm();

};



SD.prototype.starDiedHandler = function(){
    console.log("DIED!")
    this.mode = 0;
}


SD.prototype.mouseReleased = function(){
    if (mouseButton == LEFT) {
        this.turrets.addStationaryT1(mouseX, mouseY);
    }
    if (mouseButton == RIGHT) {
        this.magnets.addMagnetT1(mouseX, mouseY);
    }
}

// för enstaka tryckningar - använd i p5's keyPressed
SD.prototype.keyPressed = function(){
    console.log("key pressed ("+keyCode+")");
    // pause
    if(keyCode == SDCONFIG.keyPause){ // p
        console.log(this.mode);
        if(this.mode == 2) {
            this.mode = 0;
        } else {
            if (this.mode == 0) {
                this.mode = 2;
            }
        }
    }
    // show triggerzones (always on) toggle
    if(keyCode == SDCONFIG.keyShowTriggerzonesToggle){ // t
        if(SDCONFIG.drawOptions.triggerzones){
            SDCONFIG.drawOptions.triggerzones = false;
            SDCONFIG.drawOptions.triggerzonesAlwaysOn = false;
        } else {
            SDCONFIG.drawOptions.triggerzones = true;
            SDCONFIG.drawOptions.triggerzonesAlwaysOn = true;
        }
    }
    // show triggerzones när mellanslag nedtryckt
    if(keyCode == SDCONFIG.keyShowTriggerzones){ // mellanslag
        if(SDCONFIG.drawOptions.triggerzonesAlwaysOn == false && SDCONFIG.drawOptions.triggerzones == false){
            SDCONFIG.drawOptions.triggerzones = true;
        }
    }
    // show debug toggle
    if(keyCode == SDCONFIG.keyShowDebugToggle){ // d
        if(SDCONFIG.drawOptions.debug){
            SDCONFIG.drawOptions.debug = false;
        } else {
            SDCONFIG.drawOptions.debug = true;
        }
    }

    // show cooldowns toggle
    if(keyCode == SDCONFIG.keyShowCooldowns){ // c
        if(SDCONFIG.drawOptions.cooldowns){
            SDCONFIG.drawOptions.cooldowns = false;
        } else {
            SDCONFIG.drawOptions.cooldowns = true;
        }
    }
}

SD.prototype.keyReleased = function(){
    if(keyCode == SDCONFIG.keyShowTriggerzones){ // mellanslag
        if(SDCONFIG.drawOptions.triggerzonesAlwaysOn == false && SDCONFIG.drawOptions.triggerzones == true){
            SDCONFIG.drawOptions.triggerzones = false;
        }
    }
}

SD.prototype.update = function(){

    if(this.mode == 2) {
        this.star.update();
        this.energy.update();
        this.swarms.update();

        this.turrets.update();
        this.magnets.update();

        this.uiTopbar.update();
        this.player.update(this.swarms.swarm);

    }

};

SD.prototype.draw = function(){
    noCursor();

    switch(this.mode) {
        case 0: // pause

            break;
        case 1: // start

            break;
        case 2: // running
            this.drawRunning();
            break;
        case 3: // end

            break;
        default:

    }

};

SD.prototype.drawRunning = function(){

    //this.db("drawRunning");
    background(0);
    this.star.draw(SDCONFIG.drawOptions);
    this.energy.draw(SDCONFIG.drawOptions);
    this.swarms.draw(SDCONFIG.drawOptions);
    this.turrets.draw(SDCONFIG.drawOptions);
    this.magnets.draw(SDCONFIG.drawOptions);
    this.player.draw(SDCONFIG.drawOptions);

    this.uiTopbar.draw();
};

var sdinfo = function(msg){
    console.log("SD: "+msg);
};

var sddb = function(msg){
    console.log("SD [DEBUG]: "+msg);
};

var sddump = function(obj){
    console.log(obj);
};