const mysqlConnection = require("../models/connection");
const { jsonGenerate } = require("../utils/helper");
const StatusCode = require("../utils/constants");
const { validationResult } = require("express-validator");

const removeTodo = async (req, res) => {
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo is required", error.mapped()));
    // }
    try {
        // Extract todo ID from request parameters
        const {todoId} = req.body;

        // SQL query to delete the todo item
        const deleteQuery = "DELETE FROM todos WHERE todo_id = ?";
        const [result] = await mysqlConnection.promise().query(deleteQuery, [todoId]);

        // Check if the deletion was successful
        if (result.affectedRows > 0) {
            return res.status(StatusCode.SUCCESS).json(jsonGenerate(StatusCode.SUCCESS, "Todo item removed successfully"));
        } else {
            return res.status(StatusCode.NOT_FOUND).json(jsonGenerate(StatusCode.NOT_FOUND, "Todo item not found"));
        }
    } catch (error) {
        console.error("Error removing todo item:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Something went wrong"));
    }
};

module.exports = removeTodo;
