function SwarmControl(star, player, turrets, magnets){ // angleList: [[startAng, endAng], [startAng, endAng]]

    this.star = star;
    this.player = player;
    this.turrets = turrets;
    this.magnets = magnets;

    this.swarm = {};

    this.spawnSpeed = SDCONFIG.enemiesStartVel;
}

SwarmControl.prototype.nextSwarm = function(){
    var enemies = [];

    var angles = [[10, 80], [190, 260]];
    var count = 100;

    for(var i = 0; i < angles.length; i++) {
        var starAng = angles[i][0];
        var endAng = angles[i][1];
        var swarmPart = this.enemySpawner(starAng, endAng, Math.round(count/angles.length));
        enemies = enemies.concat(swarmPart);
    }

    this.swarm = new Swarm(this.star, this.player, this.turrets, this.magnets, enemies);
    this.swarm.allDeadHandlers.add(this.swarmDeadHandler, this);
    this.swarm.impactHandlers.add(this.enemyImpactHandler, this);
}

SwarmControl.prototype.swarmDeadHandler = function(){
    this.nextSwarm();
}

SwarmControl.prototype.enemyImpactHandler = function(damage){
    this.star.takeDamage(damage);
}

SwarmControl.prototype.enemySpawner = function(startAngDegrees, endAngDengrees, count){
    var enemies = [];

    var startAng = radians(startAngDegrees);
    var angLength = radians(endAngDengrees) - startAng;

    for(var i = 0; i < count; i++){
        var ang = startAng + (Math.random() * angLength);
        // längden från mittpunkt till hörn (origo)
        var length = SDCONFIG.swarmSpawnLength + Math.random() * 20; // lägger på en marginal
        // beräknar x & y
        var x = this.star.pos.x + length*Math.cos(ang);
        var y = this.star.pos.y + length*Math.sin(ang);
        // varierar hastigheten
        var speedVar = Math.random() * SDCONFIG.enemiesVelVariation;
        if(Math.random() < 0.5){
            speedVar = 1 - speedVar;
        } else {
            speedVar = 1 + speedVar;
        }
        var speed = this.spawnSpeed * speedVar;

        var enemy = new Enemy(x, y, speed, this.star);

        enemies.push(enemy);
    }

    return enemies;
}


// update & draw

SwarmControl.prototype.update = function(){
    this.swarm.update();
};

SwarmControl.prototype.draw = function(drawOptions){
    this.swarm.draw(drawOptions);
};
