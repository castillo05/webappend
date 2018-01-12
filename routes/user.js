'use strict'

var express= require('express');
var UserController=require('../controller/user');

var api = express.Router();

var md_auth=require('../midelware/authenticated');

api.get('/Probando-Controlador',UserController.prueba);
api.post('/Register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.get('/users/:page?',md_auth.ensureAuth,UserController.getUsers);


module.exports=api;