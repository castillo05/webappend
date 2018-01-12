'use strict'
var mongoose=require('mongoose');
var port = process.env.PORT || 7777;
var app=require('./app');

mongoose.connect('mongodb://127.0.0.1:27017/webApp',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log('La base de datos esta corriendo correctamente');
        app.listen(port,function() {
           console.log('Aplicacion corriendo en el puerto'+port); 
        });
    }
});