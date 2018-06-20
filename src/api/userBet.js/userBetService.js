const UserBet = require('./user');
const errorHandler = require('../common/errorHandler');

UserBet.methods(['get', 'post', 'delete', 'put']);
UserBet.updateOptions({new : true});
UserBet.after('post', errorHandler).after('put', errorHandler);

module.exports = UserBet;