const pwm = require('raspi-soft-pwm');

const RED_GPIO = 'GPIO13';
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

        const { red: startRed = 0, green: startGreen = 0, blue: startBlue = 0 } = startColor;
        const { red: endRed = 0, green: endGreen = 0, blue: endBlue = 0 } = endColor;

        const intervalTime = 1;

        let dr = Math.abs(intervalTime * (endRed - startRed) / time);
        let dg = Math.abs(intervalTime * (endGreen - startGreen) / time);
        let db = Math.abs(intervalTime * (endBlue - startBlue) / time);

        let red = startRed;
        let green = startGreen;
        let blue = startBlue;

        const fadeFunction = () => {
            const color = {
                red: Math.pow(red / 255, 2.2) * 255,
                green: Math.pow(green / 255, 2.2) * 255,
                blue: Math.pow(blue / 255, 2.2) * 255,
            };

            this.__changeColor(color);

            red += dr;
            green += dg;
            blue += db;

            if ((red > endRed && dr > 0) || (red < startRed && dr < 0)) {
                red = dr > 0 ? endRed : startRed;

                dr *= -1;
            }
            if ((green > endGreen && dg > 0) || (green < startGreen && dg < 0)) {
                green = dg > 0 ? endGreen : startGreen;

                dg *= -1;
            }
            if ((blue > endBlue && db > 0) || (blue < startBlue && db < 0)) {
                blue = db > 0 ? endBlue : startBlue;

                db *= -1;
            }
        };

        this.__fadeInterval = setInterval(fadeFunction.bind(this), intervalTime);
    }

    stopFade() {
        if (!this.__fadeInterval || !this.__fadeInterval.clearInterval) {
            return;
        }

        this.__fadeInterval.clearInterval();
    }

}

module.exports = LedStrip;
