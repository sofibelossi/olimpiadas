const con=require('../servidor/database/db');
//modificar reserva
exports.editarReserva=(req,res)=>{
    const id=req.body.id;
    const estado= req.body.estado;
   con.query("update reserva set ? where id=?",[{estado:estado},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaReservas');
    }
   });
}