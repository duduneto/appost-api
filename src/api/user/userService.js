const User = require('./user');
const errorHandler = require('../common/errorHandler');

User.methods(['get', 'put', 'delete']);
User.updateOptions({new : true});
User.after('post', errorHandler).after('put', errorHandler);

module.exports = User;