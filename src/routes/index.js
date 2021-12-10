const { render } = require("ejs");
const fs = require("fs");
const express = require("express");
const { list } = require("mongodb/lib/gridfs/grid_store");
const router = express.Router();
const path = require("path");
const client = require("../libs/connect")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("../libs/mongo");
const customModel = require("../libs/modelousuario");
const dbsql = require("../libs/dbcategoria");
var cors = require("cors");
const { request, response } = require("express");

//var router=express.Router();

//configurar session store
let store = new MongoDBStore({
  uri: "mongodb+srv://jeanpierinca:jeanpier12oo@clustercertus.y176v.mongodb.net/test?retryWrites=true&w=majority",
  //en el valor de la propiedad collection guardamos las coleccion de mis sesiones
  collection: "misSesiones",
});

store.on("error", function (err) {
  console.log(err);
});

//configurara seciones
router.use(
  session({
    secret: "usando nodejs",
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

//configurar body-parser para recibir la información de los formularios
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//router
router.get("/", (req, res) => {
  res.render("index");
});

router.post("/login", (req, res) => {
  //guardando información del formulario
  let varemail = req.body.useremail;
  let varpassword = req.body.userpassword;

  //verificar que el password y el correo son validos
  //hacer busqueda en la base de datos si el passwor
  //y el email son validos

  customModel.findOne(
    {
      email: varemail,
      password: varpassword,
    },
    function (err, doc) {
      if (err) {
        console.log(err);
        res.render("login", {
          error: "problemas con la base de datos",
        });
      }
      // esta condicion me indica que si la contraseña y es usuario no son validos see ejecutara el siguiente codigo
      if (doc === null) {
        console.log("El password y el correo no son validos ");
        res.render("login", {
          error: "el password o el correo no son validos ",
          //declaracióm de la propiedad profile
          //esto lo puse para que me muestre la contraseña y el passsword ingresado
          profile: {
            email: varemail,
            password: varpassword,
          },
        });
      }
      //si encontramos un documento que contiene el password y correo de la base de datos
      if (doc !== null) {
        secion = true;
        console.log("El password y el correo  son validos ");
        //variables de sesion
        //doc es el documento que se obtuvo de la base de datso
        req.session.clave = doc._id;
        req.session.name = doc.username;
        req.session.email = doc.email;
        req.session.password = doc.password;
        req.session.imagenes = doc.img;
        res.redirect("/home");
      }
    }
  );
});

router.get("/home", (req, res) => {
  //en caso no exista una variable de secion significa
  //que el usuario no a iniciado seción
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    //en caso halla iniciado sesion
    //quiero que estas propiedasdes guarden la informacion de la base de datos
    res.render("home", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

//fucion para comprobar si se a inicioado secion o no
function comprobar(n) {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render(n, {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
}
router.get("/cashier-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("cashier-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/logout", (req, res) => {
  //con la funcion destroy destruimos la sesion
  req.session.destroy(function (err) {
    // cuando se destrulle la seción el usuario es redireccionado
    // a la paguina de iniciar seción
    res.redirect("/");
  });
});

//                  caja

router.get("/cashier-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    dbsql.getCajas().then((data) => {
      res.render("cashier-list", {
        data: data[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

router.get("/cashier-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("cashier-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/category-update/:id", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    const id = req.params.id;
    let categoria = { ...req.body };
    let objeto = {};
    //res.send(id);
    dbsql.getCategoria_x_id(id).then((results) => {
      objeto = results[0];
      res.render("category-update", {
        objeto: objeto[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

router.get("/cashier-update/:id", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    const id = req.params.id;
    let categoria = { ...req.body };
    let objeto = {};
    //res.send(id);
    dbsql.getCaja_x_id(id).then((results) => {
      objeto = results[0];
      res.render("cashier-update", {
        objeto: objeto[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

//                  categorias
router.get("/category-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("category-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/category-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta pagina</a></h3>'
    );
  } else {
    dbsql.getCategoria().then((data) => {
      res.render("category-list", {
        data: data[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

router.get("/category-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta pagina</a></h3>'
    );
  } else {
    res.render("category-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

//                  proveedor
router.get("/provider-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("provider-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/provider-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    dbsql.getProveedores().then((data) => {
      res.render("provider-list", {
        data: data[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});
router.get("/provider-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("provider-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/provider-update/:id", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    const id = req.params.id;
    let proveedor = { ...req.body };
    let objeto = {};
    dbsql.getProveedor_x_id(id).then((results) => {
      objeto = results[0];
      res.render("provider-update", {
        objeto: objeto[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

//                  usuario
router.get("/user-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("user-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

/*ALTA USUARIO*/
router.post("/altaUsuario", (req, res) => {
  //guardando datos del formulrio
  let nombre = req.body.name_user;
  let email2 = req.body.Usuario;
  let passwork2 = req.body.Password;
  let imagen = req.body.usuario_avatar_reg;

  if (nombre === "" || email2 === "" || passwork2 === "") {
    res.render("user-new", {
      error:
        "ERROR: Complete todos los campos de texto vacios para guardar la información",
    });
  } else {
  }
  //guardando los datos del formulario en base de datos
  let nuevomodelo = new customModel({
    username: nombre,
    email: email2,
    password: passwork2,
    img: imagen,
  });

  nuevomodelo.save(function (err, doc) {
    if (err) {
      console.log("error: no se pudo guardar");
      res.render("user-new", {
        error: "error:problemas al guardar la información",
      });
    } else {
      //aqui agregar metodo SQL
      console.log("LOS DATOS SE GUARDARON EXITOSAMENTE EN MONGO ATLAS");
      let user = { ...req.body };
      dbsql.insertarUser(user).then((result) => {
        console.log("Los datos se guardaron exitosamente en SQL SERVER");
        res.redirect("user-list");
      });
      //en casoo todo vaya bien
      //res.render('user-new',{exito:"los datos se guardaron exitosamente"});
    }
  });
});

router.get("/user-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    dbsql.getUsuarios().then((data) => {
      res.render("user-list", {
        data: data[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
      //console.log(data);
    });
  }
});
router.get("/user-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("user-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});
router.get("/user-update", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("user-update", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

//                  cliente
router.get("/client-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("client-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});
router.get("/client-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    dbsql.getCliente().then((data) => {
      res.render("client-list", {
        data: data[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

router.get("/client-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("client-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/client-update", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta pagina</a></h3>'
    );
  } else {
    res.render("client-update", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

// productos

router.get("/product-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    let proveedor
    dbsql.getProveedorOption().then((results) =>{
      proveedor = results;
    });
    dbsql.getCategoriaOption().then((data) => {
      res.render("product-new", {data: data[0],proveedor:proveedor[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

router.get("/product-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    dbsql.getProductos().then((data) => {
      //console.log(data);
      res.render("product-list", {
        data: data[0],
        profile: {
          id: req.session.clave,
          name: req.session.name,
          email: req.session.email,
          password: req.session.password,
          imagen: req.session.imagenes,
        },
      });
    });
  }
});

router.get("/product-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("product-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/product-sold", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("product-sold", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/product-update", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("product-update", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

// compras

router.get("/shop-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("shop-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/shop-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("shop-list", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/shop-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("shop-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/shop-detail", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("shop-detail", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

// ventas

router.get("/sale-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("sale-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/sale-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("sale-list", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/sale-search-date", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("sale-search-date", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/sale-search-code", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("sale-search-code", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/sale-detail", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("sale-detail", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

// devoluciones

router.get("/return-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("return-list", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});
router.get("/return-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("return-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

// configuraciones

router.get("/company", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("company", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

//  movimientos en caja
router.get("/movement-new", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("movement-new", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/movement-list", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("movement-list", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});
router.get("/movement-search", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("movement-search", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

// reporte
router.get("/report-sales", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("report-sales", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});
router.get("/report-inventory", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("report-inventory", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("/prueba", (req, res) => {
  if (!req.session.clave) {
    res.send(
      '<h3> <a href="/">Debes iniciar seción para ver esta paguina</a></h3>'
    );
  } else {
    res.render("prueba", {
      profile: {
        id: req.session.clave,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
        imagen: req.session.imagenes,
      },
    });
  }
});

router.get("*", (req, res) => {
  res.render("404");
});

///PETICIONES****************************

//obtener todas las categorias

//para dar de alta una categoria
//router.post("/guardar",
router.post("/altaCategoria", (req, res) => {
  let categoria = { ...req.body };
  dbsql.insertarCategoria(categoria).then((result) => {
    res.redirect("/category-list");
    // console.log(nombre)
    // console.log(idEstado)
    // console.log(detalle)
    //console.log(categoria);
  });
});

router.post("/updateCategoria", (req, res) => {
  let categoria = { ...req.body };
  dbsql.actualizarCategoria(categoria).then((result) => {
    res.redirect("/category-list");
  });
});

router.post("/updateCaja", (req, res) => {
  let caja = { ...req.body };
  dbsql.actualizarCaja(caja).then((result) => {
    res.redirect("/cashier-list");
  });
});

router.post("/updateProveedor", (req, res) => {
  let proveedor = { ...req.body };
  dbsql.actualizarProveedor(proveedor).then((result) => {
    res.redirect("/provider-list");
  });
});

router.post("/altaCaja", (req, res) => {
  let caja = { ...req.body };
  dbsql.insertarCaja(caja).then((result) => {
    res.redirect("/cashier-list");
  });
});

router.post("/altaProveedor", (req, res) => {
  let proveedor = { ...req.body };
  dbsql.insertarProveedor(proveedor).then((result) => {
    res.redirect("/provider-list");
  });
});

router.post("/eliminarCategoria", (req, res) => {
  let categoria = { ...req.body };
  dbsql.eliminarCategoria(categoria).then((result) => {
    res.redirect("/category-list");
    //console.log(categoria)
  });
});

router.post("/eliminarCaja", (req, res) => {
  let caja = { ...req.body };
  dbsql.eliminarCaja(caja).then((result) => {
    res.redirect("/cashier-list");
    //console.log(categoria)
  });
});

router.post("/eliminarProveedor", (req, res) => {
  let proveedor = { ...req.body };
  dbsql.eliminarProveedor(proveedor).then((result) => {
    res.redirect("/provider-list");
    //console.log(categoria)
  });
});

module.exports = router;
