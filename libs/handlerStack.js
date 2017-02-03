function HandlerStack(){
    this.stack = [];
}

HandlerStack.prototype.addHandler = function(handlerObject){
    this.stack.push(handlerObject);
};

HandlerStack.prototype.add = function(handler, context){
    if(!context){
        context = null;
    }
    this.stack.push(new Handler(handler, context));
};

HandlerStack.prototype.handlerCall = function(data1, data2, data3){
    for(var i = 0; i < this.stack.length; i++){
        this.stack[i].handlerCall(data1, data2, data3);
    }
};
