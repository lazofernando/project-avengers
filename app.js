const express = require('express')
const engine= require('ejs');
const path = require('path')
const logger = require('morgan')
const session = require('express-session');


//initilization
const app = express()
require('./src/passport/local-auth');

//Routes
const indexRoutes = require('./src/routes/index');
const passport = require('passport');
// const { session } = require('passport');
// const cashierRouter = require('./models/cashier');
require('dotenv/config');

//settinggs
app.set('views', path.join(__dirname, 'src/views'))
// app.engine('ejs',engine);
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3001 )






//middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(session({
//     secret : "avengers",
//     resave : false,
//     saveUninitialized : false
// }));
// app.use(passport.initialize());
// app.use(passport-session());


app.use(express.static(__dirname + '/public'));
//app.use(express.static('/public'));


//routers
// app.use(`${api}/cashier`, cashierRouter);

app.use('/', indexRoutes)


//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log("Servidor en Puerto", app.get('port'))
})  


