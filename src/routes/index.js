const { render } = require('ejs');
const fs = require('fs')
const express = require('express');
const { list } = require('mongodb/lib/gridfs/grid_store');
const router = express.Router()
const client = require('../libs/connect')()

router.get('/listarAlumnos', (req, res)=>{
    res.render('listarAlumnos')
})
// dashboard
router.get('/home', (req, res)=>{
    res.render('home')
})
// administracion

//                  caja
router.get('/cashier-new', (req, res)=>{
    res.render('cashier-new')
})
router.get('/cashier-list', (req, res)=>{
    res.render('cashier-list')
})
router.get('/cashier-search', (req, res)=>{
    res.render('cashier-search')
})
router.get('/cashier-update', (req, res)=>{
    res.render('cashier-update')
})

//                  categorias
router.get('/category-new', (req, res)=>{
    res.render('category-new')
})
router.get('/category-list', (req, res)=>{
    res.render('category-list')
})
router.get('/category-search', (req, res)=>{
    res.render('category-search')
})
router.get('/category-update', (req, res)=>{
    res.render('category-update')
})


//                  proveedor
router.get('/provider-new', (req, res)=>{
    res.render('provider-new')
})
router.get('/provider-list', (req, res)=>{
    res.render('provider-list')
})
router.get('/provider-search', (req, res)=>{
    res.render('provider-search')
})
router.get('/provider-update', (req, res)=>{
    res.render('provider-update')
})

//                  usuario
router.get('/user-new', (req, res)=>{
    res.render('user-new')
})
router.get('/user-list', (req, res)=>{
    res.render('user-list')
})
router.get('/user-search', (req, res)=>{
    res.render('user-search ')
})
router.get('/user-update', (req, res)=>{
    res.render('user-update')
})

//                  cliente
router.get('/client-new', (req, res)=>{
    res.render('client-new')
})
router.get('/client-list', (req, res)=>{
    res.render('client-list')
})
router.get('/client-search', (req, res)=>{
    res.render('client-search')
})
router.get('/client-update', (req, res)=>{
    res.render('client-update')
})


// productos

router.get('/product-new', (req, res)=>{
    res.render('product-new')
})
router.get('/product-list', (req, res)=>{
    res.render('product-list')
})
router.get('/product-search', (req, res)=>{
    res.render('product-search')
})
router.get('/product-sold', (req, res)=>{
    res.render('product-sold')
})
router.get('/product-update', (req, res)=>{
    res.render('product-update')
})


// compras

router.get('/shop-new', (req, res)=>{
    res.render('shop-new')
})
router.get('/shop-list', (req, res)=>{
    res.render('shop-list')
})
router.get('/shop-search', (req, res)=>{
    res.render('shop-search')
})
router.get('/shop-detail', (req, res)=>{
    res.render('shop-detail')
})


// ventas

router.get('/sale-new', (req, res)=>{
    res.render('sale-new')
})
router.get('/sale-list', (req, res)=>{
    res.render('sale-list')
})
router.get('/sale-search-date', (req, res)=>{
    res.render('sale-search-date')
})
router.get('/sale-search-code', (req, res)=>{
    res.render('sale-search-code')
})  
router.get('/sale-detail', (req, res)=>{
    res.render('sale-detail')
})


// devoluciones

router.get('/return-list', (req, res)=>{
    res.render('return-list')
})
router.get('/return-search', (req, res)=>{
    res.render('return-search')
})


// configuraciones

router.get('/company', (req, res)=>{
    res.render('company')
})

//  movimientos en caja
router.get('/movement-new', (req, res)=>{
    res.render('movement-new')
})
router.get('/movement-list', (req, res)=>{
    res.render('movement-list')
})
router.get('/movement-search', (req, res)=>{
    res.render('movement-search')
})

// reporte
router.get('/report-sales', (req, res)=>{
    res.render('report-sales')
})
router.get('/report-inventory', (req, res)=>{
    res.render('report-inventory')
})




router.get('/404', (req, res)=>{
    res.render('404')
})


router.get('/', (req,res) => {
    res.render('index')
})


router.post('/consultar', (req, res) =>{
    res.send("{frutas:['manzana', 'pera','fresa']}")
})

router.delete('/eliminar', (req, res)=>{
    res.send("Eliminado")
})

router.post('/insertar', (req, res)=>{
    client.connect(async (err) =>{
        if (!err){
            const collection = client.db("test").collection("alumnos")
            collection.insertOne( req.body )
            res.send("resultado:[{'respuesta':'OK'}]")
        }else{
            res.send("resultado:[{'respuesta':'Error al cargar'}, {'mensaje':" + err + "}]")
        }
    })
})

router.post('/listarAlumnos', (req,res) => {
    client.connect(async (err) =>{
        if (!err){
            const collection = client.db("test").collection("alumnos")
            collection.find().toArray((err, result)=>{
                if(!err){
                    //res.send(result)                    
                    res.render('listarAlumnos',{datos:result})
                }else{
                    res.send("'resultado':[{'respuesta':'Error al traer la data'}, {'mensaje':" + err + "}]")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'Error al cargar'}, {'mensaje':" + err + "}]")
        }
    })
})

router.post('/listarUnAlumno', (req,res) => {
    var nombreLocal = req.body.nombre;
    client.connect(async (err) =>{
        if (!err){
            const collection = client.db("test").collection("alumnos")
            collection.find({nombre:{$eq:nombreLocal}}).toArray((err, result)=>{
                if(!err){
                    //res.send(result)                    
                    res.render('listarAlumnos',{datos:result})
                }else{
                    res.send("'resultado':[{'respuesta':'Error al traer la data'}, {'mensaje':" + err + "}]")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'Error al cargar'}, {'mensaje':" + err + "}]")
        }
    })
})

module.exports = router;