const express= require('express');
const router=express.Router();
const User = require('../modules/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET='travelwithus';

fetchuser= require('../middleware/fetchuser');


router.post('/createuser',
[body('name','Enter a Valid name').isLength({min:3}),body('email').isEmail(),body('password').isLength({min:5})],

async (req,res)=>{
    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    try{
        let success=false
    
    
    let user= await User.findOne({email:req.body.email})

    if(user){
        return res.status(400).json({success:success,message:"Duplicate entry"})
    }
    const salt = await bcrypt.genSalt(10);

    const secPass= await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    });
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data, JWT_SECRET);
    success=true
    
    res.json({success,authtoken})
} catch(error){
    console.error(error)
    res.status(500).send('Unexpected ERROR ocuured')
}
     
    

})



router.post('/login',
[body('email','Enter a valid email').isEmail(),body('password','Password can not be blank').exists()],

async (req,res)=>{
   

    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email , password}=req.body;

    try {
        let success = false
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({succes:success , error : "Login with correct credentials"})
        }

        const passwordCompare =await bcrypt.compare(password, user.password);

        if(!passwordCompare){

            return res.status(400).json({success:success,error : "Login with correct credentials"})

        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
        success=true;
        
        res.json({success,authtoken})
        
    } catch(error){
        console.error(error)
        res.status(500).send('Unexpected ERROR ocuured')
    }




})

router.post('/getuser',fetchuser,async (req,res)=>{

try {
    const userId= req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch(error){
    console.error(error)
    res.status(500).send('Unexpected ERROR ocuured')
}

})




module.exports=router;