const config = require('./config.js');

const express = require('express');
const app = express();

const router = require('./routes/index.js');

app.use('/public', express.static(__dirname + '/public'));
app.use('/', router);

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});