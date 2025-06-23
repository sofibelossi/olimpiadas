const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudPaquete');
router.get('/listaPaquetes',(req,res)=>{
con.query("select * from paquete",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaPaquetes', { results: results });
    }
});
});
//crear registro
router.get('/altaPaquete',(req,res)=>{
res.render('altaPaquete');

router.post('/save',crud.save);
});
//modificar registro
router.get('/editarPaquete/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from paquete where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarPaquete', { paquete: results[0] });
        }
    });
    
   
});
 router.post('/editarPaquete', crud.editarPaquete);
//eliminar registro
router.get('/eliminarPaquete/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as total from carrito_detalle where id_paquete=?",[id],(error,results)=>{
        if(error){
            console.error("Error SQL:", error);
            return res.status(500).send("Error al verificar el carrito");
        }
        const tieneCarrito = results[0].total > 0;
        if(tieneCarrito){
            return res.send("Este paquete no puede eliminarse porque esta en un carrito")
        }
          con.query("delete from paquete where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/listaPaquetes');
        }
    });
  
    });
  
    
});

module.exports=router;