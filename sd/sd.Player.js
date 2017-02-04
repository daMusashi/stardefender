function Player(star){
    this.star = star;

    this.size = SDCONFIG.playerHaloSize;

    this.pod = new PlayerPod(0, star, this);
    this.turret = new PlayerTurret(this.pod);
}

Player.prototype.shoot = function(enemy){
    this.turret.shoot(enemy);
}

Player.prototype.update = function(){

    this.pod.update();

    this.turret.update();
};

Player.prototype.draw = function(drawOptions){
    strokeWeight(SDCONFIG.playerHaloStrokeSize);
    stroke(SDCONFIG.playerHaloColor[0], SDCONFIG.playerHaloColor[1], SDCONFIG.playerHaloColor[2], SDCONFIG.playerHaloColor[3]);
    noFill();
    ellipse(this.star.pos.x, this.star.pos.y, this.size, this.size);

    // guid-linje
    stroke(SDCONFIG.playerPodColor[0], SDCONFIG.playerPodColor[1], SDCONFIG.playerPodColor[2], 160);
    line(mouseX, mouseY, this.pod.pos.x, this.pod.pos.y);

    // markör
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 4, 4);

    this.pod.draw(drawOptions);
    this.turret.draw(drawOptions);
};
