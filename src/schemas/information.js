const mongoose=require('mongoose')
const User=require('../schemas/user')

const informationschema=new mongoose.Schema({
    height:{
        type:Number,
        required:true,
        trim:true
    },
    weight:{
        type:Number,
        required:true,
    },
    gender:{
        type:Boolean,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})


const Task=new mongoose.model('Task',informationschema)
module.exports=Task