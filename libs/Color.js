// Martin Nilsson, 2017

function Color(rOrGreyscaleOrRgbArr, gOrAlfa, b, alfa){
    // greyscale (0-255)
    // eller r, g, b
    // eller r, g, b, alfa
    // eller [r, g, b]
    // eller [r, g, b, alfa]
    // eller [r, g, b], alfa
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;

    if(rOrGreyscaleOrRgbArr) {
        if (typeof rOrGreyscaleOrRgbArr === 'object') {
            // array

            // [r, g, b]
            this.r = rOrGreyscaleOrRgbArr[0];
            this.g = rOrGreyscaleOrRgbArr[1];
            this.b = rOrGreyscaleOrRgbArr[2];
            if (rOrGreyscaleOrRgbArr.length == 4) {
                // [r, g, b, alfa]
                this.a = rOrGreyscaleOrRgbArr[3];
            }
            if (gOrAlfa) {
                // [r, g, b], alfa
                this.a = gOrAlfa;
            }
        } else {
            // ingen array
            this.r = rOrGreyscaleOrRgbArr;
            if (!gOrAlfa) {
                // greyscale (0-255)
                this.g = rOrGreyscaleOrRgbArr;
                this.b = rOrGreyscaleOrRgbArr
            } else {
                // r, g, b
                this.g = gOrAlfa;
                this.b = b;
                if (alfa) {
                    // r, g, b, alfa
                    this.a = alfa;
                }
            }
        }
    }
}

// statics

// brightness/darkness med procent (0-100)
// från http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
Color.shadedCopy = function(color, percent) { // percent 0-100
    var c, t, p;
    c = new Color();
    c.a = color.a;

    percent = (percent/100).toFixed(2);

    if(percent < 0){
        t = 0;
        percent *= -1;
    } else {
        t = 255;
    }

    c.r = Math.round((t-color.r)*percent)+color.r;
    c.g = Math.round((t-color.g)*percent)+color.g;
    c.b = Math.round((t-color.b)*percent)+color.b;

    return c;
}

// blandar två färger med  procent (0-100)
// från http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
Color.blendedCopy = function(color1, color2, percent) { // percent 0-100
    var c = new Color();

    percent = (percent/100).toFixed(2);

    c.r = Math.round((color2.r-color1.r)*percent)+color1.r;
    c.g = Math.round((color2.g-color1.g)*percent)+color1.g;
    c.b = Math.round((color2.b-color1.b)*percent)+color1.b;

    if(color1.a < color2.a){
        c.a = color1.a;
    } else {
        c.a = color2.a;
    }

    return c;
}

// Locals

Color.prototype.copy = function(){
    return new Color(this.r, this.g, this.b, this.a);
}

Color.prototype.shade = function(percent){
    var c = Color.shadedCopy(this, percent);
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
}

Color.prototype.blend = function(color, percent){
    var c = Color.blendedCopy(this, color, percent);
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
}

Color.prototype.shadeCycle = function(percent, cycle){
    // TODO
}


// getters

Color.prototype.getHex = function(){
    return "#"+this.r.toString(16)+this.g.toString(16)+this.b.toString(16);
}

Color.prototype.getCSS = function(){
    var c = "rgb("+this.r+", "+this.g+", "+this.b+")";
    if(this.a < 1){
        c = "rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")";
    }
    return c;
}

Color.prototype.toString = function(){
    var str = "Color ["+this.r+", "+this.g+", "+this.b;
    if(this.a < 1){
        str += ", "+this.a;
    }
    str += "]";

    return str;
}
