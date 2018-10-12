require("dotenv").config();

let ArtBot = require('./src/bot');
require('./src/web')(ArtBot);
