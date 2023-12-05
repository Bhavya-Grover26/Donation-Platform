const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT=5000
const {JWT_SECRET, MONGOURI}= require('../config/keys')


require('./models/user')
require('./models/org')
require('./models/event')
require('./models/donation')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/event'))
app.use(require('./routes/donation'))

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongoooooooo")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
  if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})