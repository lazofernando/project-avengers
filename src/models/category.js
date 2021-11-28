const mongoose =require('mongoose');

const categorySchema= moongoose.Schema({
  nombreCategoria : String,
  estadoCategoria : Boolean,
  detalle : String
})

exports.Category =mongoose.model('Category',categorySchema);
