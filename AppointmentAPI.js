const express=require('express');
const AppointmentModel= require('../model/AppointmentModel')
require('../dbConfig/dbConnect')
const ex=express();

 const cors=require('cors')

ex.use(express.json())
 ex.use(cors())
ex.post('/insertAppointment',async(req,resp)=>{
    const Appointment=new AppointmentModel(req.body);
    const result=await Appointment.save();
    resp.send(result)
    console.log(result);
})
ex.get('/getAppointment',async(req,resp)=>{
    const result=await AppointmentModel.find()
    console.log(result);
    resp.send(result)
})

ex.put('/updateAppointment/:_id',async(req,resp)=>{
    const result=await AppointmentModel.updateOne(
        {'_id':req.params },
        {
            $set:req.body
        }
    )
    resp.send(result)
})



ex.delete('/deletetest/:_id',async(req,resp)=>{
    const result=await AppointmentModel.deleteOne(
        req.params
    )
    resp.send(result);
}
)
/////-------Cards--------////////
const CardsModel= require('../model/CardsModel')
ex.post('/insertCard',async(req,resp)=>{
    const CardModel=new CardsModel(req.body);
    const result=await CardModel.save();
    resp.send(result)
    console.log(result);
})

ex.get('/getCards',async(req,resp)=>{
    const result=await CardsModel.find()
    console.log(result);
    resp.send(result)
})


ex.delete('/deleteCard/:_id',async(req,resp)=>{
    const result=await CardsModel.deleteOne(
        req.params
    )
    resp.send(result);
}
)

ex.put('/updateCard/:_id',async(req,resp)=>{
    const result=await CardsModel.updateOne(
        {'_id':req.params },
        {
            $set:req.body
        }
    )
    resp.send(result)
})

///-----register------//////
const RegisterModel=require('../model/RegisterModel')
ex.post('/register',async(req,resp)=>{    
    const Register=new RegisterModel(req.body);
    const result=await Register.save();
    resp.send(result)
    console.log(result);
})
ex.get('/signIn',async(req,resp)=>{
    const result=await RegisterModel.find()
    console.log(result);
    resp.send(result)
})

ex.get("/signIn", (req, res) => {
    RegisterModel.find((err, foundEmployees) => {
        if (!err) {
            res.send(foundEmployees)
        } else {
            res.send(err);
        }
    })
})

ex.listen(4000)