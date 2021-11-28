const {Product} = require('../models/product');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({access : false})
  }
  res.send(productList);
});

router.post('/', (req,res)=>{
  const product =new Product({

    codigoSKU : req.body.codigoSKU,
    nombre : req.body.nombre,
    stockExistencias : req.body.stockExistencias,
    stockMinimo : req.body.stockMinimo,
    presentacionProducto : req.body.presentacionProducto,
    precioCompra : req.body.precioCompra,
    precioVentas : req.body.precioVentas,
    precioVentaPorMayor : req.body.precioVentaPorMayor,
    descuento : req.body.descuento,
    marca : req.body.marca,
    modelo : req.body.modelo
  })
  product.save().then((createdProduct=>{
    res.status(201).json(createdProduct)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;
