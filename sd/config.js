function CONFIG(){
    this.canvasHeight = 600;
    this.canvasWidth = 600;

    // game values / balance
    this.starHealth = 1000;
    this.enenmyDamage = 8;

    // utseende

    this.starSize = 100;
    this.starEnergy = 1000;
    this.starEnergyGrowRate = 0.1; // per frame
    this.starColor = [255, 170, 35];
    this.starSecondaryColor = [244, 170, 66];
    this.energyColor = [223, 244, 66];

    this.triggerzonesColor = [52, 155, 66, 0.1];
    this.triggerzonesInactiveColor = [110, 110, 110, 0.1];

    // beräknar avståndet 0,0 star.pos (mitten) som används till lite allt möjligt för enemy, bland annat spawn-avstånd
    // beräknar och sparar en gång för alla i config för att spara kraft
    this.swarmSpawnLength = Vector.distance(new Vector(this.canvasWidth/2, this.canvasHeight/2), new Vector(0, 0));
    this.swarmOutOfBounds = this.swarmSpawnLength * 1.5; // Avstånd från star när en enemy är för långt borta och koden "tappat kontrollen" över den, bör inte inträffa, men ändå

    this.enemiesStartNum = 50; // start num - ökas parametrisk i levels
    this.enemiesStartVel = 0.2;  // def 0.2 start vel - ökas parametrisk i levels
    this.enemiesVelVariation = 0.2;  // % variation av hastighet

    this.enemiesImpactColorFill = [240, 0, 0];
    this.enemiesImpactColorStroke = [242, 128, 36];
    this.enemiesImpactLength = 70;  // frames för impact-anim
    this.enemiesImpactSize = 30;
    this.enemiesImpactStroke = 1;

    this.enemiesDieLength = 50;  // frames för die-anim

    this.coolDownIntervalStep = 100;  // millisekunder - interval för rapportering om cooldown-status tillUI

    this.energyPacketSpeed = 0.5;
    this.energyPacketColor = this.energyColor;

    this.LaserEnergyCost = 5;

    this.playerCursorSize = 8;
    this.playerCursorColor = [242, 124, 21];
    this.playerCursorLineAlfa = 0.5;
    this.playerCursorLineDotSpacing = 5; // inklusive punkten (space = x -1)

    this.playerHaloColor = [66, 134, 244, 0.3];
    this.playerHaloSize = this.starSize * 2.5;
    this.playerHaloStrokeSize = 1;

    this.playerPodColor = [88, 113, 153];
    this.playerPodBodySize = [18, 8]; // w, h längs halo
    this.playerPodAngleVel = 0.02;
    this.playerPodJetColor = [24, 243, 247];
    this.playerPodJetWidth = 1;
    this.playerPodJetLength = 4;


    this.playerTurretSize = this.playerPodBodySize[1]*1.5;
    this.playerTurretBurnLength = 25; // frames
    this.playerTurretMaxEnergy = 100;
    this.playerTurretColor = [88, 113, 153];
    this.playerTurretLaserColor = [95, 66, 244];
    this.playerTurretTriggerRange = this.starSize *0.8;

    this.stationaryTurretBurnLength = 50; // frames
    this.stationaryTurretSize = 8;
    this.stationaryTurretColor = [66, 128, 244];
    this.stationaryTurretLaserColor = [91, 173, 255];
    this.stationaryTurretMaxEnergy = 10; // def 50
    this.stationaryTurretTriggerRange = this.starSize;

    this.magnetColor = this.playerTurretColor;
    this.magnetSize = 12;
    this.magnetForce = 0.1;
    this.magnetMaxEnergy = 50;
    this.magnetBurnRate = 0.1; // energy som går per frame
    this.magnetForceRange = 100;

    // keys
    this.keyPause = 80; // p
    this.keyShowDebugToggle = 68; // d
    this.keyShowTriggerzonesToggle = 84; // t
    this.keyShowTriggerzones = 32; // mellanslag
    this.keyShowCooldowns = 68; // c
}
