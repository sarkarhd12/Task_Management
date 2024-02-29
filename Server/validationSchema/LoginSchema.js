
const { check } = require("express-validator");

const LoginSchema = [
  
    check('username', 'Username is required').exists().isAlphanumeric().trim().isLength({ min: 6, max: 32 }),

    check('password', "Password is required").exists().isLength({ min: 6, max: 12 }).trim(),

   
];

module.exports = LoginSchema;