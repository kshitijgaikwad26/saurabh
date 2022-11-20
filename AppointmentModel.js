const mongoose=require('mongoose')
const AppointmentSchema=mongoose.Schema({
                       "patientName":{
                        type:String,
                        require:true
                       },
                        "age":{
                        type:Number,
                        require:true
                       },
                       "gender":{
                        type:String,
                        require:true
                       },
                       "date":{
                        type:Date,
                        require:true
                       }, 
                       "time":{
                        type:Date,
                        require:true
                       },
                       "address":{
                        type:String,
                        require:true
                       },
                       "testName":{
                        type:String,
                        require:true
                       },
                       "status":{
                        type:String
                       },
                       "reason":{
                        type:String
                       },
                       "email":{
                        type:String
                       }
                    })
module.exports=mongoose.model("Appointment",AppointmentSchema)


