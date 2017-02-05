function EnergySystem(star){
    this.star = star;

    //this.turrets = [];
    //this.magnets = [];
    this.consumers = [];

    this.total = 0;
}

EnergySystem.prototype.registerConsumer = function(posObjectWithEnergy){ // objekt med .pos (Vector) och .energy (Energy)
    console.log("E: Registered cunsumer!!!");
    posObjectWithEnergy.energy.fillMax(); // value = 0 från början, får max här att "visa" online i systemet
    this.star.energy.value -= posObjectWithEnergy.energy.max;
    this.consumers.push(posObjectWithEnergy);
}



EnergySystem.prototype.update = function(){
    this.total = this.star.energy.value;

    for(var i = 0; i < this.consumers.length; i++) {
        var consumer = this.consumers[i];
        this.total += consumer.energy.value;

        if(consumer.energy.value <= 0){
            console.log("energy empty, fill Up");
            consumer.energy.fillMax();
            this.star.energy.value -= consumer.energy.max;
        }
    }

    //console.log("E star:"+ this.star.energy.value);
    //console.log("E system:"+ this.totalValue);
}
