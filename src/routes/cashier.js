const {Cashier} = require('../models/cashier');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const cashierList = await Cashier.find();
  if (!cashierList) {
    res.status(500).json({access : false})
  }

  res.send(cashierList);
});

router.post('/', (req,res)=>{
  const cashier =new Cashier({
    numeroCaja : req.body.numeroCaja,
    codigoCaja : req.body.codigoCaja,
    estadoCaja : req.body.estadoCaja,
    efectivoCaja : req.body.efectivoCaja,
    countinCashier : req.body.Cashier 
  })
  cashier.save().then((createdCashier=>{
    res.status(201).json(createdCashier)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;