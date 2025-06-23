
function verificarLogin(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');
    }
}
function verificarAdmin(req,res,next){
    if(req.session.user && req.session.user.id_rol==2){
        next();
    }else{
         res.status(403).send("Acceso denegado");
    }
}
module.exports={verificarLogin,verificarAdmin};