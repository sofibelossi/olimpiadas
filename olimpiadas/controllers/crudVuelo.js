const con=require('../servidor/database/db');
//agregar vuelo
exports.save=(req,res)=>{
   const origen= req.body.origen;
   const destino= req.body.destino;
   const fecha_salida= req.body.fecha_salida;
   const fecha_regreso= req.body.fecha_regreso;
   const aerolinea= req.body.aerolinea;
   const precio= req.body.precio;
   const activo=req.body.activo;
con.query('insert into vuelo set ?',{id_origen:origen,id_destino:destino,fecha_salida:fecha_salida,fecha_regreso:fecha_regreso,aerolinea:aerolinea,precio:precio, activo:activo},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaVuelos');
    }
});
}
exports.editarVuelo=(req,res)=>{
    const id=req.body.id;
    const origen= req.body.origen;
   const destino= req.body.destino;
   const fecha_salida= req.body.fecha_salida;
    const fecha_regreso= req.body.fecha_regreso;
    const aerolinea= req.body.aerolinea;
    const precio= req.body.precio;
     const activo= req.body.activo;
   con.query("update vuelo set ? where id=?",[{id_origen:origen,id_destino:destino,fecha_salida:fecha_salida,fecha_regreso:fecha_regreso,aerolinea:aerolinea,precio:precio,activo:activo},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaVuelos');
    }
   });
}
