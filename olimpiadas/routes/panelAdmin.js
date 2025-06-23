const express=require('express');
const router=express.Router();
const con=require('../servidor/database/db');
//const {verificarLogin}=require('../middlewers/auth');
const {verificarAdmin}=require('../middlewers/auth');
const carritoController = require('../controllers/adminController');



// tus rutas acá
router.get('/panelAdmin',verificarAdmin, (req, res) => {
  res.render('panelAdmin');
});



router.get('/paquetes',verificarAdmin,(req,res)=>{
    con.query("select * from paquete",(error,results)=>{
if(error){
    throw error;
}else{
    res.render('listaPaquetes',{results});
}
    });
});
router.get('/hoteles',verificarAdmin,(req,res)=>{
    con.query("select * from hotel",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaHoteles',{results});
        }
    });
});
router.get('/destinos',verificarAdmin,(req,res)=>{
    con.query("select * from destino",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaDestinos',{results});
        }
    });
});
router.get('/autos',verificarAdmin,(req,res)=>{
    con.query("select * from auto",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaAutos',{results});
        }
    });
});
router.get('/roles',verificarAdmin,(req,res)=>{
    con.query("select * from rol",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaRoles',{results});
        }
    });
});
router.get('/reservas',verificarAdmin,(req,res)=>{
    con.query("select * from reserva",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaReservas',{results});
        }
    });
});
router.get('/vuelos',verificarAdmin,(req,res)=>{
    con.query("select * from vuelo",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaVuelos',{results});
        }
    });
});
router.get('/excursiones',verificarAdmin,(req,res)=>{
    con.query("select * from excursion",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaExcursiones',{results});
        }
    })
})
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
router.get('/zonas',verificarAdmin,(req,res)=>{
    con.query("select * from zona",(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('listaZonas',{results});
        }
    });
});
module.exports=router;