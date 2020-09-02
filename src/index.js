require('./db/mongoose')
const express=require('express')
const app=express()

const userrouter=require('./routers/user')
const informationrouter=require('./routers/information')
const {router:libraryrouter}=require('./routers/library')
const videorouter=require('./routers/Video')
app.use(express.json())

app.use(userrouter)
app.use(informationrouter)
app.use(libraryrouter)
app.use(videorouter)


const port=3000 || process.env.PORT

app.listen(port,()=>{
    console.log(`server is up at port `+port)
})
