'use strict'

var categoria= require('../models/categoria');

function prueba_cat(req,res) {
    res.status(200).send({message:'Controlador categoria funcionando'});
}

function saveCategoria(req,res) {
    var cat=new categoria();

    cat.categoria=req.body.categoria;

    if (cat.categoria!=null) {
        cat.save((err,catStored)=>{
            if (err) {
                res.status(500).send({message:'Error al guardar los DAtos'});
            } else {
                if (!catStored) {
                    res.status(404).send({message:'Error la guardar la Categoria'});
                } else {
                    res.status(200).send({cat:catStored});
                }
            }
        });
    }
}

module.exports={
    prueba_cat,
    saveCategoria
};