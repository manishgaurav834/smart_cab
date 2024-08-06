const mongoose= require('mongoose');

const url="mongodb://localhost:27017/smart_cab"


const ConnectMongo= ()=>{
    mongoose.connect(url)
    
}

module.exports=ConnectMongo; 