// const express=require("express");
const express = require('express')
const Register =require( '../controllers/register.controller.js')
const RegisterSchema=require('../validationSchema/RegisterSchema.js')
const LoginSchema=require("../validationSchema/LoginSchema.js")
const Login=require("../controllers/login.controller.js");



const apiRoute=express.Router();


apiRoute.post('/register',RegisterSchema,Register)
apiRoute.post('/login',LoginSchema,Login)



module.exports=  apiRoute;
