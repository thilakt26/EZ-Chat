import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookie from '../jwtToken/generateToken.js';
import { json } from "express";

 
export const signup = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
  
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match!" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists!" }); // Use 409 Conflict for existing resource
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      // Create token and respond with user info
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" }); // Use structured error response
    }
  };
  

//Login

export const Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" }); // Specific error for non-existing email
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" }); // Specific error for incorrect password
      }
  
      // If user exists and password matches, create a token and send response
      createTokenAndSaveCookie(user._id, res);
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Something went wrong. Please try again later." }); // Handle unexpected errors
    }
  };
  

//Logout

export const Logout=async(req,res)=>{
    try{

        res.clearCookie("jwt");
        res.status(200).json({message:"User Logged out Successfully"})

    }catch(e){
        console.log(e);
        res.status(500).json({error:"Internal Server Error"});

    }
}

export const allUsers=async(req,res)=>{

    try {
        const loggedInUser=req.user._id;
        const filteredUser=await User.find(
            {_id:{$ne: loggedInUser}}).select("-password");
        res.status(201).json(
            filteredUser,
        )
    } catch (error) {
        console.log("Error in All User Function controller :"+ error);
        
    }

}

