const express=require('express')
const router=express.Router()
const auth=require('../authentication/auth')

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


router.get('/profile',auth,async (req,res)=>{
    try{
        res.send(req.user)
    }catch(e){
        res.send(e)
    }
})


router.patch('/edit',auth,async (req,res)=>{
    try{
        const updates=Object.keys(req.body)
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.send(e)
    }
})

router.post('/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){

    }
})


module.exports=router