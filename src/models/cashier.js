const mongoose =require('mongoose');

const cashierSchema= moongoose.Schema({
  numeroCaja : String,
  codigoCaja : String,
  estadoCaja : Boolean,
  efectivoCaja : Number,
  countInCashier : {
    type:Number,
    required :true
  }
})

exports.Cashier =mongoose.model('Cashier',cashierSchema);
