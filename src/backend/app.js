const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

// var categoria = require('./models/categoria.js');
// var nivelCapacidade = require('./models/nivelCapacidade.js');

const basicModel = require('./models/basicModel.js');

const config = {
  apiKey: 'AIzaSyD5ia4TuqxEhLpeAgAflbTd_Tr5HkBcBb0',
  authDomain: 'objeto-relacional.firebaseapp.com',
  databaseURL: 'https://objeto-relacional.firebaseio.com',
  storageBucket: 'objeto-relacional.appspot.com',
  messagingSenderId: '523318008117',
};

firebase.initializeApp(config);

const app = express();
const db = firebase.database();

app.use(bodyParser.json());

// categoria.init(db, app);
// nivelCapacidade.init(db, app);

basicModel.init(db, app, '/categoria', '/categoria', function (body) { return { nome: body.nome }; });
basicModel.init(db, app, '/nivelCapacidade', '/nivelCap', function (body) { return { nome: body.nome, descricao: body.descricao, sigla: body.sigla }; });
basicModel.init(db, app, '/nivelMaturidade', '/nivelMatu', function (body) { return { nome: body.nome, descricao: body.descricao, sigla: body.sigla }; });

app.listen(8080);
console.log('Servidor iniciado em http://localhost:8080/\nAperte Ctrl+C para encerrar…');
