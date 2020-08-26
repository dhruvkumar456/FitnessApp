const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/fitness-app',{
    useNewUrlParser:true,
    useUnifiedTopology: true ,
    useCreateIndex:true,//will create indices in mongoose database so we can access things easily
    useFindAndModify:false
    })


