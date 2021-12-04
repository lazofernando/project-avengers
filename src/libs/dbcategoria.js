var config = require('./dbconfig');//INSTANCIAMOS EL ARCHIVO DBCONFIG
const sql = require('mssql'); //se necesita paquete mssql

//funcion async: asyncrona devuelve un objeto
async function getCategoria(){
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().execute("LISTAR_CATEGORIA");
        return categorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//devuelve categoria x id
async function getCategoria_x_id(cat_id){
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request()
        .input('input_parameter',sql.Int, cat_id)
        .query("select * from Categoria where idCategoria=@input_parameter");
        return categorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//insertar una categoria
async function insertarCategoria(categoria){
    try {
        let pool = await sql.connect(config);
        let Insertcategorias = await pool.request()
        //estos son los parametros del store procedure
        .input('Nombre',sql.VarChar, categoria.Nombre)
        .input('idEstado',sql.Int, categoria.idEstado)
        .input('Detalle',sql.VarChar, categoria.Detalle)
        .execute("ALTA_CATEGORIA");
        return Insertcategorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//actualizar una categoria
async function actualizarCategoria(categoria){
    try {
        let pool = await sql.connect(config);
        let Updatecategorias = await pool.request()
        //estos son los parametros del store procedure
        .input('idCategoria',sql.Int, categoria.idCategoria)
        .input('Nombre',sql.VarChar, categoria.Nombre)
        .input('idEstado',sql.Int, categoria.idEstado)
        .input('Detalle',sql.VarChar, categoria.Detalle)
        .execute("UPDATE_CATEGORIA");
        return Updatecategorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}


module.exports ={
    getCategoria:getCategoria,
    getCategoria_x_id:getCategoria_x_id,
    insertarCategoria:insertarCategoria,
    actualizarCategoria:actualizarCategoria
}