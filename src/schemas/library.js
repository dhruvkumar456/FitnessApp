const mongoose=require('mongoose')


const libraryScheme=new mongoose.Schema({
    recents:[{
        recent:{
            type:Number,
            trim:true,
            unique:true
        }
    }],
    watchLaters:[{
        watchLater:{
            type:Number,
            trim:true,
            unique:true
        }
    }],
    liked:[{
        like:{
            type:Number,
            trim:true,
            unique:true
        }
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
})


const Library=new mongoose.model('Library',libraryScheme)

module.exports=Library