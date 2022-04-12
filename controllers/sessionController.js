const usuarioModel = require('../models/usuario');


function checkSession(req, res, next){

    if(req.session.init){
        next();
    }else{
        req.session.errorLogin = true;
        req.session.errorMsg = "Debe iniciar sesion para seguir.";
        res.redirect('/login');
    }    
}

function withoutSession(req, res, next){

    console.log(req.session.init)
    
    if(!req.session.init){
        next();
    }else{
        res.redirect('/main');
    } 
}

async function crearSesion(req, res, next){

    let usuario = await usuarioModel.findUsuarioById(req.session.idUser);

    if(usuario == null){
        req.session.errorLogin = true;
        req.session.errorMsg = "Error al iniciar sesion, intente nuevamente";
        res.redirect('/login');
        return;
    }

    req.session.init = true;

    req.session.user = {
        id : usuario.us_id,
        name : usuario.us_user
    }

    res.redirect(301, '/main');
}

function cerrarSesion(req, res, next){

    req.session.destroy(() => console.log("Delete"));

    res.redirect(301, '/');
}

module.exports = {
    checkSession,
    crearSesion,
    withoutSession,
    cerrarSesion
}