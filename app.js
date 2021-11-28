const path = require('path')
const express = require('express')
const logger = require('morgan')
const app = express()

//Routes
const indexRoutes = require('./src/routes/index')
// const cashierRouter = require('./models/cashier');
require('dotenv/config');

//settinggs
app.set('port', process.env.PORT || 3001 )
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')






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


