'use strict'

var express= require('express');
var PostController=require('../controller/post');
var api = express.Router();

var md_auth=require('../midelware/authenticated');

api.post('/agregar-post',md_auth.ensureAuth,PostController.savePost);
api.get('/posts/:page?',PostController.getPost);

module.exports=api;