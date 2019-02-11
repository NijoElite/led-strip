const raspi = require('raspi');
const gpio = require('raspi-gpio');
const pwm = require('raspi-soft-pwm');

const RED_GPIO = 'GPIO13';
const GREEN_GPIO = 'GPIO6';
const BLUE_GPIO = 'GPIO5';


class LedStrip {

    constructor(redPin, greenPin, bluePin) {
        this.__redPin = new pwm.SoftPWM(RED_GPIO);
        this.__greenPin = new pwm.SoftPWM(GREEN_GPIO);
        this.__bluePin = new pwm.SoftPWM(BLUE_GPIO);
    }

    setColor(r, g, b) {
	const minLvl = 0;
        this.__redPin.write(Math.max(r, minLvl) / 255);
        this.__greenPin.write(Math.max(g, minLvl) / 255);
        this.__bluePin.write(Math.max(b, minLvl) / 255);
    }


}

module.exports = LedStrip;
