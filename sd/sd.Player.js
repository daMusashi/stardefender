function Player(star){
    this.star = star;

    this.size = SDCONFIG.playerHaloSize;

    this.pod = new PlayerPod();
    this.podPosition = new PlayerPodPosition(0, star, this); // har pad-position algoritmer i eget externt objekt här för enklare datadelning då andra objekt behöver den

    this.turret = new PlayerTurret(this.pod);

    this.cursor = new PlayerCursor();

    this.haloColor = new Color(SDCONFIG.playerHaloColor);
}

Player.prototype.shoot = function(enemy){
    this.turret.shoot(this.pod, enemy);
}

Player.prototype.update = function(){

    this.podPosition.update();

    this.cursor.update(this.podPosition);
    this.pod.update(this.podPosition);
    this.turret.update(this.podPosition);
};

Player.prototype.draw = function(drawOptions){

    // halo
    strokeWeight(SDCONFIG.playerHaloStrokeSize);
    stroke(this.haloColor.getCSS());
    noFill();
    ellipse(this.star.pos.x, this.star.pos.y, this.size, this.size);


    this.pod.draw(drawOptions);
    this.turret.draw(drawOptions);

    this.cursor.draw(drawOptions)
};
