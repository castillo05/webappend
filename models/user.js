'use strict'

var mongoose=require('mongoose');
var Schema= mongoose.Schema;

var UserSchema=new Schema({
    name:String,
    surname:String,
    email:String,
    password:String,
    image:String,
    roles:{type: Schema.ObjectId, ref:'Roles'}
    
});

module.exports=mongoose.model('User',UserSchema);