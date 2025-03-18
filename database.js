const mongoose=require('mongoose')
require('dotenv').config()
//const mongoURL='mongodb://127.0.0.1:27017/myMenu'
const mongoURL=process.env.DB_URL;
mongoose.connect(mongoURL)
const db=mongoose.connection;

db.on('open',()=>{
  console.log("Connected to Database")
})
db.on('error',(err)=>{
  console.log("Error Encountered",err)
})
module.exports=db;