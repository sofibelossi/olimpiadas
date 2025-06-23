const con=require('../servidor/database/db');
//agregar usuario
exports.save=(req,res)=>{
   const id= req.body.id;
   const nombre_zona= req.body.nombre_zona;
con.query('insert into zona set ?',{id:id, nombre_zona:nombre_zona},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaZonas');
    }
});
}
exports.editarZona=(req,res)=>{
    const id=req.body.id;
    const nombre= req.body.nombre_zona;
   con.query("update zona set ? where id=?",[{id:id,nombre_zona:nombre},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaZonas');
    }
   });
}

