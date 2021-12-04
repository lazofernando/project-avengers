const { render } = require('ejs');
const fs = require('fs')
const express = require('express');
const { list } = require('mongodb/lib/gridfs/grid_store');
const router = express.Router()
const client = require('../libs/connect')()
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const session =require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session);
require('../libs/mongo')
const customModel=require('../libs/modelousuario')



//var router=express.Router();

//configurar session store
let store = new MongoDBStore({
    uri :'mongodb+srv://jeanpierinca:jeanpier12oo@clustercertus.y176v.mongodb.net/test?retryWrites=true&w=majority',
    //en el valor de la propiedad collection guardamos las coleccion de mis sesiones
    collection :'misSesiones'
});

store.on('error',function(err){
    console.log(err);
}); 


//configurara seciones
router.use(session({
    secret:'usando nodejs',
    store :store,
    resave:true,
    saveUninitialized : true
}));



//configurar body-parser para recicir la información de los formularios
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
//router
router.get('/',(req,res)=>{
    res.render('index');
})

router.post('/login',(req,res)=>{

    //guarndando información del formulqrio
    let varemail=req.body.useremail;
    let varpassword=req.body.userpassword;



//verificar que el password y el correo son validos 
//hacer busqueda en la base de datos si el passwor
//y el email son validos 

 customModel.findOne({
   email: varemail,
   password:varpassword
 },function(err,doc){

    if(err){
        console.log(err);
        res.render('login',{
         error : 'problemas con la vase de datos'

        });
    }
    // esta condicion me indica que si la contraseña y es usuario no son validos see ejecutara el siguiente codigo
    if(doc === null){
        console.log('El password y el correo no son validos ');
        res.render('login',{
            error : 'el password o el correo no son validos ',
            //declaracióm de la propiedad profile
            //esto lo puse para que me mueste la contraseña y el passsword ingresado
            profile :{
                email :varemail,
                password:varpassword

            }
        });
    }
   //si encontramos un documento que contien el password y correo de la base de datso
    if(doc !== null){
        secion=true;
        console.log('El password y el correo  son validos ');
        //variables de sesion
        //doc es el documento que se obtuvo de lavase de datso
        req.session.clave=doc._id;
        req.session.name=doc.username;
        req.session.email=doc.email;
        req.session.password=doc.password;
        res.redirect('/home');
    }
 });
 
});

router.get('/home',(req,res) =>{
    //en caso no exista una variable de secion significa 
    //que el usuario no a iniciado seción
  if(!req.session.clave){
                res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


  }else{
      res.render('home',{
          profile :{
              id : req.session.clave,
              name :req.session.name,
                 email : req.session.email,
                   password : req.session.password
          }
      })
  }

});
router.get('/cashier-new', (req,res)=>{
    
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('cashier-new')
}


})

router.get('/logout',(req,res) =>{
 //con la funcion destroy destruimos la sesion
    req.session.destroy(function(err){
 // cuando se destrulle la seción el usuario es redireccionado
 // a la paguina de iniciar seción
         res.redirect('/');

    });
})







router.get('/listarAlumnos', (req, res)=>{
    res.render('listarAlumnos')
})
// dashboard
// router.get('/home', (req, res)=>{
//     res.render('home')
// })
// administracion

//                  caja

router.get('/cashier-list', (req, res)=>{
    
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('cashier-list')
}
})
router.get('/cashier-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('cashier-search')
}
})
router.get('/cashier-update', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('cashier-update')
}
})

//                  categorias
router.get('/category-new', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('category-new')
}
})
router.get('/category-list', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta pagina</a></h3>')
    }else{
        res.render('category-list')
    }


})
router.get('/category-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta pagina</a></h3>')


}else{
res.render('category-search')
}
})
router.get('/category-update', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('category-update')
}
})


//                  proveedor
router.get('/provider-new', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('provider-new')
}
})
router.get('/provider-list', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('provider-list')
}
})
router.get('/provider-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('provider-search')
}
})
router.get('/provider-update', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('provider-update')
}
})

//                  usuario
router.get('/user-new', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('user-new')
}
})
router.get('/user-list', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('user-list')
}
})
router.get('/user-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('user-search')
}
})
router.get('/user-update', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('user-update')
}
})

//                  cliente
router.get('/client-new', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('client-new')
}
})
router.get('/client-list', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('client-list')
}
})
router.get('/client-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('client-search')
}
})
router.get('/client-update', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('client-update')
}
})


// productos

router.get('/product-new', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('product-new')
}
})
router.get('/product-list', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('product-list')
}
})
router.get('/product-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('product-search')
}
})
router.get('/product-sold', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('product-sold')
}
})
router.get('/product-update', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('product-update')
}
})


// compras

router.get('/shop-new', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('shop-new')
}
})
router.get('/shop-list', (req, res)=>{
    res.render('shop-list')
})
router.get('/shop-search', (req, res)=>{
    if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('shop-search')
}
})
router.get('/shop-detail', (req, res)=>{
      if(!req.session.clave){
        res.send('<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>')


}else{
res.render('shop-detail')
}
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


router.get('*', (req, res)=>{
    res.render('404')
})


// router.get('/', (req,res) => {
//     res.render('index')
// })


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