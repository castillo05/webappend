var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CategoriaSchema=new Schema({
    category:String
});

module.exports=mongoose.model('Category',CategoriaSchema);