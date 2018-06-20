const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('../../../.env');
const User = require('./user');
// const getUser = require('./getUser');

User.methods([ 'get' , 'post']);

const emailRegex = /\S+@\S+\.\S+/;
// const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
const passwordRegex = /\d/;


const sendErrorsFromDB = (res, dbErrors) => {
    const
        errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return
    res.status(400).json({ errors })
}



const login = (req, res, next) => {
    console.log(req.body)
    const email = req.body.email || '';
    const password = req.body.password || '';

    // const salt = bcrypt.genSaltSync();
    // const passwordHasheado = bcrypt.hashSync(password, salt);
    
    

    User.findOne( {email}, (err, user) => {
        if(err){
            return sendErrorsFromDB (res, err);
            
        } else if (user && bcrypt.compareSync(password, user.password) ) {
            
            const token = jwt.sign( {user} , process.env.AUTH_SECRET || 'kjdhf6$$%dojkhfˆ(sdkjhf' , { expiresIn: '1 day' });
            
            const { name, email, adm } = user
            res.json({ name, email, token, adm });

            // return res.status(200).send({ token : "Acharam um Token" ,  usuario: user, tokenzim: token });
            
        } else {
            return res.status(400).send({ errors: ['DEU RUIM'] });
            
        }
    });
}

const validateToken = (req, res, token) => {
    token = req.body.token || '';
    jwt.verify(token, process.env.AUTH_SECRET || 'kjdhf6$$%dojkhfˆ(sdkjhf' , (err, decoded) => {
        return res.status(200).send({ valid : !err });
    });
}

const signup = (req, res, next) => {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirmPassword || '';
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    if(!(password == confirmPassword)){
        return res.status(400).send( { errors: ['Senhas não conferem'] } )
    } else{
        User.findOne({email},(err, user) => {
            if(err){
                return sendErrorsFromDB (res, err);
            } else{
                if(user){
                    return res.status(400).send({error:['Usuário já cadastrado']});
                } else{
                    const newUser = new User({name, email, password: passwordHash});
                    newUser.save( err => {
                        if(err){
                            return sendErrorsFromDB(res, err);
                            res.status(400).send({error:['Usuário não cadastrado']});
                        } else{
                            res.status(201).send({msg:['Usuário cadastrado com sucesso']});
                        }
                    })
                }
            }
        })
    }
}

module.exports = { login, signup, validateToken };