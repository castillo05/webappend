'use strict'
var express = require ('express');
var bodyParser= require('body-parser');
var app = express();

//cargar Rutas
var user_routes=require('./routes/user');
var roles_routes=require('./routes/rol');
var categoria_routes=require('./routes/categoria');
var post_routes=require('./routes/post');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




//configurar cabeceras http
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.get('/prueba',function(req,res){
    res.status(200).send({message:'Bienvenido a www.jorgecastillomoreno.com'});
});


//rutas
app.use('/api',user_routes);

//rutas para roles
app.use('/api',roles_routes);
app.use('/api',categoria_routes);
app.use('/api',post_routes);


module.exports=app;