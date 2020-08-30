const express=require('express')
const router=express.Router()

const Library=require('../schemas/library')

const initLibrary=(_id)=>{
    const lib=new Library({
        user:_id
    })
    lib.save()
}


module.exports={
    initLibrary
}