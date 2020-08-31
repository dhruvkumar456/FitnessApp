const mongoose=require('mongoose')

const adminschema=mongoose.Schema({
    videono:{
        type:String,
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

const Admin=mongoose.model('Admin',adminschema)
module.exports=Admin