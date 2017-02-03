/**
 * Enkel vektorklass
 * Martin Nilsson, 2015-09-01
 *
 * Kan avändas både som 
 * - polär vektor (längd, vinkel) - används oftast till hastigheter och krafter (motor, graviation, friktion etc)
 * - koordinat-vektor (x, y) - används oftast till position
 * - unit-vektor (1 > x > -1, 1 > y > -1) (varje värde minst -1 och max 1) - används oftast för riktning (att användas i andra vektorberäkningar)
 * 
 * En vektor används oftast som en polär vektor (längd, vinkel), 
 * men beräkningar sker oftast på dess "uppbrytna" version, en koordinat-vektor (x-längd, y-längd)
 * Datan (x, y) sparas därför i classen som KOORDINAT-VEKTOR, sedan finns funktioner som sätter/hämtar (konverterar in/ut) som de andra typerna.
 *
 * En del funktioner har en statisk variant, då ingen vektor behövs innan, eller 
 * man helt klart vill ha en kopia, t.ex när man vill normalisera en vektor (konvertera till unit-vektor) - man vill i regel ha kvar originalet.
 */

Vector = function(x, y){
	var _x = x || 0;
	var _y = y || 0;
	//console.log("x: "+_x);
	//console.log("y: "+_y);
	
	Object.defineProperty(this, "x", {  
    	get: function() { 
    		return _x; 
    	},
    	set: function(value) { 
    		_x = value; 
  		}
  	});

  	Object.defineProperty(this, "y", {  
    	get: function() { 
    		return _y; 
    	},
    	set: function(value) { 
    		_y = value; 
  		}
  	});

  	Object.defineProperty(this, "length",{  
    	get: function() { 
    		return Math.sqrt(_x*_x + _y*_y); 
    	},
    	set: function(value) { 
    		var a = this.angle;
    		_x = value * Math.cos(a);
    		_y = value * Math.sin(a);
  		}
  	});

  	Object.defineProperty(this, "angle",{  
    	get: function() { 
            return Math.atan2(_y,_x);
    	},
    	set: function(value) { 
    		var l = this.length;
    		_x = l * Math.cos(value);
    		_y = l * Math.sin(value);
  		}
  	});
}


// Funktioner som sätter/hämtar (konverterar in/ut) egenskaper för POLÄRA VEKTORER

Vector.prototype.set = function(v){
	this.x = v.x;
	this.y = v.y;
};

Vector.prototype.setPolar = function(angle, length){
    this.x = length * Math.cos(angle);
    this.y = length * Math.sin(angle);
};

Vector.prototype.clone = function(v){
    return new Vector(this.x, this.y);
};


// Vektor-matte

/**
 * Roterar en koordinat-vektor (egentligen punkt) runt en annan punkt
 * @param  {Vector} v Vektorn (koordinat-vektor/punkt)
 * @param  {number} x x-värde för rotations-punkt
 * @param  {number} y y-värde för rotations-punkt
 * @param  {number} angle radianer att rotera
 * @return {Vector}   En ny vector med roterad koordinat-vektor (punkt)
 *
 * källa: http://stackoverflow.com/questions/786472/rotate-a-point-by-another-point-in-2d
 */
