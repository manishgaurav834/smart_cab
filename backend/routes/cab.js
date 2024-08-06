const express= require('express');
const router=express.Router();
const User = require('../modules/User')
const Cab=require('../modules/Cab')


fetchuser= require('../middleware/fetchuser');


router.get('/fetchallcab',async (req,res)=>{

    const cab=await Cab.find()
    res.json(cab)

    

})

router.post('/addcab',fetchuser,async (req,res)=>{

    try {
        const{D_}= req.body;
       
       
      
    
        const food = new Food({
            item , calorie ,protein,carbs,sugar,fat,img , user : req.user.id
    
    
        })
    
        const savedfood = await food.save()
    
        res.json(savedfood)
    
        
        
    } catch(error){
        console.error(error)
        res.status(500).send('Unexpected ERROR ocuured')
    }
    
   
    

    

})

router.put('/updatecab/:id',fetchuser,async (req,res)=>{

    try {
        const {X,Y,status,curr} = req.body;

        const newcab ={};
        if(X) {newcab.X=X}
        if(Y) {newcab.Y=Y}

        {newcab.status=status}
        {newcab.curr=curr}
    
        let cab = await Cab.findById(req.params.id)
    
        if(!cab){return res.status(400).send("not found")}
    
        // if(cab.user.toString() !== req.user.id){
        //     return res.status(401).send("not allowed")
        // }
    
        cab = await Cab.findByIdAndUpdate(req.params.id,{$set : newcab}, {new:true})
        res.json(cab)
        
    } catch(error){
        console.error(error)
        res.status(500).send('Unexpected ERROR ocuured')
    }
   

})

    






module.exports=router;