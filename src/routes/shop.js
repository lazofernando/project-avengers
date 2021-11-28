const {Shop} = require('../models/shop');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const shopList = await Shop.find();
  if (!shopList) {
    res.status(500).json({access : false})
  }
  res.send(shopList);
});

router.post('/', (req,res)=>{
  const shop =new Shop({
    tipoDocumento : req.body.tipoDocumento,
    numeroDocumento : req.body.numeroDocumento,
    nombre : req.body.nombre,
    direccion : req.body.direccion,
    estadoProveedor : req.body.estadoProveedor,
    nombreEncargado : req.body.nombreEncargado,
    telefono : req.body.telefono,
    email : req.body.email
  })
  shop.save().then((createdShop=>{
    res.status(201).json(createdShop)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;
