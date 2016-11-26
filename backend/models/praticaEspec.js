const path = '/praticaEspecifica';

function validaBody(reqBody, db, allGoodCallback, notGoodCallback) {
  if (reqBody.nome == null) {
    notGoodCallback('nome nao informado');
  } else if (reqBody.descricao == null) {
    notGoodCallback('descricao nao informada');
  } else if (reqBody.sigla == null) {
    notGoodCallback('sigla nao informada');
  } else if (reqBody.produtosTrab == null) {
    notGoodCallback('produtos de trabalho nao informados');
  } else if (reqBody.produtosTrab.length == 0) {
    notGoodCallback('produtos de trabalho nao informados');
  } else if (reqBody.metasEspec == null) {
    notGoodCallback('produtos de trabalho nao informados');
  } else {
    db.ref('/produtoTrab').once('value', function (snap) {
      for (var i = 0; i < reqBody.produtosTrab.length; i++) {
        if (!snap.hasChild(reqBody.produtosTrab[i])) {
          notGoodCallback('produto de trabalho nao existe');
          return;
        }
      }

      db.ref('/metasEspec/').once('value', function (snapN) {
        if (!snapN.hasChild(reqBody.metasEspec)) {
          notGoodCallback('meta especifica nao existe');
          return;
        } else {
          allGoodCallback();
        }
      });
    });
  }
}

function montaJson(reqBody) {
  var retVal = { nome: reqBody.nome, descricao: reqBody.descricao, sigla: reqBody.sigla, produtoTrab: {}, metasEspec: reqBody.metasEspec };

  reqBody.produtosTrab.forEach(function (e) {
    retVal.produtoTrab[e] = true;
  });

  return retVal;
}

module.exports = {
  init: function (db, app) {
    var ref = db.ref('/praticasEspec');
    var transform = require('./../transform.js');

    app.get(path, function (req, res) {
      ref.once('value', function (snapshot) {
        res.send(transform.toArray(snapshot.val()));
      });
    });

    app.get(path + "/:key", function (req, res) {
      ref.child(req.params.key).once('value', function (snap) {
        var obj = snap.val();

        if (obj == null) {
          res.status(404).send();
        } else {
          res.send(obj);
        }
      });
    });

    app.post(path, function (req, res) {
      validaBody(req.body, db, () => ref.push(montaJson(req.body)).then(snap => res.status(201).send(snap.key)), error => res.status(400).send(error));
    });

    app.put(path + "/:key", function (req, res) {
      validaBody(req.body, db, function () {
        ref.once('value', function (snap) {
          if (!snap.hasChild(req.params.key)) {
            res.status(404).send();
          } else {
            ref.child(req.params.key).set(montaJson(req.body)).then(() => res.status(200).send())
          }
        });
      }, error => res.status(400).send(error));
    });

    app.delete(path + "/:key", function (req, res) {
      ref.once('value', function (snap) {
        if (!snap.hasChild(req.params.key)) {
          res.status(404).send();
        } else {
          ref.child(req.params.key).remove().then(() => res.status(200).send())
        }
      });
    });
  }
}
