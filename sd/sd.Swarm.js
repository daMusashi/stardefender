function Swarm(star, player, startAngleDeg, endAngleDeg, enemyCount, enemyVelocity){
    var startAng = radians(startAngleDeg);
    var angLength = radians(endAngleDeg) - startAng;

    this.enemies = [];
    this.targetedEnemies = []; // en array med enenmies som är under besjutning och inte ska tas med leta-target-algoritmer (förrän damage på enenmies läggs till)
    this.enemiesRemoveQueue = [];
    this.star = star;
    this.player = player;

    this.allDeadHandlers = new HandlerStack();
    this.impactHandlers = new HandlerStack(); // returnerar damage när enemies träffas star och ger damage (+ ev andra händelser då enemy krockar med damage)

    for(var i = 0; i < enemyCount; i++){
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
        var speed = enemyVelocity * speedVar;

        var enemy = new Enemy(x, y, speed, this.star);
        enemy.removeMeHandler = new Handler(this.removeEnemyHandler, this);
        enemy.impactHandler = new Handler(this.enemyImpactHandler, this);

        this.enemies.push(enemy);
    }
}

Swarm.prototype.enemyImpactHandler = function(enemy){
    this.impactHandlers.handlerCall(enemy.damage);
};

Swarm.prototype.isTargeted = function(enemy){
    // kollar så redan inte under beskjuting
    for(var i = 0; i < this.targetedEnemies.length; i++) {
        if (this.targetedEnemies[i] === enemy) {
            return true;
        }
        break;
    }
    return false;
}

Swarm.prototype.markAsTargeted = function(enemy){
    this.targetedEnemies.push(enemy);
}

Swarm.prototype.hitTest = function(){

}

Swarm.prototype.removeEnemyHandler = function(enemy){
    this.enemiesRemoveQueue.push(enemy);
};

Swarm.prototype.removeEnemy = function(enemy){
    for(var i = 0; i < this.targetedEnemies.length; i++) {
        if (this.targetedEnemies[i] === enemy) {
            this.targetedEnemies.splice(i, 1);
        }
    }
    for(var i = 0; i < this.enemies.length; i++) {
        if(this.enemies[i] === enemy){
            //console.log("REMOVING ENEMY");
            this.enemies.splice(i, 1);

            if(this.enemies.length < 1){
                console.log("Swarm: ALL DEAD :O");
                this.allDeadHandlers.handlerCall(this);
            }
        }
    }
};

Swarm.prototype.update = function(){
    // removes enemies
    for(var i = 0; i < this.enemiesRemoveQueue.length; i++) {
        this.removeEnemy(this.enemiesRemoveQueue[i]);
    }
    this.enemiesRemoveQueue = [];

    for(var i = 0; i < this.enemies.length; i++) {
        var enemy = this.enemies[i];
        enemy.update();

        // krocktestar allt i den här loopen för optimering

        // "krock" med player (aktiverar laser)
        if(!enemy.targeted){
            if(Vector.distance(this.player.pod.pos, enemy.pos) < this.player.turret.triggerRange){
                console.log("KROCK");
                enemy.targeted = true;
                this.player.shoot(enemy);
            }
        }

    }
};

Swarm.prototype.draw = function(){
    for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].draw(SDCONFIG.drawOptions);
    }
};
