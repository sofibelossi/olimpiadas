const con=require('../servidor/database/db');
//agregar usuario
exports.save=(req,res)=>{
   const nombre= req.body.nombre;
   const descripcion= req.body.descripcion;
   const precio_base= req.body.precio_base;
con.query('insert into paquete set ?',{nombre:nombre,descripcion:descripcion,precio_base:precio_base},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaPaquetes');
    }
});
}
exports.editarPaquete=(req,res)=>{
    const id=req.body.id;
    const nombre= req.body.nombre;
   const descripcion= req.body.descripcion;
   const precio_base= req.body.precio_base;
   con.query("update paquete set ? where id=?",[{nombre:nombre,descripcion:descripcion,precio_base:precio_base},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaPaquetes');
    }
   });
}
