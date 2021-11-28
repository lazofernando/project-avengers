const mongoose =require('mongoose');


const cashierSchema= moongoose.Schema({
  numeroCaja : String,
  codigoCaja : String,
  estadoCaja: Boolean,
  efectivoCaja : Number,
  countInCashier :{
    type:Number,
    required :true
  }
})







// const userSchema= moongoose.Schema({
//   tipoDocumento : String,
//   numeroDocumento : String,
//   cargo: String,
//   nombre: String,
//   apellido: String,
//   telefono : String,
//   genero: String,
//   lectorBarra: Boolean,
//   codgioBarras: Boolean,
//   cajaVentas: String,
//   nombreUsuario : String,
//   email :String,
//   contraseña : String,
//   estadoCuenta: Boolean,
//   avatar:Image,
// })

const Category =mongoose.model('Category',categorySchema);
const Provider =mongoose.model('Provider',providerSchema);
const User =mongoose.model('User',userSchema);
const Client =mongoose.model('Client',clientSchema);
const Product =mongoose.model('Product',productSchema);
const Shop =mongoose.model('Shop',shopSchema);
const Sale =mongoose.model('Sale',saleSchema);
const Movement =mongoose.model('Movement',movementSchema);

// Cashier
// Category
// Provider
// User
// Client
// Product
// Shop
// Sale
// Movement

app.use(`${api}/cashier`, cashierRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


app.get(`${api}/Cashier`, async(req,res)=>{
  const cashierList = await Cashier.find();
if (!cashierList) {
  res.status(500).json({uccess : false})
}

  res.send(cashierList);
});

app.post(`${api}/Cashier`, (req,res)=>{
  const cashier =new Cashier({
    numeroCaja : req.body.numeroCaja,
    codigoCaja : req.body.codigoCaja,
    estadoCaja : req.body.estadoCaja,
    efectivoCaja : req.body.efectivoCaja,
    countinCashier : req.body.Cashier 
  })
  cashier.save().then((createdCashier=>{
    res.status(201).json(createdCashier)
  })).catch((err)=>{
    res.status(500).json({
      error : err,
      success : false
    })
  })
});