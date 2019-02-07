const raspi = require('raspi');
const gpio = require('raspi-gpio');

raspi.init(() => {
  const output = new gpio.DigitalOutput('GPIO5');

  output.write(0);
});
