const express = require('express');
const cors = require('cors');
const app = express();
const User= require('./models/User');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.static('public'));

//connection
const mongoose = require("mongoose");
const CardModel = require('./models/CardDatail');
mongoose.connect("mongodb://127.0.0.1:27017/TUC")
.then(()=> {
    console.log("TUC connected");
})
.catch(()=>{
    console.log(" not connected");
})

//GET
app.get('/',cors(), (req, res) =>{
  res.send({
    hello: "e"
  })
})

//POST Login
app.post("/", async(req, res)=> {
  const{mobile, password}= req.body;

  try{
    const check = await User.findOne({mobile: mobile})
    if(check)
    {
      const check2= await User.findOne({password: password})
      if(check2)
        res.json("Exist");
      else
        res.json("Password is Wrong");
    }
    else
    {
      res.json("not Exist");
    }
  }
  catch(e){
    res.json("not Exist");
  }
})

//POST Signup
app.post("/signup", async(req, res)=> {
  const{name, mobile, email, password}= req.body;
  const data ={
    name : name,
    mobile : mobile,
    email : email,
    password: password
  }
  try{
    const check = await User.findOne({email: email})

    if(check)
    {
      res.json("Email is already Exist");
    }
    else
    {
      const check2 = await User.findOne({mobile: mobile})
      if(check2)
      {
        res.json("Mobile is already Exist");
      }
      else{
        res.json("not Exist");
        await User.insertMany([data]);
      }
    }
  }
  catch(e){
    console.log(e);
  }
})

// image upload
// app.post('/upload', async(req, res)=>{
//   const {image}= req.body;
//   try{
//     ImageEx.create({image: image});
//     res.send({Status:"Ok"})
//   }catch(error){
//     res.send({Status: "error", data: error});
//   }
// })

// app.get('/get-image', async(req, res)=>{
//   try{
//     const check= await  ImageEx.find({},{_id:0, image:1,})
//       res.send(check)
    
//   }catch(error){
//       res.send(error.body)
//   }
// })

// display card

app.get('/viewCard',(req, res)=>{
  try{
      CardModel.find().then((card) => {
        res.json(card)
      })
    
  }catch(error){
      res.send(error.body)
  }
})

// Card using multer


const Storage = multer.diskStorage({
  destination: '../front-end/public',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname);
  }
})

const upload = multer(
  {
    storage : Storage
  }
).single('photo')



app.post('/uploadUnattendCard', (req, res) => {
  upload(req, res, (err)=>{
    if(err){
      console.log(err)
    }
    else{
      const obj = new CardModel({
        photo: req.file.filename, 
        caseType: 'un-attended',
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
      })

      obj.save().then(()=> res.json(obj))
    }
  })
})

app.post('/uploadMissing', (req, res) => {
  upload(req, res, (err)=>{
    if(err){
      console.log(err)
    }
    else{
      const obj = new CardModel({
        photo: req.file.filename, 
        caseType: 'missing',
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
      })

      obj.save().then(()=> res.json(obj))
    }
  })
})



//app listen
app.listen(8000, () => {
  console.log("port connected");
})