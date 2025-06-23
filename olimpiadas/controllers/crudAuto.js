const con=require('../servidor/database/db');
//agregar usuario
exports.saveAuto=(req,res)=>{
   const marca= req.body.marca;
   const modelo= req.body.modelo;
con.query('insert into auto set ?',{marca:marca,modelo:modelo},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaAutos');
    }
});
}
exports.editarAuto=(req,res)=>{
    const id=req.body.id;
    const marca= req.body.marca;
    const modelo= req.body.modelo;
   con.query("update auto set ? where id=?",[{marca:marca,modelo:modelo},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaAutos');
    }
   });
}
