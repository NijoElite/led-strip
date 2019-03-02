const pwm = require('raspi-soft-pwm');

const RED_GPIO = 'GPIO12';
const GREEN_GPIO = 'GPIO6';
const BLUE_GPIO = 'GPIO5';

const singleton = Symbol();
const singletonEnforcer = Symbol();

// Color {red, green, blue}
// Mode: color || fade

class LedStrip {

    constructor(enforcer, redPin, greenPin, bluePin) {
        if (singletonEnforcer !== singletonEnforcer) {
            throw new Error("Instantiation failed: use Singleton.getInstance() instead of new.");
        }

        this.__redPin = new pwm.SoftPWM(redPin || RED_GPIO);
        this.__greenPin = new pwm.SoftPWM(greenPin || GREEN_GPIO);
        this.__bluePin = new pwm.SoftPWM(bluePin || BLUE_GPIO);

        this.__mode = 'off';
        this.__color = {red: 0, green: 0, blue: 0};

        this.__fadeInterval = null;
    }

    static get instance() {
        if (!this[singleton])
            this[singleton] = new LedStrip(singletonEnforcer);
        return this[singleton];
    }

    get color() {
        return {
            red: this.__color.red,
            green: this.__color.green,
            blue: this.__color.blue,
        };
    }

    get mode() {
        return this.__mode;
    }

    __changeColor(color) {
        const { red = 0, green = 0, blue = 0 } = color;

        this.__redPin.write(red / 255);
        this.__greenPin.write(green / 255);
        this.__bluePin.write(blue / 255);
    }

    setColor(color) {
        this.stopFade();
        this.__mode = 'color';

        this.__changeColor(color);
    }

    fade(startColor, endColor, time = 1000) {
        this.__mode = 'fade';
        this.stopFade();

        const { red: startRed = 0, green: startGreen = 0, blue: startBlue = 0 } = startColor;
        const { red: endRed = 0, green: endGreen = 0, blue: endBlue = 0 } = endColor;

        //  x = t * (x2 - x1)  + x1
        // если из (5,0,0) в (0,0,0)
        // t * (0-5) + 5 = -5t + 5

        const intervalTime = 1;

        let red = startRed;
        let green = startGreen;
        let blue = startBlue;

        let t = 0;
        let dt =  intervalTime / time;

        const fadeFunction = () => {
            this.__changeColor({
                red: Math.pow(red / 255, 2.2) * 255,
                green: Math.pow(green / 255, 2.2) * 255,
                blue: Math.pow(blue / 255, 2.2) * 255,
            });

            if (t >= 1.0 || t <= 0 || t + dt > 1.0 || t + dt < 0) dt *=-1;
            t += dt;

            red   = t * (endRed - startRed)     + startRed;
            green = t * (endGreen - startGreen) + startGreen;
            blue  = t * (endBlue - startBlue)   + startBlue;
        };

        this.__fadeInterval = setInterval(fadeFunction.bind(this), intervalTime);
    }

    stopFade() {
        clearInterval(this.__fadeInterval);
    }

}

module.exports = LedStrip;
