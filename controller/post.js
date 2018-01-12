'use strict'
var moment=require('moment');
var fs = require('fs');
var path= require('path');
var mongoosePagination=require('mongoose-pagination');
var Post=require('../models/publication');
var categoria= require('../models/categoria');
var User=require('../models/user');


function savePost(req,res) {
    var post = new Post();

    post.title=req.body.title;
    post.description=req.body.description;
    post.date=moment().unix();
    post.imagen='';
    post.category=req.body.category;
    post.user=req.user.sub;

    post.save((err,postStored)=>{
        if (err) {
            res.status(500).send({err});
        } else {
            if (!postStored) {
                res.status(404).send({message:'No se guardo el Post'});
            } else {
                res.status(200).send({post:postStored});
            }
        }
    });




    
}


function getPost(req,res) {
    if (req.params.page) {
        var page=req.params.page;
    } else {
        var page=1;
    }
    var itemPerPage=6;

   
    Post.find().populate({path:'user'}).paginate(page,itemPerPage,function (err,posts,total) {
        if (err) {
            res.status(500).send({Message:'Error en la peticion'});
        } else {
            if (!posts) {
                res.status(404).send({message:'No ha Post'});
            } else {
                return res.status(200).send({
                    total_items:total,
                    posts:posts
                });
            }
        }
    });
    
}

module.exports={
    savePost,getPost
};