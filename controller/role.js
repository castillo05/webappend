'use strict'

var role=require('../models/roles');


function saveRole(req,res){
    var rol= new role();

    rol.roles=req.body.roles;

    if(rol.roles!=null){
        rol.save((err,rolStored)=>{
            if (err) {
                res.status(500).send({message:'Error al guardar los datos'});
            } else {
                if (!rolStored) {
                    res.status(400).send({message:'Error al guardar el Rol'});
                } else {
                    res.status(200).send({message:rolStored});
                }
            }
        });
    }else{
        res.status(200).send({message:'Introduzca el nombre del role'});
    }
}

module.exports={
    saveRole
};