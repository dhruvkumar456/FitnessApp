const express=require('express')
const router=express.Router()

const Library=require('../schemas/library')
const auth=require('../authentication/auth')
const Video=require('../schemas/video')

const initLibrary=(_id)=>{
    const lib=new Library({
        user:_id
    })
    lib.save()
}

router.post('/library/recent',auth,async (req,res)=>{
    try{
        const videono=req.query.videono
        
        await req.user.populate('lib').execPopulate()
        const lib=await Library.findById({_id:req.user.lib[0]._id})
        lib.recents=lib.recents.concat({recent:videono})
        await lib.save()
        res.send(lib)
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/library/like',auth,async (req,res)=>{
    try{
        const videono=req.query.videono
        await req.user.populate('lib').execPopulate()
        const lib=await Library.findById({_id:req.user.lib[0]._id})
        lib.liked=lib.liked.concat({like:videono})

        const video=await Video.findOne({videono})
        video.likes=video.likes+1
        await video.save()
        
        await lib.save()
        res.send(lib)
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/library/watchlater',auth,async (req,res)=>{
    try{
        const videono=req.query.videono
        await req.user.populate('lib').execPopulate()
        const lib=await Library.findById({_id:req.user.lib[0]._id})
        lib.watchLaters=lib.watchLaters.concat({watchLater:videono})
        await lib.save()
        res.send(lib)
    }catch(e){
        res.status(400).send(e)
    }
})


router.get('/library/recent',auth,async (req,res)=>{
    try{
        await req.user.populate('lib').execPopulate()
        res.send(req.user.lib[0].recents)
    }catch(e){
        res.status(400).send(e)
    }
})



router.get('/library/like',auth,async (req,res)=>{
    try{
        await req.user.populate('lib').execPopulate()
        res.send(req.user.lib[0].liked)
    }catch(e){
        res.status(400).send(e)
    }
})


router.get('/library/watchlater',auth,async (req,res)=>{
    try{
        await req.user.populate('lib').execPopulate()
        res.send(req.user.lib[0].watchLaters)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/removeliked',auth,async(req,res)=>{
    const videono=req.query.videono
    try{
        const lib=await Library.findOne({user:req.user._id})
        lib.recents=lib.recents.filter(element => {
            return element!=videono            
        })
        await lib.save()
        res.send(lib.recents)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/removewatchlater',auth,async(req,res)=>{
    const videono=req.query.videono
    try{
        const lib=await Library.findOne({user:req.user._id})
        lib.watchLaters=lib.watchLaters.filter(element => {
            return element.watchLater!=videono            
        })
        await lib.save()
        res.send(lib.watchLaters)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports={
    initLibrary,
    router
}