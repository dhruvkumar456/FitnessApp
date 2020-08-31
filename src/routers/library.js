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

router.post('/library/recent',auth,async (req,res)=>{
    try{
        const vediono=req.query.vediono
        await req.user.populate('lib').execPopulate()
        const lib=await Library.findById({_id:req.user.lib[0]._id})
        lib.recents=lib.recents.concat({recent:vediono})
        await lib.save()
        res.send(lib)
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/library/like',auth,async (req,res)=>{
    try{
        const vediono=req.query.vediono
        await req.user.populate('lib').execPopulate()
        const lib=await Library.findById({_id:req.user.lib[0]._id})
        lib.liked=lib.liked.concat({like:vediono})
        await lib.save()
        res.send(lib)
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/library/watchlater',auth,async (req,res)=>{
    try{
        const vediono=req.query.vediono
        await req.user.populate('lib').execPopulate()
        const lib=await Library.findById({_id:req.user.lib[0]._id})
        lib.watchLaters=lib.watchLaters.concat({watchLater:vediono})
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


module.exports={
    initLibrary,
    router
}