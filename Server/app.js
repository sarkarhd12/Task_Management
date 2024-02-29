


 const express=require('express');
 const cors=require("cors")

const apiRoute=require("./routes/api")
const apiProcted=require("./routes/todoRoutes");
//const AuthMiddleware=require("./middleware/AuthMiddleware");



var app=express();
app.use(cors());
app.use(express.json());

app.use("/api/",apiRoute)
app.use("/api/",apiProcted)



app.listen(3000,()=>{
  console.log("express server running")
})