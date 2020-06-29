require('@babel/core');
var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload')
var parseurl = require('parseurl');
var app = express();
var session = require('express-session');
const cors = require('cors');
// Node
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//

var sess = {
  secret: 'keyboard cat',
  key: 'token',
  cookie: {
    secure: false,
    expires: 600000
  },
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

//app.use(session(sess));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
//app.use(cors());
// Custom
import Catalogos from './Controllers/Catalogos/Catalogos';
import Columnas from './Controllers/Columnas/Columnas';
import Eventos from './Controllers/Eventos';
import ContenidoProceso from './Controllers/ContenidoProceso/ContenidoProceso';
import Miembros from './Controllers/Miembros/Miembros';
import Procesos from './Controllers/Procesos/Procesos';
import Responsables from './Controllers/Responsables/Responsables';
import Login from './Controllers/Login/Login';
import Logout from './Controllers/Login/Logout';
import Usuarios from './Controllers/Users';
// Middlewares
import Auth from './Middlewares/Auth/Auth';

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
};

app.use(allowCrossDomain);

app.use('/login', Login);
app.use('/logout', Auth, Logout);
app.get('/content', Auth, function(req, res) {
  res.send('You are logged');
});
app.get('/checkToken/:token', Auth, function(req, res) {
  res.sendStatus(200);
});
app.use('/catalogos', Catalogos);
app.use('/columna', Columnas);
app.use('/contenidoproceso', ContenidoProceso);
app.use('/evento', Eventos);
app.use('/proceso', Procesos);
app.use('/responsable', Responsables);
app.use('/responsableusuario', Miembros);
app.use('/usuarios', Usuarios);
app.use('/', (req, res) => {
  console.log(`No se encontro la ruta ${req.originalUrl}`);
});
/*--------------------------subir archivos--------------------------*/
/*
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post('/upload', (req, res) => {

if (!req.files) {
return res.status(500).send({ msg: "file is not found" })
}
// accessing the file
const archivo = req.files.file;

// mv() method places the file inside public directory
archivo.mv(`${__dirname}/public/${archivo.name}`, function (err) {
if (err) {
console.log(err)
return res.status(500).send({ msg: "Error occured" });
}
// returing the response with file path and name
return res.send({name: archivo.name, path: `/${archivo.name}`});
});
})
*/
//var upload = require('./public/routes/upload')
//app.use('/upload', upload)

app.listen(3001, function() {
  console.log('App listening on port 3001!');
});
