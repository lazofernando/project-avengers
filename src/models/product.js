const mongoose =require('mongoose');

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

exports.Product =mongoose.model('Product',productSchema);












