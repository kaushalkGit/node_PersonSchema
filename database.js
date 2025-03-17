const mongoose=require('mongoose')

const mongoURL='mongodb://127.0.0.1:27017/myMenu'
mongoose.connect(mongoURL)
const db=mongoose.connection;

db.on('open',()=>{
  console.log("Connected to Database")
})
db.on('error',(err)=>{
  console.log("Error Encountered",err)
})
module.exports=db;