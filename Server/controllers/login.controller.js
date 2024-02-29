const { validationResult } = require("express-validator");
const { jsonGenerate } = require("../utils/helper");
const StatusCode = require("../utils/constants");
const mysqlConnection=require("../models/connection")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
 




const Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(StatusCode.VALIDATION_ERROR).json({ errors: errors.array() });
        return res.status(StatusCode.VALIDATION_ERROR).json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation errorrr", errors.mapped()));

    }

    const { username, password } = req.body;

    try {
        // Check if a user with the provided username exists
        const [existingUser] = await mysqlConnection.promise().query("SELECT * FROM user_signup WHERE username = ?", [username]);

        if (existingUser.length === 0) {
            return res.status(StatusCode.UNAUTHORIZED).json(jsonGenerate(StatusCode.UNAUTHORIZED, "Invalid username or Password",errors.mapped()));
        }

        // Verify the provided password against the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser[0].password);

        if (!isPasswordValid) {
            return res.status(StatusCode.Auth_Error).json(jsonGenerate(StatusCode.Auth_Error, "Invalid password",errors.mapped()));
        }

        // Generate JWT token
        const payload = { userId: existingUser[0].user_id, username: existingUser[0].username };
        const token = jwt.sign(payload, 'my-secret-key', { expiresIn: '1h' });

        return res.status(StatusCode.SUCCESS).json(jsonGenerate(StatusCode.SUCCESS,"Login Successfull",{ existingUser, token }));
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
};

module.exports = Login;
