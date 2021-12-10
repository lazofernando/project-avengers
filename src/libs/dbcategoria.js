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


async function getCategoriaOption(){
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().execute("LISTAR_OPTION_CATEGORIA");
        return categorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}

async function getProveedorOption(){
    try {
        let pool = await sql.connect(config);
        let proveedor = await pool.request().execute("LISTAR_OPTION_PROVEEDOR");
        return proveedor.recordsets;
    } catch (error) {
        console.log(error)
    }
}


//funcion async: asyncrona devuelve un objeto
async function getCliente(){
    try {
        let pool = await sql.connect(config);
        let clientes = await pool.request().execute("LISTAR_CLIENTES");
        return clientes.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//funcion async: asyncrona devuelve un objeto
async function getProveedores(){
    try {
        let pool = await sql.connect(config);
        let proveedores = await pool.request().execute("LISTAR_PROVEEDOR");
        return proveedores.recordsets;
    } catch (error) {
        console.log(error)
    }
}

async function getUsuarios(){
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().execute("LISTAR_USUARIOS");
        return usuarios.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//obtener categoria x id
async function getCategoria_x_id(cat_id){
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request()
        .input('idCategoria',sql.Int, cat_id)
        .execute("LISTAR_CATEGORIA_X_ID");
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
        .execute("UPDATE_CATEGORIA");
        return Updatecategorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//funcion async: asyncrona devuelve un objeto
async function getCajas(){
    try {
        let pool = await sql.connect(config);
        let cajas = await pool.request().execute("LISTAR_CAJAS");
        return cajas.recordsets;
    } catch (error) {
        console.log(error)
    }
}


//listar productos
async function getProductos(){
    try {
        let pool = await sql.connect(config);
        let productos = await pool.request().execute("LISTAR_PRODUCTO");
        return productos.recordsets;
    } catch (error) {
        console.log(error)
    }
}


//insertar una caja
async function insertarCaja(caja){
    try {
        let pool = await sql.connect(config);
        let Insertcajas = await pool.request()
        //estos son los parametros del store procedure
        .input('NombreCaja',sql.VarChar, caja.NombreCaja)
        .input('idEstado',sql.Int, caja.idEstado)
        .input('Efectivo',sql.Money, caja.Efectivo)
        .execute("ALTA_CAJA");
        return Insertcajas.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//insertar un proveedor
async function insertarProveedor(proveedor){
    try {
        let pool = await sql.connect(config);
        let InsertProveedor = await pool.request()
        //estos son los parametros del store procedure
        .input('TipoDocumento',sql.VarChar, proveedor.TipoDocumento)
        .input('DNI',sql.VarChar, proveedor.DNI)
        .input('Nombre',sql.VarChar, proveedor.Nombre)
        .input('Direccion',sql.VarChar, proveedor.Direccion)
        .input('idEstado',sql.Int, proveedor.idEstado)
        .input('NombreEncargado',sql.VarChar, proveedor.NombreEncargado)
        .input('Telefono',sql.VarChar, proveedor.Telefono)
        .input('Email',sql.VarChar, proveedor.Email)
        .execute("ALTA_PROVEEDOR");
        return InsertProveedor.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//insertar un USER
async function insertarUser(user){
    try {
        let pool = await sql.connect(config);
        let InsertUser= await pool.request()
        //estos son los parametros del store procedure
        .input('TipoDocumento',sql.VarChar, user.TipoDocumento)
        .input('DNI',sql.VarChar, user.DNI)
        .input('Nombre',sql.VarChar, user.Nombre)
        .input('Apellidos',sql.VarChar, user.Apellidos)
        .input('Cargo',sql.VarChar, user.Cargo)
        .input('Telefono',sql.VarChar, user.Telefono)
        .input('Genero',sql.VarChar, user.Genero)
        .input('idEstado',sql.Int, user.idEstado)
        .input('Usuario',sql.VarChar, user.Usuario)
        .input('Password',sql.VarChar, user.Password)
        .execute("ALTA_USUARIO");
        return InsertUser.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//insertar un PRODUCTO
async function insertarProducto(producto){
    try {
        let pool = await sql.connect(config);
        let InsertProducto= await pool.request()
        //estos son los parametros del store procedure
        .input('SKU',sql.VarChar, producto.SKU)
        .input('NOMBRE',sql.VarChar, producto.NOMBRE)
        .input('Stock',sql.BigInt, producto.Stock)
        .input('Stock_minimo',sql.Int, producto.Stock_minimo)
        .input('PresentacionProducto',sql.VarChar, producto.PresentacionProducto)
        .input('PrecioCompra',sql.Money, producto.PrecioCompra)
        .input('Precioventa',sql.Money, producto.Precioventa)
        .input('PrecioVentaMayoreo',sql.Money, producto.PrecioVentaMayoreo)
        .input('Descuento',sql.Decimal, producto.Descuento)
        .input('Marca',sql.VarChar, producto.Marca)
        .input('Vence',sql.VarChar, producto.Vence)
        .input('FechaVencimiento',sql.Date, producto.FechaVencimiento)
        .input('Garantia',sql.Int, producto.Garantia)
        .input('TiempoGarantía',sql.VarChar, producto.TiempoGarantia)
        .input('idProveedor',sql.Int, producto.idProveedor)
        .input('idCategoria',sql.Int, producto.idCategoria)
        .input('idEstado',sql.Int, producto.idEstado)
        .execute("ALTA_PRODUCTO");
        return InsertProducto.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//obtener caja x id
async function getCaja_x_id(caja_id){
    try {
        let pool = await sql.connect(config);
        let cajas = await pool.request()
        .input('idCajas',sql.Int, caja_id)
        .execute("LISTAR_CAJA_X_ID");
        return cajas.recordsets;
    } catch (error) {
        console.log(error)
    }
}
//obtener proveedor por id
async function getProveedor_x_id(prov_id){
    try {
        let pool = await sql.connect(config);
        let proveedor = await pool.request()
        .input('idProveedor',sql.Int, prov_id)
        .execute("LISTAR_PROVEEDOR_X_ID");
        return proveedor.recordsets;
    } catch (error) {
        console.log(error)
    }
}



//actualizar una CAJA
async function actualizarCaja(caja){
    try {
        let pool = await sql.connect(config);
        let Updatecaja = await pool.request()
        //estos son los parametros del store procedure
        .input('idCajas',sql.Int, caja.idCajas)
        .input('NombreCaja',sql.VarChar, caja.NombreCaja)
        .input('idEstado',sql.Int, caja.idEstado)
        .input('Efectivo',sql.Money, caja.Efectivo)
        .execute("UPDATE_CAJA");
        return Updatecaja.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//actualizar una PROVEEDOR
async function actualizarProveedor(proveedor){
    try {
        let pool = await sql.connect(config);
        let UpdateProveedor = await pool.request()
        //estos son los parametros del store procedure
        .input('idProveedor',sql.Int, proveedor.idProveedor)
        .input('TipoDocumento',sql.VarChar, proveedor.TipoDocumento)
        .input('DNI',sql.VarChar, proveedor.DNI)
        .input('Nombre',sql.VarChar, proveedor.Nombre)
        .input('Direccion',sql.VarChar, proveedor.Direccion)
        .input('idEstado',sql.Int, proveedor.idEstado)
        .input('NombreEncargado',sql.VarChar, proveedor.NombreEncargado)
        .input('Telefono',sql.VarChar, proveedor.Telefono)
        .input('Email',sql.VarChar, proveedor.Email)
        .execute("UPDATE_PROVEEDOR");
        return UpdateProveedor.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//eliminar una categoria
async function eliminarCategoria(categoria){
    try {
        let pool = await sql.connect(config);
        let DeleteCategorias = await pool.request()
        //estos son los parametros del store procedure
        .input('idCategoria',sql.Int, categoria.idCategoria)
        .execute("DELETE_CATEGORIA");
        return DeleteCategorias.recordsets;
    } catch (error) {
        console.log(error)
    }
}
//eliminar caja
async function eliminarCaja(caja){
    try {
        let pool = await sql.connect(config);
        let DeleteCajas = await pool.request()
        //estos son los parametros del store procedure
        .input('idCajas',sql.Int, caja.idCajas)
        .execute("DELETE_CAJA");
        return DeleteCajas.recordsets;
    } catch (error) {
        console.log(error)
    }
}

//eliminar proveedor
async function eliminarProveedor(proveedor){
    try {
        let pool = await sql.connect(config);
        let DeleteProveedor = await pool.request()
        //estos son los parametros del store procedure
        .input('idProveedor',sql.Int, proveedor.idProveedor)
        .execute("DELETE_PROVEEDOR");
        return DeleteProveedor.recordsets;
    } catch (error) {
        console.log(error)
    }
}


module.exports ={
    getCategoria:getCategoria,
    getCajas:getCajas,
    getCliente:getCliente,
    getProveedores:getProveedores,
    getUsuarios:getUsuarios,
    getCategoria_x_id:getCategoria_x_id,
    insertarCategoria:insertarCategoria,
    insertarCaja:insertarCaja,
    actualizarCategoria:actualizarCategoria,
    eliminarCategoria:eliminarCategoria,
    actualizarCaja:actualizarCaja,
    getCaja_x_id:getCaja_x_id,
    getProveedor_x_id:getProveedor_x_id,
    eliminarCaja:eliminarCaja,
    insertarProveedor:insertarProveedor,
    actualizarProveedor:actualizarProveedor,
    eliminarProveedor:eliminarProveedor,
    insertarUser:insertarUser,
    insertarProducto:insertarProducto,
    getProductos:getProductos,
    getCategoriaOption:getCategoriaOption,
    getProveedorOption:getProveedorOption
}