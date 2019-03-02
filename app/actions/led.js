const ledStrip = require('../helpers/led-strip.js').instance;

const validateColorData = (data) => {
    const exist = Number.isInteger(+data.red) && Number.isInteger(+data.green) && Number.isInteger(+data.blue);
    const inRange = (+data.red >= 0 && +data.green >= 0 && +data.blue >= 0) &&
        (+data.red <= 255 && +data.green <= 255 && +data.blue <= 255);

    return exist && inRange;
};

const validateFadeData = (data) => {
    const exist = Number.isInteger(+data.red) && Number.isInteger(+data.green) && Number.isInteger(+data.blue) &&
        Number.isInteger(+data.red1) && Number.isInteger(+data.green1) && Number.isInteger(+data.blue1);
    const inRange = (+data.red >= 0 && +data.green >= 0 && +data.blue >= 0) &&
        (+data.red <= 255 && +data.green <= 255 && +data.blue <= 255) &&
        (+data.red1 >= 0 && +data.green1 >= 0 && +data.blue1 >= 0) &&
        (+data.red1 <= 255 && +data.green1 <= 255 && +data.blue1 <= 255);

    return exist && inRange;
};

const manipulateStrip = (data) => {
    if (data.mode === 'color' && validateColorData(data)) {
        ledStrip.setColor({red: +data.red, green: +data.green, blue: +data.blue});
        console.log('Set Color');
    } else
    if (data.mode === 'fade' && validateFadeData(data)) {
        ledStrip.fade({red: +data.red, green: +data.green, blue: +data.blue},
            {red: +data.red1, green: +data.green1, blue: +data.blue1}, 5000);
        console.log('Set Fade');
    } else {
        return false;
    }
    return true;
};

module.exports = { manipulateStrip };



