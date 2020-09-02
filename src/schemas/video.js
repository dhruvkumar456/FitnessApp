require('../db/mongoose')
const mongoose =require('mongoose')
const videoschema=new mongoose.Schema({
    videono:{
        type:Number,
        required:true
    },
    calorie:{
        type:Number,
        required:true
    },
    likes:{
        type:Number,
        required:true
    },
    dislikes:{
        type:Number,
        required:true
    }
})

const Video=mongoose.model('video',videoschema,'video')
module.exports=Video