function update() {
    const picker1 = document.getElementById('color-1').jscolor;
    const picker2 = document.getElementById('color-2').jscolor;
    const modeEl = document.getElementById('mode');
    console.log('update');

    const fade = modeEl.checked;
    const color1 = {
        red: picker1.rgb[0],
        green: picker1.rgb[1],
        blue: picker1.rgb[2]
    };
    const color2 = {
        red: picker2.rgb[0],
        green: picker2.rgb[1],
        blue: picker2.rgb[2]
    };

    const json = JSON.stringify({
       fade: fade,
       color1: color1,
       color2: color2,
    });
    const request = new XMLHttpRequest();

    request.open('POST', '/led', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(json);
}