const express = require("express");
const bodyParser = require('body-parser');
const db = require('./config/database');
const passport = require('passport');
const passportStratergy = ('./fonfig/passport');
const router = require("./routes/routes");


const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, (err)=>{
    if(err){
        console.log(`Server is giving an error: ${err}`);
    }else{
        console.log(`Server is running Successfully`)
    }
});