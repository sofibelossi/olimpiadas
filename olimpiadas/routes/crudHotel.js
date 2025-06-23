const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudHotel');
router.get('/listaHoteles',(req,res)=>{
con.query("select * from hotel",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaHoteles', { results: results });
    }
});
});
//crear registro
router.get('/altaHotel',(req,res)=>{
res.render('altaHotel');

router.post('/save',crud.save);
});
//modificar registro
router.get('/editarHotel/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from hotel where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarHotel', { hotel: results[0] });
        }
    });


});
router.post('/editarHotel', crud.editarHotel);
//eliminar registro
router.get('/eliminarHotel/:id', (req, res) => {
    const id = req.params.id;
    //con.query("select count(*) as totalReservas from reserva_hotel where id_hotel =?", [id], (error1, results1) => {
      //  if (error1) {
      //      return res.status(500).send("Error al verificar la reserva");
      //  }

        

        //  const tieneReservas = results1[0].totalReservas > 0;
           
         //   if (tieneReservas) {
          //      return res.send("Este hotel no puede eliminarse porque está en uso en una reserva.");
          //  }
            con.query("delete from hotel where id=?", [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/listaHoteles');
                }
            });
        });
  //  });


module.exports=router;