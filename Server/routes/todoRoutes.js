const express = require('express');
const apiProcted=express.Router();
const { check } = require("express-validator");

const AuthMiddleware=require("../middleware/AuthMiddleware.js")


const createTodo=require("../controllers/toDo.controller.js");
const GetTodo = require('../controllers/TodoList.js');
const updateTodo = require('../controllers/MarkToDo.controller.js');
const removeTodo = require('../controllers/RemoveTodo.controller.js');




apiProcted.post('/createTodo',[check("descrip","Todo Desc is require").exists()],AuthMiddleware,createTodo); 
apiProcted.post('/marktodo',AuthMiddleware,updateTodo); 


apiProcted.get('/gettodo',[check("descrip","Todo Desc is require").exists()],AuthMiddleware,GetTodo); 
apiProcted.post('/removetodo',AuthMiddleware,removeTodo); 


module.exports=apiProcted;