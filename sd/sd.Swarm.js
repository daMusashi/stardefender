function Swarm(star, player, turrets, bombs, startAngleDeg, endAngleDeg, enemyCount, enemyVelocity){
    var startAng = radians(startAngleDeg);
    var angLength = radians(endAngleDeg) - startAng;

    this.enemies = [];
    this.targetedEnemies = []; // en array med enenmies som är under besjutning och inte ska tas med leta-target-algoritmer (förrän damage på enenmies läggs till)
    this.enemiesRemoveQueue = [];
    this.star = star;
    this.player = player;
    this.turrets = turrets;
    this.magnets = bombs;

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


// handlers

Swarm.prototype.enemyImpactHandler = function(enemy){
    this.impactHandlers.handlerCall(enemy.damage);
};


Swarm.prototype.removeEnemyHandler = function(enemy){
    this.enemiesRemoveQueue.push(enemy);
};


// update & draw

Swarm.prototype.update = function(){
    // removes enemies
    for(var i = 0; i < this.enemiesRemoveQueue.length; i++) {
        this.removeEnemy(this.enemiesRemoveQueue[i]);
    }
    this.enemiesRemoveQueue = [];

    //sorterar this.enemies efter avstånd till star, närmast först
    // // sorteringsfunktion för array.sort som sorterar efter enemy.distanceToStar, lägst först
    function shortestDistance(a, b){
        if (a.distanceToStar < b.distanceToStar)
            return -1;
        if (a.distanceToStar > b.distanceToStar)
            return 1;
        return 0;
    }
    this.enemies.sort(shortestDistance);

    // huvudloop för enemy-logik, mest koll om i triggerzones
    for(var i = 0; i < this.enemies.length; i++) {
        var enemy = this.enemies[i];

        // krocktestar allt i den här loopen för optimering

        if(!enemy.isTargeted) {

            // if:ar bort enemys för nära star -är ingen idé att börja skjuta på
            if(enemy.distanceToStar > SDCONFIG.stationaryTurretBurnLength){
                if(this.player.turret.active && !this.player.turret.isShooting){
                    // kollar om inom player trigger-zone
                    if (Vector.distance(this.player.pod.pos, enemy.pos) < this.player.turret.triggerRange) {
                        //console.log("in triggerzone - to star [" + enemy.distanceToStar + "]");
                        enemy.inTriggerRange = true;
                        this.player.turret.shoot(enemy);
                    } else {
                        enemy.inTriggerRange = false;
                    }
                }

                // kollar om inom en turret trigger-zone
                var turret = null;
                if(turret = this.turrets.inTriggerRange(enemy)){ // .active & .isShooting kollas i inTriggerRange() false (ingen turret) om de är false resp true
                    enemy.inTriggerRange = true;
                    this.turrets.shoot(turret, enemy);
                } else {
                    enemy.inTriggerRange = false;
                }
            }
        }

        this.magnets.influence(enemy);

        enemy.update();

    }
};

Swarm.prototype.draw = function(drawOptions){
    for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].draw(drawOptions);
    }
};
