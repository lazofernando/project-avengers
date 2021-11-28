const mongoose =require('mongoose');

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

exports.Provider =mongoose.model('Provider',providerSchema);
