const express = require('express')
const { mongoose } = require('./config/database')
const cors = require('cors')
const router = require('./config/routes')
 

const app = express() 
const port = process.env.PORT || 3015

app.use(express.json())
app.use(cors())
app.use('/', router)


app.get('/',(req,res)=>{
    res.json({
        notice:"Welcome to user authentication application"
    })
})


app.listen(port, function(){
    console.log('listening on port', port)
})


 