const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const cors = require('cors');
const gcloud = require('google-cloud-storage-standalone');

// carrega arquivos locais
const basicModel = require('./models/basicModel.js');
const metasGen = require('./models/metasGen.js');
const produtoTrab = require('./models/produtoTrab.js');
const praticaEspec = require('./models/praticaEspec.js');
const metasEspec = require('./models/metasEspec.js');
const areaProc = require('./models/areaProc.js');
const modelo = require('./models/modelo.js');

// retirado do console do firebase
const config = {
  apiKey: 'AIzaSyD5ia4TuqxEhLpeAgAflbTd_Tr5HkBcBb0',
  authDomain: 'objeto-relacional.firebaseapp.com',
  databaseURL: 'https://objeto-relacional.firebaseio.com',
  storageBucket: 'objeto-relacional.appspot.com',
  messagingSenderId: '523318008117',
};

// "abre a conexão"
firebase.initializeApp(config);

const app = express();
const db = firebase.database();
const gcs = gcloud.storage({
  projectId: 'objeto-relacional',
  keyFilename: './privateKey.json'
});


const jsonParser = bodyParser.json({limit:1024*1024*20, type:'application/json'});
app.use(cors());
app.use(jsonParser);
app.use(bodyParser.json());


// basicModel.js funciona com qualquer rota cujo objeto não faz refencia a nenhum outro,
// assim podem realizar o init para vários objetos com o mesmo código
basicModel.init(db, app, '/categoria', '/categoria', ((body) => {
  return { nome: body.nome };
}));
basicModel.init(db, app, '/nivelCapacidade', '/nivelCap', ((body) => {
  return { nome: body.nome, descricao: body.descricao, sigla: body.sigla };
}));
basicModel.init(db, app, '/nivelMaturidade', '/nivelMatu', ((body) => {
  return { nome: body.nome, descricao: body.descricao, sigla: body.sigla };
}));
basicModel.init(db, app, '/modelo', '/modelo', (body) => {
  return { nome: body.nome, descricao: body.descricao, sigla: body.sigla };
});

metasGen.init(db, app);
produtoTrab.init(db, app, gcs);
praticaEspec.init(db, app);
metasEspec.init(db, app);
areaProc.init(db, app);
modelo.init(db, app);

app.listen(3000);
console.log('Servidor iniciado em http://localhost:3000/\nAperte Ctrl+C para encerrar…');
