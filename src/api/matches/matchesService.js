const Match = require('./match');
const axios = require('axios');




const sendErrorsFromDB = (res, dbErrors) => {
    const
        errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return
    res.status(400).json({ errors })
}

const getMatches = (req, resp, next) => {
    var matchesArray = undefined;

    axios.get('http://worldcup.sfg.io/matches')
    .then( res => {
        matchesArray = res.data;
        return resp.send(matchesArray);
    })
}

const saveMatches = (req, resp, next) => {
    var matchesArray = [];

    axios.get('http://worldcup.sfg.io/matches')
    .then( res => {
        matchesArray = res.data;
        matchesArray.forEach(match => {
            const event = 'WorldCup'
            const abbreviation_match = `${match.home_team.code} X ${match.away_team.code}`;
            const fifa_id = match.fifa_id;
            const match_date = match.datetime;
            const home_team = match.home_team.country;
            const away_team = match.away_team.country;
            var completed = null;

            if( match.status != 'completed' ){
                completed = false;
            } else {
                completed = true;
            }
            match = new Match({ event, abbreviation_match, fifa_id, match_date, home_team, away_team, completed});
            match.save( err => {
                if(!err){
                    
                }else{
                    return sendErrorsFromDB(res, err);
                    resp.status(400).send({err:['Match not saved']});
                }
            })
            
        });
    })
}

const deleteMatches = () => {
    Match.remove(err => {
        if(err){
            resp.send('Houve Erro');
        }else {
            resp.send('Deletado');
        }
    });
}

module.exports = { getMatches, saveMatches, deleteMatches};
