const raspi = require('raspi');
const gpio = require('raspi-gpio');
const pwm = require('raspi-soft-pwm');

const RED_GPIO = 'GPIO6';
const GREEN_GPIO = 'GPIO13';
const BLUE_GPIO = 'GPIO5';


class LedStrip {

    constructor(redPin, greenPin, bluePin) {
        this.__redPin = new pwm.PWM(redPin || RED_GPIO);
        this.__greenPin = new pwm.PWM(greenPin || GREEN_GPIO);
        this.__bluePin = new pwm.PWM(bluePin || BLUE_GPIO);
    }

    setColor(r, g, b) {
        this.__redPin.write(r / 255);
        this.__greenPin(g / 255);
        this.__bluePin(b / 255);
    }


}

module.exports = LedStrip;