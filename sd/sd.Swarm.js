function Swarm(star, player, turrets, magnets, enemies){ // angleList: [[startAng, endAng], [startAng, endAng]]

    this.enemies = enemies;
    this.targetedEnemies = []; // en array med enenmies som är under besjutning och inte ska tas med leta-target-algoritmer (förrän damage på enenmies läggs till)
    this.enemiesRemoveQueue = [];
    this.star = star;
    this.player = player;
    this.turrets = turrets;
    this.magnets = magnets;

    this.allDeadHandlers = new HandlerStack();
    this.impactHandlers = new HandlerStack(); // returnerar damage när enemies träffas star och ger damage (+ ev andra händelser då enemy krockar med damage)

    // adding handlers
    for(var i = 0; i < this.enemies.length; i++) {
        var enemy = this.enemies[i];
        enemy.removeMeHandler = new Handler(this.removeEnemyHandler, this);
        enemy.impactHandler = new Handler(this.enemyImpactHandler, this);
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
                console.log("SwarmControl: ALL DEAD :O");
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
