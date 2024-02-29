const { validationResult } = require("express-validator");
const mysqlConnection=require("../models/connection");
const StatusCode = require("../utils/constants");
const { jsonGenerate } = require("../utils/helper");


const GetTodo = async (req, res) => {
    try {
        // Fetch all todo items associated with the user
        const query = "SELECT * FROM todos WHERE user_id = ?";
        const [todos] = await mysqlConnection.promise().query(query, [req.userId]);
       // console.log(todos)
        // Check if any todo items were found
        if (todos.length > 0) {
            return res.status(StatusCode.SUCCESS).json(jsonGenerate(StatusCode.SUCCESS, "Todo items fetched successfully", {todos}));
           
        } else {
            return res.status(StatusCode.NOT_FOUND).json(jsonGenerate(StatusCode.NOT_FOUND, "No todo items found"));
        }
    } catch (err) {
        console.error("Error fetching todo items:", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Something went wrong"));
    }
}

module.exports=GetTodo;