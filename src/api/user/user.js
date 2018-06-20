const restful = require('node-restful');
const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6 },
    adm: {type: Boolean, default: false },
    scores: {type: Number, default: 0 }
    
});

module.exports = restful.model('User', userSchema);