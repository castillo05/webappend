'use strict'

var express= require('express');
var RolController=require('../controller/role');

var api = express.Router();



api.post('/agregar',RolController.saveRole);

module.exports=api;