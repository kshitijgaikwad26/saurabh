const mongoose=require('mongoose')
const CardsSchema=mongoose.Schema({
    "testName":{
     type:String,
     require:true
    },
     "testDescription":{
     type:String,
     require:true
    },
    "price":{
     type:Number,
     require:true
    }
 })
 module.exports=mongoose.model("Cards",CardsSchema)
 
 
 