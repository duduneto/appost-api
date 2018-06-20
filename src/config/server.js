const express = require('express');
const BodyParser = require('body-parser');
const cors =  require('cors');

const app = express();

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use(cors());

const port = 3030;
app.listen(process.env.PORT || port, function(){
    console.log(`Server rodando na porta ${port}`)
});

module.exports = app;