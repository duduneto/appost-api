const Match = require('./match');
const errorHandler = require('../common/errorHandler');

Match.methods(['get', 'post', 'delete']);
Match.updateOptions({new : true});
Match.after('post', errorHandler).after('put', errorHandler);

module.exports = Match;