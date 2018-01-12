'use strict'

var mongoose=require('mongoose');
var Schema= mongoose.Schema;

var PublicationSchema=new Schema({
    title:String,
    description:String,
    date:String,
    imagen:String,
    category:{type:Schema.ObjectId,ref:'Category'},
    user:{type: Schema.ObjectId, ref:'User'}
    
});

module.exports=mongoose.model('Publication',PublicationSchema);