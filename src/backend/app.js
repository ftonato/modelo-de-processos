// carregas npm
var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

// carrega arquivos locais
var basicModel = require('./models/basicModel.js');
var metasGen = require('./models/metasGen.js');
var produtoTrab = require('./models/produtoTrab.js');
var praticaEspec = require('./models/praticaEspec.js');
var metasEspec = require('./models/metasEspec.js');
var areaProc = require('./models/areaProc.js');
var modelo = require('./models/modelo.js');

// retirado do console do firebase
var config = {
    apiKey: "AIzaSyD5ia4TuqxEhLpeAgAflbTd_Tr5HkBcBb0",
    authDomain: "objeto-relacional.firebaseapp.com",
    databaseURL: "https://objeto-relacional.firebaseio.com",
    storageBucket: "objeto-relacional.appspot.com",
    messagingSenderId: "523318008117"
};

// "abre a conexão"
firebase.initializeApp(config);

var app = express();
var db = firebase.database();

app.use(bodyParser.json());

// basicModel.js funciona com qualquer rota cujo objeto não faz refencia a nenhum outro,
// assim podem realizar o init para vários objetos com o mesmo código 
basicModel.init(db, app, '/categoria', '/categoria', function (body) { return { nome: body.nome } });
basicModel.init(db, app, '/nivelCapacidade', '/nivelCap', function (body) { return { nome: body.nome, descricao: body.descricao, sigla: body.sigla } });
basicModel.init(db, app, '/nivelMaturidade', '/nivelMatu', function (body) { return { nome: body.nome, descricao: body.descricao, sigla: body.sigla } });

metasGen.init(db, app);
produtoTrab.init(db, app);
praticaEspec.init(db, app);
metasEspec.init(db, app);
areaProc.init(db, app);
modelo.init(db, app);

app.listen(8080);