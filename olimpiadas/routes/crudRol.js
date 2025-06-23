const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
const crud=require('../controllers/crudRol');
router.get('/listaRoles',(req,res)=>{
con.query("select * from rol",(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('listaRoles', { results: results });
    }
});
});
//crear registro
router.get('/altaRol',(req,res)=>{
res.render('altaRol');

router.post('/saveRol',crud.saveRol);
});
//modificar registro
router.get('/editarRol/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from rol where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarRol', { rol: results[0] });
        }
    });


});
router.post('/editarRol', crud.editarRol);
//eliminar registro
router.get('/eliminarRol/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as totalUsuarios from usuario where id_rol =?", [id], (error1, results1) => {
        if (error1) {
            return res.status(500).send("Error al verificar el usuario");
        }

        

            const tieneUsuarios = results1[0].totalUsuarios > 0;
           
            if (tieneUsuarios) {
                return res.send("Este rol no puede eliminarse porque está en uso por usuarios.");
            }
            con.query("delete from rol where id=?", [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/listaRoles');
                }
            });
        });
    });

module.exports=router;