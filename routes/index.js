const express = require('express');

// RUTAS
const chatRouter = require('./chat');

const { checkSession, crearSesion, cerrarSesion, withoutSession } = require('../controllers/sessionController');
const { checkLogin } = require('../controllers/usuarioController');


const indexRouter = express.Router();

function addRutas(app){

  app.use('/', indexRouter);
  app.use('/chat', chatRouter);

}

indexRouter.get('/', withoutSession, (req, res, next) => {
    console.log("MAIN")
    res.render('home', {
      msg : "Mensaje",
      titlePage : "Wellcome",
    });
});

indexRouter.get('/about', (req, res, next) => {
  return retornarRespuesta('about', {}, req, res)
});

indexRouter.get('/login', withoutSession, (req, res, next) => {
  
  let msg = null;

  if(req.session.errorLogin){
    
    msg = req.session.errorMsg;
    
    delete req.session.errorLogin;
    delete req.session.errorMsg;
  }
  
  res.render('login', {
    msg
  });
});

indexRouter.get('/register', (req, res, next) => {
  return retornarRespuesta('register', req, res)
});

indexRouter.post('/actionlogin', checkLogin, crearSesion);
indexRouter.get('/logout', checkSession, cerrarSesion);

indexRouter.get('/main', checkSession, (req, res, next) => {

  let data = {
    msg : "Bienvenido tiene sesion",
    user : {
      ...req.session.user
    }
  }

  return retornarRespuesta('main', data, req, res)
})

function retornarRespuesta(view, data, req, res){

  return res.render(view, {
    ...data,
    login : req.session.init
  });
}

module.exports = {
  addRutas
};
