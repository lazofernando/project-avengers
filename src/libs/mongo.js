const mongoose =require('mongoose');
//iniciando el modelo
//conectarse a la base de datos
mongoose.connect('mongodb+srv://jeanpierinca:jeanpier12oo@clustercertus.y176v.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true});
//en caso aya un error 
mongoose.connection.on('error',function(err){
    console.log('error en la conección de mongoDB');
});
 // en caso se conecto a mongoBD
mongoose.connection.once('open',function(){

    console.log('Success: La conexión esta abierta a mogodb atlas');
});