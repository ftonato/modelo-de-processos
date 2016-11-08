var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var categoria = require('./models/categoria.js');

var config = {
    apiKey: "AIzaSyD5ia4TuqxEhLpeAgAflbTd_Tr5HkBcBb0",
    authDomain: "objeto-relacional.firebaseapp.com",
    databaseURL: "https://objeto-relacional.firebaseio.com",
    storageBucket: "objeto-relacional.appspot.com",
    messagingSenderId: "523318008117"
};

firebase.initializeApp(config);

var app = express();
var db = firebase.database();

app.use(bodyParser.json());

categoria.init(db, app);

app.listen(8080);