const mongoose=require('mongoose')


const libraryScheme=new mongoose.Schema({
    recents:[{
        recent:{
            type:String,
            trim:true,
            unique:true
        }
    }],
    watchLaters:[{
        watchLater:{
            type:String,
            trim:true,
            unique:true
        }
    }],
    liked:[{
        like:{
            type:String,
            trim:true,
            unique:true
        }
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
})


const Library=new mongoose.model('Library',libraryScheme)

module.exports=Library