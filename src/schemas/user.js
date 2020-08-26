require('../db/mongoose')
const mongoose =require('mongoose')
const validator =require('validator')
const jwt=require('jsonwebtoken')
const bcryptjs =require('bcryptjs')
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate:{
            validator:(value)=>{
                  if(value.includes('password')){return false}
                  else{return true}              
            }
        }
    },
    location:{
        type:String,
        required:true,
        trim:true
        },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]    

})

userschema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcryptjs.hash(user.password,8)
    }
    next()
})

userschema.methods.toJSON=function(){
    const user=this
    const userobject=user.toObject()
    delete userobject.password
    return userobject
}

userschema.methods.generatetoken= async function (){
    const user=this
    const token=await jwt.sign({_id:user._id},'tokenisgenerated')
    user.tokens=user.tokens.concat({token})
    return token
}

userschema.statics.findinguser=async (name,password)=>{
    const user=await User.findOne({name})
    if(!user){
        throw new Error('User not found!!')
    }
    const ismatch=await bcryptjs.compare(password,user.password)
    if(!ismatch){
        throw new Error('User not found!')
    }
    return user
}

const User=mongoose.model('User',userschema)
module.exports=User
