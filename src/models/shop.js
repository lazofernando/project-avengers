const mongoose =require('mongoose');

const shopSchema= moongoose.Schema({
  codigoBarra : String,
  fecha : Date,
  proveedor : String,
})

exports.Shop =mongoose.model('Shop',shopSchema);
