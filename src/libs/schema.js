const mongoose =require('mongoose');


const cashierSchema= moongoose.Schema({
  numeroCaja : String,
  codigoCaja : String,
  estadoCaja: Boolean,
  efectivoCaja : Number
})

const categorySchema= moongoose.Schema({
  nombreCategoria : String,
  estadoCategoria: Boolean,
  detalle: String
})
const providerSchema= moongoose.Schema({
  tipoDocumento : String,
  numeroDocumento : String,
  nombre: String,
  direccion: String,
  estadoProveedor: Boolean,
  nombreEncargado : String,
  telefono : String,
  email: String
})
const userSchema= moongoose.Schema({
  tipoDocumento : String,
  numeroDocumento : String,
  cargo: String,
  nombre: String,
  apellido: String,
  telefono : String,
  genero: String,
  lectorBarra: Boolean,
  codgioBarras: Boolean,
  cajaVentas: String,
  nombreUsuario : String,
  email :String,
  contraseña : String,
  estadoCuenta: Boolean,
  avatar:Image,
})
const clientSchema= moongoose.Schema({
  tipoDocumento : String,
  numeroDocumento : String,
  nombre: String,
  apellido: String,
  proviciaDepartamento: String,
  ciudad: Boolean,
  direccion: String,
  telefono : String,
  email :String,
})
const productSchema= moongoose.Schema({
  codigoSKU : String,
  nombre: String,
  stockExistencias: Number,
  stockMinimo : Number,
  presentacionProducto: String,
  precioCompra : Number,
  precioVentas : Number,
  precioVentaPorMayor : Number,
  descuento : Number,
  marca : String,
  modelo : String
})
const shopSchema= moongoose.Schema({
  codigoBarra : String,
  fecha : Date,
  proveedor : String,
})
const saleSchema= moongoose.Schema({
  codigoProducto : String,
  fecha : Date,
  nombreCaja: String,
  cliente: String,
  tipoPago : String,
  descuento : Number,
  totalPagado: Number,
})
const movementSchema= moongoose.Schema({
  caja : String,
  tipoMovimiento : String,
  cantidadEfectivo: Number,
  motivoMovimiento: String,
})
// const userSchema= moongoose.Schema({
//   tipoDocumento : String,
//   numeroDocumento : String,
//   cargo: String,
//   nombre: String,
//   apellido: String,
//   telefono : String,
//   genero: String,
//   lectorBarra: Boolean,
//   codgioBarras: Boolean,
//   cajaVentas: String,
//   nombreUsuario : String,
//   email :String,
//   contraseña : String,
//   estadoCuenta: Boolean,
//   avatar:Image,
// })

const Cashier =mongoose.model('Cashier',cashierSchema);
const Category =mongoose.model('Category',categorySchema);
const Provider =mongoose.model('Provider',providerSchema);
const Cashier =mongoose.model('User',userSchema);
const Cashier =mongoose.model('Client',clientSchema);
const Cashier =mongoose.model('Product',productSchema);
const Cashier =mongoose.model('Shop',shopSchema);
const Cashier =mongoose.model('Sale',saleSchema);
const Cashier =mongoose.model('Movement',movementSchema);

// Cashier
// Category
// Provider
// User
// Client
// Product
// Shop
// Sale
// Movement