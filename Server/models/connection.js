const mysql=require("mysql2");
var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Hriday9083@',
    database:'work_manage'
})

mysqlConnection.connect((err)=>{
    if(err){
        console.log("error in db connection"+JSON.stringify(err,undefined,2))
    }else{
        console.log("db connect successfully")
    }
})

module.exports=mysqlConnection;