const path = require('path');
const express=require ('express');
const body_parser=require('body-parser');
const session=require('express-session');
const app=express();
const con = require('./servidor/database/db');//trae la variable con del archivo db
app.use(express.json());
app.use(body_parser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'cliente/views'));
app.set('view engine', 'ejs');



app.use(session({
    secret: 'secret',//luego esto se va a cambiar para generar una clave secreta aleatoria
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
}));
// Middleware global para que user esté disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
//configuracion de las rutas
const authRoutes = require('./routes/auth');
const rutasUsuario=require('./routes/crudUsuario');
app.use('/', authRoutes); // Esto activa tus rutas /, /login, /register, etc.
app.use('/',rutasUsuario);//servidor
app.listen(3000, (req, res) => {
    console.log('ejecutando en el puerto 3000');
});
//rutas del carrito
const carritoRoutes = require('./routes/carrito');
app.use(carritoRoutes);
//rutas de los crud del admin
const rutasAdmin=require('./routes/panelAdmin');
app.use(rutasAdmin);
const rutasRol=require('./routes/crudRol');
app.use(rutasRol);
const rutasZona=require('./routes/crudZona');
app.use(rutasZona);
const rutasHotel=require('./routes/crudHotel');
app.use(rutasHotel);
const rutasAuto=require('./routes/crudAuto');
app.use(rutasAuto);
const rutasDestino=require('./routes/crudDestino');
app.use(rutasDestino);
const rutasPaquete=require('./routes/crudPaquete');
app.use(rutasPaquete);
const rutasExcursiones=require('./routes/crudExcursion');
app.use(rutasExcursiones);
const rutasReserva=require('./routes/crudReserva');
app.use(rutasReserva);
const rutasVuelo=require('./routes/crudVuelo');
app.use(rutasVuelo);
app.get('/', (req, res) => {
  res.redirect('/index');
});


