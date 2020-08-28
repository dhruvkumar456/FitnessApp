const mongoose=require('mongoose')
const User=require('../schemas/user')

const informationschema=new mongoose.Schema({
    height:{
        type:Number,
        required:true,
        trim:true
    },
    weight_record:[{
        weight:{
            type:Number,
            required:true,
            created_at:true
        },
        created_at:{
            type:Date,
            required:true,
            default:Date.now
        }
    }],
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


const Information=new mongoose.model('Information',informationschema)
module.exports=Information