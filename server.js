const express = require("express");
const connectDB = require("./config/connectDB");
const app = express ();

//3- setup your env

require("dotenv").config({path :"./config/.env"})





//5-setup the json database
app.use(express.json());


//2- connect the database
connectDB();


//Start Crud
//4- create schema
const User = require("./models/User");



//ADD New User
// Path : /api/add_user
app.post("/api/add_user" , (req, res) => {
    const { name, lastName, email, phone } = req.body;
    const newUser = new User({name, lastName, email, phone}) 
   newUser.save()
   .then((user) => res.send({ msg:"User added", user }))
   .catch(err => res.status(400).send({ msg:"ERROR", err }))
})

//get
app.get("/api/users" , (req, res)=>{
    User.find().then((users) => res.send({
        msg:"GET ALL USERS", users
    }))
    .catch(err => res.status(400).send({ msg:"ERROR", err }) )
})


//get user by id
//path: /api/users/:userID
app.get("/api/users/:userID", (req, res) =>{
    const id = req.params.userID;
    User.findById(id)
    .then((user) =>{
        if (!user){
            return res.status(404).send({ msg: " User Not Found"})
        }
    
     res.send({msg:"GET USER BY ID", user})
    })
    .catch(err => res.status(400).send({ msg:"ERROR", err }) )
})

//remove
app.delete("/api/users/:userID", (req , res) => {
    const id = req.params.userID;
    user.findByIdAndDelete(id).then((user) => 
    res.send({ msg: "User Removed", user}))
    .catch(err => res.status(400).send({ msg:"ERROR", err }) )

})
//UPDATE USER BY ID
//PATH : /api/users/:userID
app.put("/api/users/:userID", (req, res) => {
    const userID = req.params.userID;
    User.findByIdAndUpdate(userID, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ msg: "User Not Found " });
        }
        res.send(user);
      })
      .catch((err) => res.status(400).send({ msg: "ERROR" }));
  });

// END

// 1-start the server 
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The Server is Running ${port} ....`)
})
