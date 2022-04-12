const mysql = require('mysql2/promise');

class dataBase {

  instancia = null;
  conexion;

  constructor(){

  }

  async crearConexion(){

    this.conexion = await mysql.createConnection({
      host     : process.env.HOTS,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME, 
    });
    console.log('creo conexion');

    return;
  }
  
  async ejecutarSql(sql = 'SELECT 1 + 1 as sum'){

    if(this.conexion == undefined){
      await this.crearConexion();
    }
    let [results] = await this.conexion.execute(sql);
    return results;
  }
}

let dataBaseObj = new dataBase();

module.exports = dataBaseObj;