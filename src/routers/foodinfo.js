const express=require('express')
const router=express.Router()

const fooddetails=require('../utils/utils')

router.get('/foodinfo',(req,res)=>{
    const foodname=req.query.foodname
    fooddetails(foodname,(error,response)=>{
        if(error=='Try Another Name'){
            res.status(404).send(error)
        }else if(error=='Network error '){
            res.status(500).send(error)
        }else{
            res.send(response)
        }
    })
})

module.exports=router