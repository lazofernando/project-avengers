const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const session =require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session);


//initilization
const app = express()


//Routes
const indexRoutes = require('./src/routes/index');
const { request } = require('http');
// const cashierRouter = require('./models/cashier');
require('dotenv/config');

//settinggs
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3010 )






//middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(express.static(__dirname + '/public'));
//app.use(express.static('/public'));


//routers
// app.use(`${api}/cashier`, cashierRouter);

app.use('/', indexRoutes)





//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log("Servidor en Puerto", app.get('port'))
})  


