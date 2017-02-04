function Cooldown(millisec){ // använd Handler-objektet för att hantera callbackens scope
    this.time = millisec;
    this.endCallbackHandler = null; // sätt utifrån vid behov - använd Handler-objektet för att hantera callbackens scope
    this.progressCallbackHandler = null; // sätt utifrån vid behov - använd Handler-objektet för att hantera callbackens scope

    this.interval = null;
    this.intervalStep = SDCONFIG.coolDownIntervalStep;
    this.intervalValue = 0; // räknar tiden. Konverteras mha time till progress 0-1
    this.progress = 0; // progress pågående cooldown 0-1 (> 0 = active)

    this.active = false;
}

Cooldown.prototype._stepper = function(){
    this.intervalValue += this.intervalStep;
    this.progress = this.intervalValue/this.time;

    if(this.progressCallback){
        this.progressCallback.handlerCall();
    }
    // cooldown färdig (end)
    if(this.intervalValue >= this.time){
        //console.log("Cooldown END");
        this._reset();
        clearInterval(this.interval);

        if(this.endCallbackHandler) {
            this.endCallback.handlerCall();
        }
    }
    //console.log("Cooldown "+this.progress+ " "+this.intervalValue+"/"+this.time);
}

Cooldown.prototype._reset = function(){
    this.intervalValue = 0;
    this.progress = 0;
    this.active = false;
}

Cooldown.prototype.start = function(){
    //console.log("Cooldown START");
    if(!this.active) {
        this._reset();
        this.active = true;

        var me = this; // this kommer vara objektet window när interval-funktionen körs, " lägger referens till detta objekt i me istället.
        this.interval = setInterval(function () {
            me._stepper();
        }, this.intervalStep);
    }
}

Cooldown.prototype.pause = function(){
    clearInterval(this.interval);
}

Cooldown.prototype.unpause = function(){
    this.interval = setInterval(function () {
        me._stepper();
    }, this.intervalStep);
}
