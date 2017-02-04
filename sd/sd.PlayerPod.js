function PlayerPod(spawnX, spawnY){
    var x = spawnX || 0;
    var y = spawnY || 0;
    this.pos = new Vector(x, y);
    this.angle = 0;
}

PlayerPod.prototype.update = function(podPosition){
    this.pos = podPosition.podPos;
    this.angle = podPosition.angle;
};

PlayerPod.prototype.draw = function(drawOptions){

    var w = SDCONFIG.playerPodBodySize[0];
    var h = SDCONFIG.playerPodBodySize[1];

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    // pod
    noStroke();
    fill(SDCONFIG.playerPodColor[0], SDCONFIG.playerPodColor[1], SDCONFIG.playerPodColor[2]);
    rect(-w/2, -h/2, w, h);
    // jets
    stroke(SDCONFIG.playerPodJetColor[0], SDCONFIG.playerPodJetColor[1], SDCONFIG.playerPodJetColor[2]);
    strokeWeight(SDCONFIG.playerPodJetWidth);
    if(this.direction > 0){ // cw - jet på ccw
        line(w/2, 0, w/2+SDCONFIG.playerPodJetLength, 0);
    }
    if(this.direction < 0) { // ccw - jet på cw
        line(-w/2, 0, -w/2-SDCONFIG.playerPodJetLength, 0);
    }
    pop();
};
