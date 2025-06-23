const con=require('../servidor/database/db');
//agregar usuario
exports.save=(req,res)=>{
   const nombre= req.body.nombre;
   const direccion= req.body.direccion;
   const tipo_habitacion= req.body.tipo_habitacion;
con.query('insert into hotel set ?',{nombre:nombre,direccion:direccion,tipo_habitacion:tipo_habitacion},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaHoteles');
    }
});
}
exports.editarHotel=(req,res)=>{
    const id=req.body.id;
    const nombre= req.body.nombre;
    const direccion= req.body.direccion;
    const tipo_habitacion= req.body.tipo_habitacion;
   con.query("update hotel set ? where id=?",[{nombre:nombre,direccion:direccion,tipo_habitacion:tipo_habitacion},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaHoteles');
    }
   });
}
