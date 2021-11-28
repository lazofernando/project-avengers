require('dotenv/config');

const MongoClient = require('mongodb').MongoClient
const uri = process.env.CONNECTION_STRING;


let client;

module.exports = function(){
    if(!client){
        try{
            client = new MongoClient(uri,
                {
                    userNewUrlParser:true, 
                    useUnifiedTopolgy:true
                });
        } catch(e){
            console.log("Error al conectarse a la BD ", e)
        }        
    }

    return client;
}