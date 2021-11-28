const {Client} = require('../models/client');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const clientList = await Client.find();
  if (!clientList) {
    res.status(500).json({access : false})
  }
  res.send(clientList);
});

router.post('/', (req,res)=>{
  const client =new Client({
    tipoDocumento : req.body.tipoDocumento,
    numeroDocumento : req.body.numeroDocumento,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    proviciaDepartamento : req.body.proviciaDepartamento,
    ciudad : req.body.ciudad,
    direccion : req.body.direccion,
    telefono : req.body.telefono,
    email : req.body.email                   
  })
  client.save().then((createdClient=>{
    res.status(201).json(createdClient)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;