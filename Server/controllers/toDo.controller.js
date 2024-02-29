const {validationResult}=require("express-validator");
const { jsonGenerate } = require("../utils/helper");
const StatusCode = require("../utils/constants");
const mysqlConnection=require("../models/connection")



const createTodo = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo is required", error.mapped()));
    }

    try {
        // Insert a new todo item into the todos table
        const insertQuery = "INSERT INTO todos (user_id, descrip) VALUES (?, ?)";
        const insertValues = [req.userId, req.body.descrip];
        const [insertResult] = await mysqlConnection.promise().query(insertQuery, insertValues);

        // Check if the insertion was successful
        if (insertResult.affectedRows > 0) {
            return res.status(StatusCode.SUCCESS).json(jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", insertResult));
        } else {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Failed to create todo"));
        }
    } catch (err) {
        console.error("Error creating todo:", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Something went wrong"));
    }
}


module.exports=createTodo