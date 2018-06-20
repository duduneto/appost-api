const server = require('./src/config/server.js');
require('./src/config/database');
require('./src/config/routes')(server);