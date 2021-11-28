const {Provider} = require('../models/provider');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const providerList = await Provider.find();
  if (!providerList) {
    res.status(500).json({access : false})
  }
  res.send(providerList);
});

router.post('/', (req,res)=>{
  const provider =new Provider({
    tipoDocumento : req.body.tipoDocumento,
    numeroDocumento : req.body.numeroDocumento,
    nombre : req.body.nombre,
    direccion : req.body.direccion,
    estadoProveedor : req.body.estadoProveedor,
    nombreEncargado : req.body.nombreEncargado,
    telefono : req.body.telefono,
    email : req.body.email
  })
  provider.save().then((createdProvider=>{
    res.status(201).json(createdProvider)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;
