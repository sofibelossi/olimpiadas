const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudVuelo');
router.get('/listaVuelos',(req,res)=>{
con.query("select * from vuelo",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaVuelos', { results: results });
    }
});
});
//crear registro
router.get('/altaVuelo',(req,res)=>{
res.render('altaVuelo');

router.post('/save',crud.save);
});
//modificar registro
router.get('/editarVuelo/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from vuelo where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarVuelo', { vuelo: results[0] });
        }
    });
    
   
});
 router.post('/editarVuelo', crud.editarVuelo);
//eliminar registro
router.get('/eliminarVuelo/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as total from paquete_vuelo where id_vuelo=?",[id],(error,results)=>{
        if(error){
            console.error("Error SQL:", error);
            return res.status(500).send("Error al verificar el paquete");
        }
        const tienePaquete = results[0].total > 0;
        if(tienePaquete){
            return res.send("Este vuelo no puede eliminarse porque esta en un paquete");
        }
          con.query("delete from vuelo where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/listaVuelos');
        }
    });
  
    });
  
    
});
module.exports=router;