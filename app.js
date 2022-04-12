// CARGAR .ENV
require('dotenv').config();

// APP
const express = require('express');

// MODULOS
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  //cookie: { maxAge: 60000 }
}))
app.use(logger('dev'));

// RUTAS
const rutas = require('./routes/index');

rutas.addRutas(app);

app.get('/otro', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/otro.html'));
});

// PUBLIC
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

// ICONO
app.use('/favicon.ico', express.static(__dirname + '/public/favicon.ico'));


// VISTAS
app.set('views', path.join(__dirname, 'views'));

// VIEWS handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'index',
    layoutsDir: app.get('views'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
      header: () => { return 'FOO!'; },
      bar: () => { return 'BAR!'; }
  }
}));

app.set('view engine', 'hbs');

module.exports = app;