const { User } = require("../Models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// const { response } = require("express");

/**
 * 
 * @param {*} req. requesting from the body 
 * @param {*} res response back to according to the model if it's ok then user is created successfully
 * if not then go to the catch and show the error
 */

// create the user || register the user for thefirst time
async function createUser (req, res) {
    try {
        // console.log("INside")
        let user = await User
        .findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email"});
        }
        console.log(req.body)
        await  User.create(req.body)
        .then((response)=>{
         res.status(201).json({
             message: "User is created successfully", response:response
         })
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error to creating user", error:error});
    }

};

// this lofin user is working fine and the user is logged in successfully
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

// get all users 
async function getUser (req,res) {
    try {
        // .populate method is used to give the aticle data with the help of the article id
        //.populate({ path: "article", populate:[{ path: "comments"}]}).  for the nested populate
        // .sort({ createdAt: -1}) is used to sort the data in descending order


        let { limit, offset } = req.query;
        User.find()
        .sort({ createdAt: -1})      
        // .limit(1)
        .limit(Number(limit))
        .skip(Number(offset))
        .populate("article")
        .then((response)=>{
            res.status(200).json({
                message: "user data feched successfully" ,response: response
            })
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error })
    }
}

function deleteUsers(req, res) {
    User.deleteMany()
      .then((response) => {
        res.status(200).json({
          Message: "Users are Successfully successfully!",
          response: response,
        });
      })
      .catch((error) => {
        res.status(500).json({ Message: "Something went wrong", error: error });
      });
  }


function getuserById (req, res) {
   let { id } = req.params;
   User.findOne({ _id: id }).then((response) =>{
    res.status(200).json({
        message: "User is fetched successfully by ID",
        response: response
    }).catch((error) => {
        res.status(501).json({
            message: "Inernal server error while finding Id",
            error:error
        })
    })
   })
}

function getPostByUserId (req, res) {
    let { id } = req.params;
    User.findOne({ _id: id })
    .select("article")
    .populate({path: "article"})
    .then((response) =>{
     res.status(200).json({
         message: "User is fetched successfully by posts ID",
         response: response 
        })
    }).catch((error) => {
        res.status(501).json({
            message: "Inernal server error while finding Id",
            error:error
        })
    })
 }

 async function subscribeUser(req, res) {
     try {
         
         const udpateUser = await User.findByIdAndUpdate(req.user.id, {
             
             isSubscribed:true,
            });
            console.log("user",udpateUser)
        if (!udpateUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "User is subscribed successfully"
        });
    } catch (error) {
    res.status(500).json({
         message: "Internal server error for login the user", error:error    
    })
 }
}


module.exports = { createUser, login, getUser, deleteUsers, getuserById, getPostByUserId, subscribeUser };