const MongoClient = require('mongodb').MongoClient
// const uri = "mongodb+srv://ebarrientos:txoQ71lZEkUAi6Ho@cluster0.imosr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const uri = "mongodb+srv://Jasef:abc123xd@clustercertus.arjsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let client;

module.exports = function(){
    if(!client){
        try{
            client = new MongoClient(uri, {userNewUrlParser:true, useUnifiedTopolgy:true});
        } catch(e){
            console.log("Error al conectarse a la BD ", e)
        }        
    }

    return client;
}