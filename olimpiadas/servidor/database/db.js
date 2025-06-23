require('dotenv').config();
const mysql=require ('mysql');
const con=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});
con.connect(function(error){
    if(error){
        console.log('error de conexion: '+error);
        return;
    }else{
        console.log("conexion exitosa");
    }
});
module.exports=con;//exportamos a este modulo para conectar a base de datos desde otros archivos
