'use strict'

var express = require('express');
var CategoriaController=require('../controller/categoria');

var api = express.Router();

var md_auth= require('../midelware/authenticated');

api.get('/prueba_cat',CategoriaController.prueba_cat);
api.post('/agregar-categoria',CategoriaController.saveCategoria);

module.exports=api;