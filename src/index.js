const raspi = require('raspi');
const LedStrip = require('./models/led-strip');

raspi.init(() => {
  let strip = new LedStrip();
  strip.setColor(100,0,0,0);
});
