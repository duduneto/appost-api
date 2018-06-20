const express = require('express');
const axios = require('axios');

module.exports = (server) => {

    const openApi = express.Router();
    server.use('/oapi', openApi )
    
    // openApi.get('/login', (req, resp, next) => {
    //     axios.get('http://worldcup.sfg.io/matches')
    //     .then( (res) => {
    //         const resposta = res.data;
    //         var jogosCompleted = [];
    //         for (let index = 0; index < resposta.length; index++) {
    //             const jogo = resposta[index];
    //             if(jogo.status == 'completed'){
    //                 jogosCompleted.push(jogo);
    //             } 
    //         }
    //         resp.send(jogosCompleted);
    //     });
    // })
    const AuthService = require('../api/user/authService');
        openApi.post('/signup', AuthService.signup);
        openApi.post('/login', AuthService.login);
        openApi.post('/validateToken', AuthService.validateToken);

    const Matches = require('../api/matches/matchesService');
        openApi.get('/saveMatches',Matches.saveMatches);
        openApi.get('/getMatches',Matches.getMatches);
        //Cuidado pois dá Crash no DELETE
        openApi.delete('/deleteMatches', Matches.deleteMatches);

    const User = require('../api/user/userService');
    User.register(openApi, '/usuario');

    const Match = require('../api/matches/matchService');
    Match.register(openApi, '/matches');
}
                    
                