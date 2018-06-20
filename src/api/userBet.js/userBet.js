const restful = require('node-restful');
const mongoose = restful.mongoose;

const userBetSchema = new mongoose.Schema({
    event: {type: String, required: true},
    abbreviation_match:{ type: String, required: true},
    fifa_id: { type: String, required: true },
    user_id: { type: String, required: true },
    home_team_country:{ type: String},
    away_team_country:{ type: String},
    home_team_goal:{ type: Number, required: true},
    away_team_goal:{ type: Number, required: true}
    
});

module.exports = restful.model('UserBet', userSchema);