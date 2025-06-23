const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudDestino');
router.get('/listaDestinos',(req,res)=>{
con.query("select * from destino",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaDestinos', { results: results });
    }
});
});
//crear registro
router.get('/altaDestino',(req,res)=>{
res.render('altaDestino');

router.post('/saveDestino',crud.saveDestino);
});

//modificar registro
router.get('/editarDestino/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from destino where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarDestino', { destino: results[0] });
        }
    });


});
router.post('/editarDestino', crud.editarDestino);
//eliminar registro
router.get('/eliminarDestino/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as totalVuelos from vuelo where id_destino or id_origen =?", [id], (error1, results1) => {
        if (error1) {
            return res.status(500).send("Error al verificar el vuelo");
        }

        

            const tieneVuelos = results1[0].totalVuelos > 0;
           
            if (tieneVuelos) {
                return res.send("Este destino no puede eliminarse porque está en uso en un vuelo.");
            }
            con.query("delete from destino where id=?", [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/listaDestinos');
                }
            });
        });
    });


module.exports=router;