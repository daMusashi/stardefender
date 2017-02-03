function CONFIG(){
    this.canvasHeight = 600;
    this.canvasWidth = 600;

    // game values / balance
    this.starHealth = 1000;
    this.enenmyDamage = 8;

    // utseende

    this.starSize = 100;
    this.starColor = [223, 244, 66];

    this.hotzonesColor = [52, 155, 66];
    this.hotzonesColorAlfa = 25;

    // beräknar avståndet 0,0 star.pos (mitten) som används till lite allt möjligt för enemy, bland annat spawn-avstånd
    // beräknar och sparar en gång för alla i config för att spara kraft
    this.swarmSpawnLength = Vector.distance(new Vector(this.canvasWidth/2, this.canvasHeight/2), new Vector(0, 0));
    this.swarmOutOfBounds = this.swarmSpawnLength * 1.5; // Avstånd från star när en enemy är för långt borta och koden "tappat kontrollen" över den, bör inte inträffa, men ändå

    this.enemiesStartNum = 50; // start num - ökas parametrisk i levels
    this.enemiesStartVel = 0.3;  // def 0.2 start vel - ökas parametrisk i levels
    this.enemiesVelVariation = 0.2;  // % variation av hastighet

    this.enemiesImpactColorFill = [240, 0, 0];
    this.enemiesImpactColorStroke = [242, 128, 36];
    this.enemiesImpactLength = 70;  // frames för impact-anim
    this.enemiesImpactSize = 30;
    this.enemiesImpactStroke = 1;

    this.enemiesDieLength = 50;  // frames för die-anim

    this.playerHaloColor = [66, 134, 244, 100];
    this.playerHaloSize = this.starSize * 2.5;
    this.playerHaloStrokeSize = 1;

    this.playerPodColor = [88, 113, 153];
    this.playerPodBodySize = [18, 8]; // w, h längs halo
    this.playerPodAngleVel = 0.02;
    this.playerPodJetColor = [24, 243, 247];
    this.playerPodJetWidth = 1;
    this.playerPodJetLength = 4;

    this.playerPodTurretSize = this.playerPodBodySize[1]*1.5;
    this.playerPodTurretCooldown = 3000; // millisekunder för kortaste tid mellan varje laser
    this.playerPodTurretColor = [88, 113, 153];
    this.playerPodTurretLaserColor = [11, 218, 229];
    this.playerPodTurretTriggerRange = this.starSize;


}
