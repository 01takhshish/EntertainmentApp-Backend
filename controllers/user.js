const User = require('../models/userModels');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Login = async (req, res) => {
    try {
        const {contact, password} = req.body;
        // console.log(req.body)
        if (!contact || !password){
            return res.status(401).json({
                message: "Invalid Data",
                success: false,
            })
        }
        const user = await User.findOne({contact});
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }  
        const isMatch = await bcryptjs.compare(password,  user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        
        const tokenData = {
            id: user._id
        }

         const token  = await jwt.sign(tokenData, "sdsfgfhcaagfgfhfhgf", {expiresIn: "1h"})
         return res.status(200).cookie("token", token, {httpOnly:true}).json({
            message : `Welcome Back ${user.fullname}`,
            user,
            success: true
         })
    } catch(error){
        console.log(error);
    }
}

const Logout = async (req, res) => {
   return res.status(200).cookie("token", "", {expiresIn: new Date(Date.now()), httpOnly: true}).json({
    message: "User logged out successfully",
    success: true
   })
}

const Register = async (req, res) => {
    try {
        
        const { fullname, contact, password } = req.body;
        if (!fullname || !contact || !password) {
            return res.status(401).json({
                message: "Invalid Data",
                success: false
            });
        }
        const user = await User.findOne({ contact });
        if (user) {
            return res.status(401).json({
                message: "This contact is already used",
                success: false
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10); // Make sure to hash the password before storing it

        await User.create({
            fullname,
            contact,
            password : hashedPassword

        });

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

module.exports = { Register, Login, Logout  };

