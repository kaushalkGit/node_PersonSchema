const express=require('express')
const app=express();//express for server
const bodyParser=require("body-parser")
app.use(bodyParser.json()); //middleware
const db=require('./database')//linking with Mongodb
const menuItem=require('./models/menuItem')//linking with Schema

app.get('/',(req,res)=>{
  res.send("Server Started")
})
const menuRoutes=require('./routes/menuRoutes')
app.use('/item',menuRoutes)
  

app.listen(2000)