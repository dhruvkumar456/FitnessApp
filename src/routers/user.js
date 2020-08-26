const express=require('express')
const router=express.Router()

const User=require('../schemas/user')
router.post('/',async(req,res)=>{
    const user=new User(req.body)
    try{
        const token=await user.generatetoken()
        await user.save()
        res.send({user,token})
    }catch(e){
        res.status(401).send(e.message)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user=await User.findinguser(req.body.name,req.body.password)
        const token=await user.generatetoken()
        await user.save()
        res.send({user,token})
    }catch(e){
        res.status(401).send(e.message)
    }
})

module.exports=router