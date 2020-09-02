
const express=require('express')
const router=express.Router()
const auth=require('../authentication/auth')
const Video=require('../schemas/video')
router.get('/videoinfo',auth,async (req,res)=>{
    const videono=req.query.videono
    try{
        const video=await Video.findOne({videono})
        if(!video){
            return res.status(404).send('Video not found!!')
        }
        res.send(video)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/videoinfo',auth,async(req,res)=>{
    try{
        const video=new Video(req.body)
        await video.save()
        res.send(video)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router
