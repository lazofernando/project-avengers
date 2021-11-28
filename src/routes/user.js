const {User} = require('../models/user');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const userList = await User.find();
  if (!userList) {
    res.status(500).json({access : false})
  }
  res.send(userList);
});

router.post('/', (req,res)=>{
  const user =new User({
    tipoDocumento : req.body.tipoDocumento,
    numeroDocumento : req.body.numeroDocumento,
    cargo : req.body.cargo,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    genero : req.body.genero,
    lectorBarra : req.body.lectorBarra,
    codgioBarras : req.body.codgioBarras,
    cajaVentas : req.body.cajaVentas,
    nombreUsuario : req.body.nombreUsuario,
    email : req.body.email,
    contraseña : req.body.contraseña,
    estadoCuenta : req.body.estadoCuenta,
    avatar : req.body.avatar
  })
  user.save().then((createdUser=>{
    res.status(201).json(createdUser)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;
