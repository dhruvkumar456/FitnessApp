const express=require('express')
const router=express.Router()

const Library=require('../schemas/library')
const auth=require('../authentication/auth')

const initLibrary=(_id)=>{
    const lib=new Library({
        user:_id
    })
    lib.save()
}

router.post('/library/recent',auth,(req,res)=>{

})



module.exports={
    initLibrary
}