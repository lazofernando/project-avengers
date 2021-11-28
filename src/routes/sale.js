const {Sale} = require('../models/sale');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const saleList = await Sale.find();
  if (!saleList) {
    res.status(500).json({access : false})
  }
  res.send(saleList);
});

router.post('/', (req,res)=>{
  const sale =new Sale({
    codigoProducto : req.body.codigoProducto,
    fecha : req.body.fecha,
    nombreCaja : req.body.nombreCaja,
    cliente : req.body.cliente,
    tipoPago : req.body.tipoPago,
    descuento : req.body.descuento,
    totalPagado : req.body.totalPagado
  })
  sale.save().then((createdSale=>{
    res.status(201).json(createdSale)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;
