

const { check } = require("express-validator");

const RegisterSchema = [
    check('name').trim().isLength({ min: 1 }).withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/).withMessage("Names should only contain alphabetic characters and spaces"),
    check('username', 'invalid Username').exists().isAlphanumeric().trim().isLength({ min: 6, max: 32 }),

    check('password', "Invalid password").exists().isLength({ min: 6, max: 12 }).trim(),

    check('email', 'Invalid Email').exists().isEmail()
];

module.exports = RegisterSchema;
