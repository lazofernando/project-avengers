const path = require('path')
const express = require('express')
const logger = require('morgan')
const app = express()
const indexRoutes = require('./src/routes/index')

app.set('port', process.env.PORT || 3001 )
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(__dirname + '/public'));
//app.use(express.static('/public'));

app.use('/', indexRoutes)

app.listen(app.get('port'), ()=>{
    console.log("Servidor en Puerto", app.get('port'))
})  