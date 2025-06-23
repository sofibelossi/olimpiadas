const con=require('../servidor/database/db');
//agregar usuario
exports.save=(req,res)=>{
   const ciudad= req.body.ciudad;
   const pais= req.body.pais;
   const provincia= req.body.provincia;
   const zona=req.body.zona;
con.query('insert into destino set ?',{ciudad:ciudad,pais:pais,provincia:provincia,id_zona:zona},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaDestinos');
    }
});
}
exports.editarDestino=(req,res)=>{
    const id=req.body.id;
    const ciudad= req.body.ciudad;
    const pais= req.body.pais;
    const provincia= req.body.provincia;
    const zona= req.body.zona;
   con.query("update destino set ? where id=?",[{ciudad:ciudad,pais:pais,provincia:provincia,id_zona:zona},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaDestinos');
    }
   });
}

