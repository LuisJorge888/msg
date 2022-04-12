const usuarioModel = require('../models/usuario');

async function getChat(req, res, next){

    let usuario = await usuarioModel.findUsuarioById(req.session.idUser);
    let contactos = await usuario.getContactos();

    return res.render('chat', {
        usuario,
        contactos,
        login : req.session.init
    });
}

module.exports = {
    getChat,
}