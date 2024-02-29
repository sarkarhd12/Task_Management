const { validationResult } = require("express-validator");
const StatusCode = require("../utils/constants");
const { jsonGenerate } = require("../utils/helper");
const bcrypt=require("bcrypt");
const mysqlConnection=require("../models/connection");
const jwt=require("jsonwebtoken")


const Register = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error)
        return res.status(StatusCode.VALIDATION_ERROR).json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation errorrr", error.mapped()));
    }

    const { name, username, password, email } = req.body;
    try {

           // Check if user with provided email already exists
           const [existingUser] = await mysqlConnection.promise().query("SELECT * FROM user_signup WHERE email = ?", [email]);
           if (existingUser.length > 0) {
               return res.status(StatusCode.VALIDATION_ERROR).json(jsonGenerate(StatusCode.Auth_Error, "User already exist", error.mapped()));
           }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const sql = "INSERT INTO user_signup (`name`, `username`, `email`, `password`) VALUES (?, ?, ?, ?)";
        const values = [name, username, email, hashPassword];

        await mysqlConnection.promise().query(sql, values);

        // Generate JWT token
        const payload = { username, email };
        const token = jwt.sign(payload, 'my-secret-key', { expiresIn: '1h' });

        return res.status(StatusCode.SUCCESS).json(jsonGenerate(StatusCode.SUCCESS,"Login Successfull", token ));
    }catch(error){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
};

module.exports= Register;