var config = require('./dbconfig');//instanciamos el archivo dbconfig
const sql = require('mssql');//se necesita paquete mssql

//funcion async : Asyncrona devuelve un bojeto
async function getCategoria(){
    try{
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("select * from Categoria");
        return categorias.recordsets;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getCategoria : getCategoria
}