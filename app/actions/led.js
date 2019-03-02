const ledStrip = require('../helpers/led-strip.js').instance;

const manipulateStrip = (data) => {
    if (data.fade === false) {
        ledStrip.setColor({red: +data.color1.red, green: +data.color1.green, blue: +data.color1.blue});
        console.log('Set Color');
    } else
    if (data.fade === true) {
        ledStrip.fade({red: +data.color1.red, green: +data.color1.green, blue: +data.color1.blue},
            {red: +data.color2.red, green: +data.color2.green, blue: +data.color2.blue}, data.duration * 1000);
        console.log('Set Fade');
    }
};

module.exports = { manipulateStrip };



