const mongoose = require('mongoose');

const { Schema } = mongoose;

const tripSchema = new Schema({

    D_name:{
        type:String,
        required:true
    },

    startX:{
        type:Number,
        required:true
       
        
    },

    startY:{
        type:Number,
        required:true
    },

    destinationX:{
        type:Number,
        required:true
    },

    destinationY:{
        type:Number,
        required:true
    },

    user:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    
    date:{
        type:Date,
        default:Date.now
    }



 
});

const Trip= mongoose.model('trip',tripSchema);
module.exports= Trip;