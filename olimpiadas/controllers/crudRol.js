const con=require('../servidor/database/db');
exports.saveRol=(req,res)=>{
   const descripcion= req.body.descripcion;
   
con.query('insert into rol set ?',{descripcion:descripcion},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaRoles');
    }
});
}
exports.editarRol=(req,res)=>{
    const id=req.body.id;
    const descripcion= req.body.descripcion;
   con.query("update rol set ? where id=?",[{descripcion:descripcion},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaRoles');
    }
   });
}


