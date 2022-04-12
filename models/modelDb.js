const dataBase = require('./../database/conexion');

class ModelDb {
    
    constructor(tableName) {
        this.table = tableName;
    }

    getTable() {
        return this.table;
    }

    static async findById(classObj, idCriteria){

        let condition = ModelDb.buildWhereIdCondition(classObj.getKey(), idCriteria);

        let extraCriteria = "LIMIT 1";

        let sql = ModelDb.buildSelect(classObj.getTable(), condition, "*", extraCriteria);

        let resultado = await ModelDb.ejecutarSql(sql);
 
        if(resultado.length > 0){
            return resultado[0];
        }
        return null;
    }

    async findOneByWhere(criteria){

        let condition = ModelDb.buildWhereCondition(criteria);

        let sql = ModelDb.buildSelect(this.table, condition);

        let resultado = await ModelDb.ejecutarSql(sql);
    
        if(resultado.length > 0){
            return resultado[0];
        }
        return null;
    }

    static async findAllByWhere(classObj, criteria){

        let condition = ModelDb.buildWhereCondition(criteria);

        let sql = ModelDb.buildSelect(classObj.getTable(), condition);

        let resultado = await ModelDb.ejecutarSql(sql);
    
        if(resultado.length > 0){
            return resultado;
        }
        return null;
    }

    save(){
        console.log("Guardar objeto")
    }

    deleteSoft(){
        console.log("DELETE SOFT")
    }

    deleteHard(){
        console.log("DELETE HARD")
    }

    static buildWhereIdCondition(keyColumn, idCriteria){

        return  `${keyColumn} = "${idCriteria}"`;
    }

    static buildWhereCondition(criteria, $condition = "AND"){

        let where = "";

        Object.keys(criteria).forEach((key, idx, array) => {

            if (idx === array.length - 1){ // es la ultima iteracion
                $condition = ""; 
            }
            where += `${key} = "${criteria[key]}" ${$condition} `;
            //where += `${key} = "${this[key]}" ${$condition} `; funciona (pero no es tan dinamico)
        });

        return where;
    }

    static buildSelect(table, where = "", atributos = "*", extraCriteria = ""){

        return `SELECT ${atributos} FROM ${table} WHERE ${where} ${extraCriteria}`;
    }
/*
    static buildSelectSubQuery(
        table, tableIn, atributoInWhere, atributoIn, atributos, atributoIn, where, whereIn
        ){

        return `
        SELECT ${atributos} 
        FROM ${table}
        WHERE ${where}
        AND ${atributoInWhere}
        IN (
            SELECT ${atributoIn}
            FROM ${tableIn}
            WHERE ${whereIn}
        )`;
    }
*/
    static async ejecutarSql(sql){

        return await dataBase.ejecutarSql(sql);
    }

}

module.exports = ModelDb;