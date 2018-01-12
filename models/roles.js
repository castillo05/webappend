'use strict'

var mongoose= require('mongoose')
var Schema=mongoose.Schema;

var RolesSchema=Schema({
    roles:String
});

module.exports=mongoose.model('Roles',RolesSchema);