require('./db/mongoose')
const express=require('express')
const app=express()

const userrouter=require('./routers/user')
app.use(express.json())

app.use(userrouter)

const port=3000||process.env.PORT

app.listen(port,()=>{
    console.log(`server is up at port `+port)
})
