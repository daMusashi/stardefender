function Handler(handler, handlerContext){
    this.handler = handler;
    if(!handlerContext){
        handlerContext = null;
    }
    this.context = handlerContext;

}

Handler.prototype.handlerCall = function(data1, data2, data3){
    if(this.context){
        this.handler.call(this.context, data1, data2, data3);
    } else {
        this.handler(data1, data2, data3);
    }
};
