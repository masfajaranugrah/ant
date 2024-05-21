const User = require('../models/user');
const dotenv = require('dotenv')

const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config()

const ViewUser = async (req, res) => {
    try {
        const usersWithPosts = await User.find({});
        res.status(200).json({ message: 'view user success', data: usersWithPosts });
    } catch (error) {
        res.status(500).json({ message: 'failure', error: error.message });
    }
};


const ViewUserDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('antrians'); // Menggunakan populate untuk mengambil data antrians yang terkait dengan pengguna
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'View user detail success', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Failure', error: error.message });
    }
};


const Register = async (req, res) => {
    try {
    const name = req.body.name;
    const nim = req.body.nim;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const hash = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(hash, salt);
    const post = await User.create({
        name,
        nim,
        phone_number,
        email,
        password
        })
        res.status('200').json({message : 'create success', data : post})
    } catch (error) {
        res.status('500').json({message : 'failure', error : error.message})
    }
}

// const UpdateUser = async (req, res) => {
//    const id = req.params.id;
//    const data = await User.findById(id);
//    if (!data) {
//     return res.status(401).json({ message: 'User not found' });
// }
//    try {
//     const name = req.body.name;
//     const nim = req.body.nim;
//     const phone_number = req.body.phone_number;
//     const email = req.body.email;
//     const hash = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(hash, salt);
//     const post = await data.find({
//         name,
//         nim,
//         phone_number,
//         email,
//         password
//    })
//    res.status('200').json({message : 'update success', data : post})
//    } catch (error) {
//     res.status('500').json({message : 'failure', error : error.message})
//    }
// }

const UpdateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, nim, phone_number, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update fields
        user.name = name;
        user.nim = nim;
        user.phone_number = phone_number;
        user.email = email;
        user.password = hashedPassword;

        // Save updated user
        const updatedUser = await user.save();

        res.status(200).json({ message: 'Update success', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failure', error: error.message });
    }
};


const DeleteUser = async(req, res )=> {
    const id = req.params.id;
    const post = await User.findByPk(id);
    try {
        const data = await post.destroy();
        res.status('200').json({message : 'delete success', data : data})

    } catch (error) {
    res.status('500').json({message : 'failure', error : error.message})
        
    }
    
 }

 const login = async(req, res) => {

    const email = req.body.email
    
        try {
            const user = await User.findOne({email})
    
    
            // if user doesn,t exit 
            if(!user){
                return  res.status(404).json({message :"users not found"})
            }
    
        //    if use exits then check password of compare the password 
            const checkCurrentPassword = await bcrypt.compare(req.body.password, user.password)
    
            if(!checkCurrentPassword){
                return  res.status(401).json({message :"incorrect password"})
            }

       
            const {password, role, ...rest} = user._doc
            // cerate jwt token 
            const token  =  jwt.sign(
                {
                id: user._id, role: user.role},
                process.env.JWT_SECRET_KEY, 
                // experied time
                    { expiresIn : "5s" }
                );
    
                // set token in the browser cookies and send the response to the client
                res.cookie('accessToken', token, {
                    httpOnly: true,
                    expires: token.expiresIn
                }).status(200).json({success : true, message : 'successfully login', 
                data : {...rest}} )
    
        } catch (err) {
            res.status(500).json({message  :"Filed to login, Try again"})
            
        }
    }

const loggedInController = async (req, res) => {
        const username = res.locals.jwt.username
    
        try{
            const result = await loggedIn(username)
    
            return res.status(200).json({
                id: result[0].id,
                username: result[0].username,
                role: result[0].role,
                loggedIn: true
            })
        }catch(err){
            return res.status(500).json({
                message: err
            })
        }
    }
module.exports = {
    ViewUser,
    Register,
    ViewUserDetail,
    UpdateUser,
    DeleteUser,
    login,
    loggedInController
}