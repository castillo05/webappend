'use strict'

var fs = require('fs');
var path=require('path');
var bcrypt=require('bcrypt-nodejs');
var mongoosePaginate=require('mongoose-Pagination');


var User= require('../models/user');
var Roles= require('../models/roles');

var jwt =require('../service/jwt');

function prueba(req,res) {
    res.status(200).send({message:'Probando Controlador de Usuarios'});
}

function saveUser(req,res){
    var user= new User();

    // var params= req.boby;

    console.log(req.body);
    user.name=req.body.name;
    user.surname=req.body.surname;
    user.email=req.body.email;
    user.image='null';
    user.roles=req.body.roles;

    if (req.body.password) {
        //Enciptar contrasena y datos
        bcrypt.hash(req.body.password,null,null,function (err,hash) {
           user.password=hash;
           if (user.name!=null && user.surname!=null && user.email!=null) {
               user.save((err,userStored)=>{
                    if (err) {
                        res.status(500).send({message:'Error al guardar los datos'});
                    } else {
                        if (!userStored) {
                            res.status(400).send({message:'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({user:userStored});
                        }
                    }
               });
           } else {
            res.status(200).send({message:'Rellena todos los campos'});
           } 
        });
    } else {
        res.status(500).send({message:'Introduzca la contrasenia'});
    }

}

function loginUser(req,res) {
    var email=req.body.email;
    var password=req.body.password;

    User.findOne({email:email.toLowerCase()},(err,user)=>{
        if (err) {
            res.status(500).send({message:'Error en la peticion'});
            
        } else {
            if (!user) {
                res.status(404).send({message:'El usuario no existe en la base de datos'});
                
            } else {
                    bcrypt.compare(password,user.password,function (arr,check) {
                if (check) {
                    //Comprobar datos
                    if (req.body.gethash) {
                        res.status(200).send({token:jwt.createToken(user)});
                    } else {
                        res.status(200).send({user});
                    }
                } else {
                    res.status(404).send({message:'El usuario no ha podido logearse'});
                } 
                });
            }

           
        }
    });
}


function updateUser(req,res){
    var UserId=req.params.id;
    var update=req.body;

    User.findByIdAndUpdate(UserId,update,(err,userUpdate)=>{
        if (err) {
            res.status(505).send({message:'Error en la Peticion'});
        } else {
            if (!userUpdate) {
                res.status(404).send({message:'No se actualizo el Ususario'});                
            } else {
                res.status(200).send({user:userUpdate});
            }
        }
    });
}

function getUsers(req,res) {
    if (req.params.page) {
        var page=req.params.page;
    } else {
        var page=1;
    }

    var itemPerPage=3;

    User.find().sort('name').paginate(page,itemPerPage,function(err,users,total) {
       if (err) {
        res.status(500).send({message:'Error en la peticion'});        
       } else {
           if (!users) {
            res.status(404).send({message:'No hay Usuarios'});
            
           } else {
            res.status(200).send({
                total_items:total,
                users:users
            });
            
               
           }
       } 
    });
}

module.exports={
    prueba,
    saveUser,
    loginUser,
    updateUser,
    getUsers
};