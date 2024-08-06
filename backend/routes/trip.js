const express= require('express');
const router=express.Router();
const User = require('../modules/User')
const Trip= require('../modules/Trip')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET='travelwithus';

fetchuser= require('../middleware/fetchuser');


router.get('/fetchalltrips',fetchuser,async (req,res)=>{

    const trip =await Trip.find({user:req.user.id});
    res.json(trip)

    

})
     
    




router.post('/addtrip',fetchuser,async (req,res)=>{

    try {
        const{D_name,startX,startY,destinationX,destinationY}= req.body;
       
       
      
    
        const trip = new Trip({
            D_name,startX,startY,destinationX,destinationY , user : req.user.id
    
    
        })
    
        const savedtrip= await trip.save()
    
        res.json(savedtrip)
    
        
        
    } catch(error){
        console.error(error)
        res.status(500).send('Unexpected ERROR ocuured')
    }
    
   
    

    

})

router.delete('/deletetrip/:id',fetchuser,async (req,res)=>{


    try {
        let trip = await Trip.findById(req.params.id)

        if(!trip){return res.status(400).send("not found")}
    
        if(trip.user.toString() !== req.user.id){
            return res.status(401).send("not allowed")
        }
    
        trip = await Trip.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", trip:trip})
        
    } catch(error){
        console.error(error)
        res.status(500).send('Unexpected ERROR ocuured')
    }
   

})





module.exports=router;