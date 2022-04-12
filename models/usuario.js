const modelDb = require('./modelDb');
const Contacto = require('./contato');

class Usuario extends modelDb{
    
    static table = "usuarios";
    us_id;
    us_user;
    us_pwd;

    constructor({us_user, us_pwd, us_id}) {

        super(Usuario.table);
        this.us_id = us_id;
        this.us_user = us_user;
        this.us_pwd  = us_pwd;
    }

    static getModel(){
        return Usuario;
    }

    static getKey(){
        return "us_id";
    }

    static getTable(){
        return "usuarios";
    }

    async validarCredenciales(returnUser = false){

        let result = await this.findOneByWhere({
            us_user : this.us_user,
            us_pwd  : this.us_pwd
        });

        if(result){
            return returnUser ? result : true;
        }
        return false;
    }

    static async findUsuarioById(idUser, returnClass = true){
        
        let usuDb = await modelDb.findById(Usuario, idUser);

        delete usuDb.us_pwd;

        if(returnClass){
            return new Usuario(usuDb);
        }
        return usuDb;
    }

    async getContactos(){

        let contactos = await Contacto.getContatosByIdUsu(this.us_id);

        if(!contactos){
            return null;
        }

        let usuarios = [];

        for (let contac of contactos) {
        
            let usuario = await Usuario.findUsuarioById(contac.con_usu_id_amigo);
            usuarios.push(usuario);
        }
       
        return usuarios;
    }

}

module.exports = Usuario;