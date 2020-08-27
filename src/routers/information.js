const express=require('express')
const router=express.Router()
const auth=require('../authentication/auth')

const Information=require('../schemas/information')


router.post('/info',auth,async (req,res)=>{
    try{
        const information=new Information({
            ...req.body,
            user:req.user._id
        })
        await information.save()
        res.send(information)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=router