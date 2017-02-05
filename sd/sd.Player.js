function Player(star, energySystem){
    this.star = star;
    this.energySystem = energySystem;

    this.size = SDCONFIG.playerHaloSize;

    this.pod = new PlayerPod();
    this.podPosition = new PlayerPodPosition(0, star, this); // har pad-position algoritmer i eget externt objekt här för enklare datadelning då andra objekt behöver den

    this.cursor = new PlayerCursor();

    this.playerLasers = new LaserCollection(new Color(SDCONFIG.playerTurretLaserColor));

    this.turret = new Turret(this.pod.x, this.pod.y, SDCONFIG.playerTurretSize, SDCONFIG.playerTurretColor, SDCONFIG.playerTurretMaxEnergy, SDCONFIG.playerTurretBurnLength, SDCONFIG.playerTurretTriggerRange, this.playerLasers);
    this.energySystem.registerConsumer(this.turret);

    this.haloColor = new Color(SDCONFIG.playerHaloColor);
}

Player.prototype.shoot = function(enemy){
    console.log("player shoot")
    this.turret.shoot(this.turret, enemy);
}

Player.prototype.update = function(){

    this.podPosition.update();

    this.cursor.update(this.podPosition);
    this.pod.update(this.podPosition);
    this.turret.pos = this.podPosition.podPos;
    this.turret.update();

    this.playerLasers.update();
};

Player.prototype.draw = function(drawOptions){

    // halo
    strokeWeight(SDCONFIG.playerHaloStrokeSize);
    stroke(this.haloColor.getCSS());
    noFill();
    ellipse(this.star.pos.x, this.star.pos.y, this.size, this.size);


    this.pod.draw(drawOptions);
    this.turret.draw(drawOptions);

    this.playerLasers.draw(drawOptions);

    this.cursor.draw(drawOptions)
};
