const restful = require('node-restful');
const mongoose = restful.mongoose;

const matchSchema = new mongoose.Schema({
    
    event: { type: String, required: true },
    abbreviation_match: { type: String, required: true },
    fifa_id: { type: String, required: true},
    match_date: { type: String, required: true },
    home_team: { type: String, required: true},
    away_team: { type: String, required: true},
    completed: { type: Boolean, required:true},
    
    
});

module.exports = restful.model('Match', matchSchema);