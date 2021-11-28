const mongoose =require('mongoose');

const clientSchema= moongoose.Schema({
  tipoDocumento : String,
  numeroDocumento : String,
  nombre : String,
  apellido : String,
  proviciaDepartamento : String,
  ciudad : Boolean,
  direccion : String,
  telefono : String,
  email :String
})

exports.Client =mongoose.model('Client',clientSchema);
