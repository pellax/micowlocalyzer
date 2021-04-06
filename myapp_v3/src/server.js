const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

// Initializations
const app = express();
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false})); //Transformara los datos recibidos en JSON
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());
//Global Variables

//Routes
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use(require('./routes/users.routes'));

//Static files --Archivos que el navegador puede pedir directamente.
app.use(express.static(path.join(__dirname,'public'))); //Le dice donde esta la carpeta public

module.exports = app; //Para poder usarlo en index.js