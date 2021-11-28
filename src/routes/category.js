const {Category} = require('../models/category');
const express = require('express')
const router = express.Router();

const client = require('../libs/connect')()

router.get('/', async(req,res)=>{
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({access : false})
  }
  res.send(categoryList);
});

router.post('/', (req,res)=>{
  const category =new Category({
    nombreCategoria : req.body.nombreCategoria,
    estadoCategoria : req.body.estadoCategoria,
    detalle : req.body.detalle
  })
  category.save().then((createdCategory=>{
    res.status(201).json(createdCategory)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});
module.exports=router;