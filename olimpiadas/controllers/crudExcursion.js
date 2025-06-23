const con=require('../servidor/database/db');
//agregar usuario
exports.save=(req,res)=>{
   const nombre= req.body.nombre;
   const descripcion= req.body.descripcion;
   const precio= req.body.precio;
con.query('insert into excursion set ?',{nombre:nombre,descripcion:descripcion,precio:precio},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaExcursiones');
    }
});
}
exports.editarExcursion=(req,res)=>{
    const id=req.body.id;
    const nombre= req.body.nombre;
    const descripcion= req.body.descripcion;
    const precio= req.body.precio;
   con.query("update excursion set ? where id=?",[{nombre:nombre,descripcion:descripcion,precio:precio},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaExcursiones');
    }
   });
}
