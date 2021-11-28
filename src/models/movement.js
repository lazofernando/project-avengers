const mongoose =require('mongoose');

const movementSchema= moongoose.Schema({
  caja : String,
  tipoMovimiento : String,
  cantidadEfectivo : Number,
  motivoMovimiento : String,
})

exports.Movement =mongoose.model('Movement',movementSchema);
