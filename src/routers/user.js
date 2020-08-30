const express=require('express')
const router=express.Router()
const auth=require('../authentication/auth')

const {initLibrary}=require('../routers/library')

const User=require('../schemas/user')
router.post('/',async(req,res)=>{
    const user=new User(req.body)
    try{
        const token=await user.generatetoken()
        await user.save()
        initLibrary(user._id)
        res.status(201).send({user,token})
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
// let Vimeo = require('vimeo').Vimeo;
// let client = new Vimeo("34f1cfef21b53744b6faf4364179c853addc9eaf", "cuXzzy6K8i778lv5mBeY515Ynuyh98+u42x9dpmVazlnBHNkFPKzfO3LCwTxqaDAKeHJ7nAN5rBVT1s3+BXvgT/1hdEa6OVAApFJBHgJZrTSHeUl/QURX5oSZ9YAlm3x", "7f9365ed1f5f6e5f68b71b5ec8902cdc");

// client.request({
//   method: 'GET',
//   path: '/tutorial'
// }, function (error, body, status_code, headers) {
//   if (error) {
//     console.log(error);
//   }

//   console.log(body);
// })


module.exports=router