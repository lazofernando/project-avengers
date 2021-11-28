const mongoose =require('mongoose');

const saleSchema= moongoose.Schema({
  codigoProducto : String,
  fecha : Date,
  nombreCaja: String,
  cliente: String,
  tipoPago : String,
  descuento : Number,
  totalPagado: Number,
})

exports.Sale =mongoose.model('Sale',saleSchema);
