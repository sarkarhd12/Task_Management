const { json } = require("express");
const { validationResult } = require("express-validator");
const mysqlConnection = require("../models/connection");
const { jsonGenerate } = require("../utils/helper");
const StatusCode = require("../utils/constants");

const updateTodo = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(json(StatusCode.VALIDATION_ERROR, "Todo is required", error.mapped()));
    }
    const { todoId, isCompleted } = req.body;

    try {
        // Update the is_completed status of the todo item
        const updateQuery = "UPDATE todos SET is_completed = ? WHERE todo_id = ? AND user_id = ?";
        const [updateResult] = await mysqlConnection.promise().query(updateQuery, [isCompleted, todoId, req.userId]);

        // Check if the todo item was updated successfully
        if (updateResult.affectedRows > 0) {
            return res.status(StatusCode.SUCCESS).json(jsonGenerate(StatusCode.SUCCESS, "Todo item updated successfully"));
        } else {
            return res.status(StatusCode.NOT_FOUND).json(jsonGenerate(StatusCode.NOT_FOUND, "Todo item not found or unauthorized"));
        }
    } catch (err) {
        console.error("Error updating todo item:", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Something went wrong"));
    }
}

module.exports=updateTodo;
