const raspi = require('raspi');
const gpio = require('raspi-gpio');
const pwm = require('raspi-soft-pwm');

const RED_GPIO = 'GPIO13';
const GREEN_GPIO = 'GPIO6';
const BLUE_GPIO = 'GPIO5';


class LedStrip {


    constructor(redPin, greenPin, bluePin) {
        this.__redPin = new pwm.SoftPWM(redPin || RED_GPIO);
        this.__greenPin = new pwm.SoftPWM(greenPin || GREEN_GPIO);
        this.__bluePin = new pwm.SoftPWM(bluePin || BLUE_GPIO);

        this.__fadeInterval = null;
    }

    setColor(color) {
        const { red = 0, green = 0, blue = 0 } = color;

        this.__redPin.write(red / 255);
        this.__greenPin.write(green / 255);
        this.__bluePin.write(blue / 255);
    }

    fade(startColor, endColor, time = 1000) {
        const { red: startRed = 0, green: startGreen = 0, blue: startBlue = 0 } = startColor;
        const { red: endRed = 0, green: endGreen = 0, blue: endBlue = 0 } = endColor;

        const intervalTime = 1;

        let dr = intervalTime * (endRed - startRed) / time;
        let dg = intervalTime * (endGreen - startGreen) / time;
        let db = intervalTime * (endBlue - startBlue) / time ;

        let red = startRed;
        let green = startGreen;
        let blue = startBlue;

        const fadeFunction = () => {
            const color = {
                red: Math.pow(red / 255, 2.2) * 255,
                green: Math.pow(green / 255, 2.2) * 255,
                blue: Math.pow(blue / 255, 2.2) * 255,
            };

            this.setColor(color);

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
