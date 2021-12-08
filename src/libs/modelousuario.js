const mongoose =require('mongoose');

const session =require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session);


//definir la estructura  de los documentos que se guardaran 
// en la base de datos
let customSchema= new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    img:String

});

//configurar modelo
//esto quiere decir para usar este modelo de datos en 
//otras partes de mi aplicación = //el modelo describe la collecccion dentro de 
 // la cual se van a guardar los documentos el nombre de la coleccion tiene que esta en singular
 //y su otro parametro es es monbre del esquema

module.exports=mongoose.model('login',customSchema)
