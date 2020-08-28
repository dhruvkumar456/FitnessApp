const express=require('express')
const router=express.Router()
const auth=require('../authentication/auth')

const Information=require('../schemas/information')


router.post('/info',auth,async (req,res)=>{
    try{
        await req.user.populate('info').execPopulate()
        const weight=req.body.weight
        if(req.user.info.length === 0)
        {
            const information=new Information({
                ...req.body,
                weight_record:[{weight}],
                user:req.user._id
            })
            await information.save()
            res.send(information)
        }
        else
        {
            const info=await Information.findById(req.user.info[0]._id)
            info.weight_record=info.weight_record.concat({weight})
            await info.save()
            res.send(info)
        }
        
    }catch(e){
        res.status(400).send(e)
    }
})


router.get('/info',auth,async(req,res)=>{
    try{
        await req.user.populate('info').execPopulate()
        res.send(req.user.info)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=router