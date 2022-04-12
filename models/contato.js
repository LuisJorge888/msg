const modelDb = require('./modelDb');

class Contacto extends modelDb{
    
    static table = "contacto";
    con_id;
    con_usu_id;
    con_usu_id_amigo;
    con_estado;

    constructor({con_id, con_usu_id, con_usu_id_amigo, con_estado}) {

        super(Contacto.table);
      
        this.con_id = con_id;
        this.con_usu_id = con_usu_id;
        this.con_usu_id_amigo = con_usu_id_amigo;
        this.con_estado = con_estado;
    }

    static getModel(){
        return Contacto;
    }

    static getKey(){
        return "con_id";
    }

    static getTable(){
        return "contacto";
    }

    static async getContatosByIdUsu(idUser){

        let result = await modelDb.findAllByWhere(Contacto, {
            con_usu_id : idUser,
            con_estado : 1
        });

        if(result){
            return result;
        }
        return false;
    }

}

module.exports = Contacto;