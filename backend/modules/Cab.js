const mongoose = require('mongoose');

const { Schema } = mongoose;

const cabSchema = new Schema({

    D_name:{
        type:String,
        required:true
    },

    X:{
        type:Number,
        required:true
       
        
    },

    Y:{
        type:Number,
        required:true
    },

    status:{
        type:Boolean,
        default:false

    },

    curr:{
        type:Boolean,
        default:false
    },

    
    date:{
        type:String,
        default:Date.now
    }



 
});

const Cab= mongoose.model('cab',cabSchema);
module.exports= Cab;