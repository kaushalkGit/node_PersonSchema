const express=require('express')
const route=express.Router()

const menuItem=require('../models/menuItem')//linking with Schema
route.get('/', async (req, res) => {
  try {
    const response = await menuItem.find();
    console.log("Response Fetched");
    res.status(202).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});//hola
route.post('/', async(req,res)=>{
  try{
    const data=req.body;//data will get whatever is in req body
    const newItem=new menuItem(data)//creating new object using the given mongoose
    const response=await newItem.save()
    console.log("Item Added")
    res.status(200).json(response)
  }catch(err){
    console.log(err)
  res.status(500).json({error:"Internal Server Error"})
    }
  });

  route.get('/:tasteType',async(req,res)=>{
    try{
      const tasteType=req.params.tasteType
      if(tasteType=="sweet"||tasteType=="spicy"||tasteType=="sour"){
        const response=await menuItem.find({taste:tasteType});
        console.log("Response Fetched")
        res.status(202).json(response)
      }else{
        console.log("Response Failure")
        res.status(402).json({error:"Error"})
      }
    }catch(err){
      console.log(err)
      res.status(500).json({error:"Internal Server Error"})
    }
  })
  route.put('/:id',async (req,res)=>{
    try{
      const menuID=req.params.id;
      const updatedmenuData=req.body
      const respond=await menuItem.findByIdAndUpdate(menuID,updatedmenuData,{
        new:true,//return the update document
        runValidators:true,//checking all validator
      })
      if(!respond){
        return res.status(404).json({error:"Item Was't Found"})
      }
      console.log("Response Fetched")
      res.status(202).json(respond)
    }catch(err){
      console.log(err)
      res.status(500).json({error:"Internal Server Error"})
    }
  })
route.delete('/:id',async (req,res)=>{
  try{
    const menuID=req.params.id;

    const response=await menuItem.findByIdAndDelete(menuID);
    if(!response){
      return res.status(404).json({error:"Item Was't Found to delete"})
    }
    console.log("Deleted Succesfully")
    res.status(202).json(response)
  }catch(err){
    console.log(err)
      res.status(500).json({error:"Internal Server Error"})
  }
})
  module.exports=route