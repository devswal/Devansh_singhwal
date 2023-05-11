const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyschema = new Schema({
    company_id:{
    type:String,
    required:true
    },
   name:{
    type:String,
    required:true
   },
   primary_text:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   headline:{
    type:String,
    required:true
   },
   image_url:{
    type:String,
    required:true
   }

})


module.exports = mongoose.model("company",companyschema);