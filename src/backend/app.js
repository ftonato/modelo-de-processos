var express = require('express');
var firebase = require('firebase');

firebase.initializeApp({
    databaseURL: "https://objeto-relacional.firebaseio.com/"
});

var app = express();
var db = firebase.database();

app.get("/categoria", function (req, res) {
    var cat = db.ref('/categoria');

    cat.on('value', function(snapshot) {
        res.send(snapshot.val())
        cat.off('value');

    }, function(err){});
});

app.get("/categoria/:key", function(req, res){
    var cat = db.ref('/categoria');

    cat.child(req.params.key).on('value', function(snap){
        var obj = snap.val();

        if (obj == null){
            res.status(404).send('Sorry!');
        }else{
            res.send(obj);
        }        
    }, function(err){});
});

app.post("/categoria", function (req, res) {
    
});

app.put("/categoria", function (req, res) {
    
});

app.delete("/categoria", function (req, res) {
    
});

app.listen(8080);