const mongoose =require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema= mongoose.Schema({
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
  password : String,
  estadoCuenta: Boolean,
  avatar: String
})
userSchema.methods.encryptPassword  = (password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
userSchema.methods.comparePassword  = (password)=>{
  return bcrypt.compareSync(this.password);
}


exports.User =mongoose.model('User',userSchema);
