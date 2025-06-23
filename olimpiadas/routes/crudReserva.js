const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudReserva');
router.get('/listaReservas',(req,res)=>{
con.query("select * from reserva",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaReservas', { results: results });
    }
});
});
//modificar registro
router.get('/editarReserva/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from reserva where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarReserva', { reserva: results[0] });
        }
    });


});
router.post('/editarReserva', crud.editarReserva);
module.exports=router;