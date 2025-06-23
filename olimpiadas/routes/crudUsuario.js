const express = require('express');
const router = express.Router();
const con = require('../servidor/database/db');
const crud = require('../controllers/crudUsuario');
router.get('/listaUsuarios', (req, res) => {
    const sqlClientes = 'SELECT * FROM usuario WHERE id_rol = 1';
    const sqlAdmins = 'SELECT * FROM usuario WHERE id_rol = 2';

    con.query(sqlClientes, (errorClientes, clientes) => {
        if (errorClientes) throw errorClientes;

        con.query(sqlAdmins, (errorAdmins, admins) => {
            if (errorAdmins) throw errorAdmins;

            res.render('listaUsuarios', { clientes, admins });
        });
    });
});
//crear registro
router.get('/altaUsuario', (req, res) => {
     con.query("select * from zona", (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('altaUsuario', { zona: results[0] });
        }
    });
    const crud = require('../controllers/crudUsuario');
    router.post('/save', crud.save);
});
//modificar registro
router.get('/editarUsuario/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from usuario where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('editarUsuario', { usuario: results[0] });
        }
    });
    const crud = require('../controllers/crudUsuario');
    router.post('/update', crud.update);
});
//eliminar registro
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    con.query("select count(*) as total from carrito where id_usuario=?",[id],(error,results)=>{
        if(error){
            console.error("Error SQL:", error);
            return res.status(500).send("Error al verificar el carrito");
        }
        const tieneCarrito = results[0].total > 0;
        if(tieneCarrito){
            return res.send("Este usuario no puede eliminarse porque tiene un carrito")
        }
          con.query("delete from usuario where id=?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/listaUsuarios');
        }
    });
  
    });
    const crud = require('../controllers/crudUsuario');
    
});
module.exports = router;