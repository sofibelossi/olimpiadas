const con=require('../servidor/database/db');
const bcryptjs=require('bcryptjs');
//agregar usuario
exports.save=(async(req,res)=>{
   const nombre= req.body.nombre;
   const apellido= req.body.apellido;
   const password= req.body.clave;
   const telefono= req.body.telefono;
   const direccion= req.body.direccion;
   const rol= req.body.rol;
   const zona=req.body.zona;
   let encriptada = await bcryptjs.hash(password, 8);
con.query('insert into usuario set ?',{nombre:nombre,apellido:apellido,clave:encriptada,telefono:telefono,direccion:direccion,id_rol:rol, id_zona:zona},async(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/listaUsuarios');
    }
});
});
exports.update=(req,res)=>{
    const id=req.body.id;
    const nombre= req.body.nombre;
   const apellido= req.body.apellido;
   const clave= req.body.clave;
   const telefono= req.body.telefono;
   const direccion= req.body.direccion;
   const rol= req.body.rol;
   const zona=req.body.zona;
   con.query("update usuario set ? where id=?",[{nombre:nombre,apellido:apellido,clave:clave,telefono:telefono,direccion:direccion,id_rol:rol,id_zona:zona},id],(error,results)=>{
     if(error){
        console.log(error);
    }else{
        res.redirect('/listaUsuarios');
    }
   });
}

