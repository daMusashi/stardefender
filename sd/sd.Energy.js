function Energy(maxEnergy, growRate){
    this.max = maxEnergy;
    this.value = 0; // får max av EnergySystem vid registrering (felkontroll för att upptäcka oregistrerade)
    this.grow = growRate || 0;

    this.empty = true;

    // EnergySystem kontrollera värden själv
    /*this.emptyCallbackHandler = null; // när energy når <= 0 - sätt utifrån vid behov - använd Handler-objektet för att hantera callbackens scope
    this.fullCallbackHandler = null; // när energy når >= max - sätt utifrån vid behov - använd Handler-objektet för att hantera callbackens scope
    this.progressCallbackHandler = null; // sätt utifrån vid behov - använd Handler-objektet för att hantera callbackens scope */

}

Energy.prototype.fillMax = function(){
    this.value = this.max;
}

Energy.prototype.update = function(){
    this.value += this.grow;

    // EnergySystem kontrollera värden själv
    /*if(this.progressCallback){
        this.progressCallback.handlerCall(this);
    }*/
    // tömd/empty
    if(this.value <= 0){
        this.value = 0;
        this.empty = true;
        // EnergySystem kontrollera värden själv
        /*if(this.emptyCallbackHandler) {
            this.emptyCallbackHandler.handlerCall(this);
        }*/
    } else {
        this.empty = false;
    }
    // full
    if(this.value >= this.max){
        this.value = this.max;
        // EnergySystem kontrollera värden själv
        /*if(this.fullCallbackHandler) {
            this.fullCallbackHandler.handlerCall(this);
        }*/
    }

};

Energy.prototype.canIUse = function(value){
    if(value <= this.value){
        this.empty = false;
        return true;
    } else {
        this.empty = true;
        return false;
    }
}
