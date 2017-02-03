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

    SDCONFIG.drawOptions = new DrawOptions();
    SDCONFIG.drawOptions.debug = true;
    SDCONFIG.drawOptions.hotzones = true;

    this.canvas = createCanvas(SDCONFIG.canvasWidth, SDCONFIG.canvasHeight);

    this.star = new Star(SDCONFIG.canvasWidth/2, SDCONFIG.canvasHeight/2, SDCONFIG.starSize, SDCONFIG.starSize);
    this.star.diedHandler = new Handler(this.starDiedHandler, this);
    this.player = new Player(this.star);
    this.swarm = {};


    this.nextSwarm();

};

SD.prototype.EnemyImpactHandler = function(damage){
    this.star.takeDamage(damage);
}

SD.prototype.starDiedHandler = function(){
    console.log("DIED!")
    this.mode = 0;
}

SD.prototype.nextSwarm = function(){
    this.swarm = new Swarm(this.star, this.player, 0, 90, 50, SDCONFIG.enemiesStartVel);
    this.swarm.allDeadHandlers.add(this.nextSwarm, this);
    this.swarm.impactHandlers.add(this.EnemyImpactHandler, this);
};

// för enstaka tryckningar - använd i p5's keyPressed
SD.prototype.keyPressed = function(){
    console.log("key pressed ("+keyCode+")");
    // pause
    if(keyCode == 80){ // p
        console.log(this.mode);
        if(this.mode == 2) {
            this.mode = 0;
        } else {
            if (this.mode == 0) {
                this.mode = 2;
            }
        }
    }
    // hotzones
    if(keyCode == 72){ // h
        if(SDCONFIG.drawOptions.hotzones){
            SDCONFIG.drawOptions.hotzones = false;
        } else {
            SDCONFIG.drawOptions.hotzones = true;
        }
    }
    // debug
    if(keyCode == 68){ // d
        if(SDCONFIG.drawOptions.debug){
            SDCONFIG.drawOptions.debug = false;
        } else {
            SDCONFIG.drawOptions.debug = true;
        }
    }
}

SD.prototype.update = function(){

    if(this.mode == 2) {
        this.star.update();
        this.swarm.update();
        this.player.update(this.swarm);
    }

};

SD.prototype.draw = function(){
    //this.db("Draw - mode "+ this.mode);

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
    this.swarm.draw(SDCONFIG.drawOptions);
    this.player.draw(SDCONFIG.drawOptions);

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