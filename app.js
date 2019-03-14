const express = require('express')
const app = express();
const  bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(cors());

//logger
app.use(morgan('dev'))

//bodyparser for post request
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: false,limit:"50mb"}));

//routers
const login= require('./route/login');
const signup = require('./route/signup');
const error = require('./route/error');



// Login 
app.use(login);

//signup
app.use(signup);

//Testing purpose
app.get('/',(req,res)=>{
   console.log("this is api server")
    res.send('Node api server')
});
// handel errors

app.use(error);

//server
const server =app.listen(4000,()=>{
  var host = server.address().address
var port = server.address().port

console.log("App listening at http://%s:%s", host, port)   
})