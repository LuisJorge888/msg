const usuarioModel = require('../models/usuario');

async function checkLogin(req, res, next){

    let us_user = req.body.txtUsuario;
    let us_pwd = req.body.txtPwd;

    let usuario = new usuarioModel({us_user, us_pwd}); // static ?

    usuario = await usuario.validarCredenciales(true);

    if(usuario){
        req.session.idUser = usuario.us_id;
        next();
    }else{
        req.session.errorLogin = true;
        req.session.errorMsg = "Usuario/Contraseña no son correctas.";
        res.redirect('/login');
    }
}

function registarUsuario(req, res, next){

}

module.exports = {
    checkLogin
}