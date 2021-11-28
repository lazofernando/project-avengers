const {Movement} = require('../models/movement');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const movementList = await Movement.find();
  if (!movementList) {
    res.status(500).json({access : false})
  }
  res.send(movementList);
});

router.post('/', (req,res)=>{
  const movement =new Movement({
   caja : req.body.caja,
   tipoMovimiento : req.body.tipoMovimiento,
   cantidadEfectivo : req.body.cantidadEfectivo,
   motivoMovimiento : req.body.motivoMovimiento,
  })
  movement.save().then((createdMovement=>{
    res.status(201).json(createdMovement)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;
