const mongoose =require('mongoose');

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
  avatar: String
})

exports.User =mongoose.model('User',userSchema);