// Statisk version
Vector.rotate = function(v, x, y, angle){
    var newX = Math.cos(angle) * (v.x - x) - Math.sin(v.y - y) + x;
    var newY = Math.sin(angle) * (v.x - x) + Math.cos(v.y - y) + x;
    return new Vector(newX, newY);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.rotate = function(x, y, angle){
    this.set(Vector.rotate(this, x, y, angle));
};

/**
 * Ser till att length är max value
 * @param  {Vector} v Vektorn
 * @param  {number} value värde som length sätts till om length är större än detta
 * @return {Vector}   En ny vector som vars längd är = || < value
 */
// Statisk version
Vector.limit = function(v, value){
    if(v.length > value){
        var nV = new Vector(v.x, v.y);
        nV.length = value;
        return nV;
    } else {
        return new Vector(v.x, v.y);
    }
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.limit = function(value){
    this.set(Vector.limit(this, value));
};


/**
 * Muliplicerar en vektor med ett värde
 * @param  {Vector} v Vektorn
 * @param  {number} value Värde att mulitplicera vektorn med
 * @return {Vector}   En ny vector som är v * värde
 */
// Statisk version
Vector.multValue = function(v, value){
	return new Vector(v.x * value, v.y * value);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.multValue = function(value){
	this.set(Vector.multValue(this, value));
};


/**
 * Muliplicerar två vektorer
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {Vector}   En ny vector som är v1 * v2
 */
// Statisk version
Vector.mult = function(v1, v2){
    Vector.warnNotVector(v1, "mult");
    Vector.warnNotVector(v2, "mult");
    return new Vector(v1.x * v2.x, v1.y * v2.y);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.mult = function(v){
    Vector.warnNotVector(v, "mult");
    this.set(Vector.mult(this, v));
};

/**
 * Dividerar en vektor med ett värde
 * @param  {Vector} v Vektorn
 * @param  {number} value Värde att dividera vektorn med
 * @return {Vector}   En ny vector som är v / värde
 */
// Statisk version
Vector.divValue = function(v, value){
    return new Vector(v.x / value, v.y / value);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.divValue = function(value){
    this.set(Vector.divValue(this, value));
};


/**
 * Dividerartvå vektorer
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {Vector}   En ny vector som är v1 / v2
 */
// Statisk version
Vector.div = function(v1, v2){
    Vector.warnNotVector(v1, "div");
    Vector.warnNotVector(v2, "div");
    return new Vector(v1.x / v2.x, v1.y / v2.y);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.div = function(v){
    Vector.warnNotVector(v, "div");
    this.set(Vector.div(this, v));
};

/**
 * Beräknar vinkeln mellan vektorer, i radianer.
 *
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {number} vinkeln i radianer
 */
// Statisk (endast)
Vector.angleBetween = function(v1, v2){
    Vector.warnNotVector(v1, " v1 angleBetween");
    Vector.warnNotVector(v2, " v2 angleBetween");
	var deltaV = Vector.minus(v2, v1);
	return deltaV.angle;
};
// Lokal version
Vector.prototype.angleBetween = function(v){
    Vector.warnNotVector(v, "angleBetween");
    return Vector.angleBetween(this, v);
};

/**
 * Beräknar dot-produkten av två vektorer. Det innebär i praktiken de två magnituderna multiplceras och sedan körs genom cosinus.
 * Dot produkten innebär olika saker beroende på om det är en polär eller koordinat-vektor.
 * För polära vektorer innebär det att man projekterar den ena vektorn på den andra (hur lång den blir "på" den andra).
 * Dot-produkten används främst till andra vektor-beräkningar.
 * 
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {number}  Dot-produkt (för polära: första vektorns projekterade längd på den andra)
 */
// Statisk (endast)
Vector.dot = function(v1, v2){
	return (v1.x * v2.x) + (v1.y * v2.y);
};


/**
 * "Flippar" (vänder 180 grader/PI radianer) en polär vektor
 * @param  {Vector} v Vektor som ska flippas
 * @return {Vector}  En ny flippad polär vektor
 */
// statisk version
Vector.reverse = function(v){
	var vr = new Vector();
	vr.x = 0 - v.x;
	vr.y = 0 - v.y;
	return vr;
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.reverse = function(){
	this.set(Vector.reverse(this));
};


/**
 * Addera två vektorer
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {Vector}   En ny vector som är v1 + v2
 */
// Statisk version
Vector.plus = function(v1, v2){
	Vector.warnNotVector(v1, "plus");
    Vector.warnNotVector(v2, "plus");
    return new Vector(v1.x + v2.x, v1.y + v2.y);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.plus = function(v){
	Vector.warnNotVector(v, "plus");
    this.set(Vector.plus(this, v));
};

/**
 * Subtraherar två vektorer
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {Vector}   En ny vector som är v1 - v2
 */
// Statisk version
Vector.minus = function(v1, v2){
	Vector.warnNotVector(v1, "minus");
    Vector.warnNotVector(v2, "minus");
    return new Vector(v1.x - v2.x, v1.y - v2.y);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.minus = function(v){
	Vector.warnNotVector(v, "minus");
    this.set(Vector.minus(this, v));
};

/**
 * Subtraherar ett värde från vektor
 * @param  {Vector} v Vektorn
 * @param  {number} value Värde att subtrahera från vektorn
 * @return {Vector}   En ny vector som är v - värde
 */
// Statisk version
Vector.minusValue = function(v, value){
	return new Vector(v.x - value, v.y - value);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.minusValue = function(value){
	this.set(Vector.minusValue(this, value));
};


/**
 * Ger avståndet mellan två koordinat-vektorer (den lokala funktionen mäter mot detta objekt)
 * 
 * @param  {Vector} v1 Första vektorn
 * @param  {Vector} v2 Andra vektorn
 * @return {number}  Dot-produkt (för polära: första vektorns projekterade längd på den andra)
 */
// Statisk version
Vector.distance = function(v1, v2){
	var xPow2 = Math.pow((v2.x-v1.x), 2);
	var yPow2 = Math.pow((v2.y-v1.y), 2);
	return Math.sqrt(xPow2 + yPow2);
};
// Lokal version
Vector.prototype.distance = function(v){
	return Vector.distance(this, v);
};

/**
 * Konverterar en vektor till en unit-vektor (1= max, -1 = min).
 * En unit-vektor beskriver fårhållande och inte absoluta värden.
 * Används t.ex för att beskriva riktning (1,0) = höger, (0,-1) = ned etc.
 * 
 * @return {Vector} En normaliserad vektor (unit-vektor) - lokal funktion konverterar befintlig vektor och returnerar inget
 */
// Statisk version
Vector.normalize = function(v){
	return new Vector(v.x/v.length, v.y/v.length);
};
// Lokal version - inget returneras, objekt-vektorn sparar resultatet
Vector.prototype.normalize = function(){
	this.set(Vector.normalize(this));
};

Vector.prototype.toString = function(){
    var str = "x:" +this.x+ " y:" + this.y + " l:" + this.length + " a:" + this.angle + " (" + (this.angle*(180/Math.PI)) + "deg)";
    return str;
};

Vector.warnNotVector = function(value, source){
    if (typeof value !== 'object') {
        Gamelib.varning("värdet är ingen vektor (Vector."+source+")");
    }
};

