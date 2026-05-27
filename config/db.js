const mongoose = require('mongoose');

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected')
        }
        
    catch(error){
        console.log('err ', error.message)
    }
}

module.exports = connectDb;