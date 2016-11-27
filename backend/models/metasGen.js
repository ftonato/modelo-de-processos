const path = '/metasGenericas';

function validateBody(reqBody, db, allGoodCallback, notGoodCallback) {
  if (reqBody.nome == null) {
    notGoodCallback('nome nao informado');
  } else if (reqBody.descricao == null) {
    notGoodCallback('descricao nao informada');
  } else if (reqBody.sigla == null) {
    notGoodCallback('sigla nao informada');
  } else if (reqBody.nivelCap == null) {
    notGoodCallback('Chave do nivel de capacidade nao informada');
  } else if (reqBody.modelo == null) {
    notGoodCallback('Chave do modelo nao informada');
  } else {
    db.ref('/modelo').once('value', function (snap) {
      if (!snap.hasChild(reqBody.modelo)) {
        notGoodCallback('Chave de modelo nao existe');
      } else {
        allGoodCallback();
      }
    });
  }
}

function montaJson(reqBody) {
  return {
    nome: reqBody.nome,
    descricao: reqBody.descricao,
    sigla: reqBody.sigla,
    nivelCap: reqBody.nivelCap,
    modelo: reqBody.modelo
  };
}

module.exports = {
  init: function (db, app) {
    var ref = db.ref('/metasGen');
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
      validateBody(req.body, db, function () {
        ref.push(montaJson(req.body)).then((snap) => {
          res.status(201).send(snap.key);
        });
      }, function (error) {
        res.status(400).send(error);
      });
    });

    app.put(path + "/:key", function (req, res) {
      ref.once('value', function (snap) {
        if (!snap.hasChild(req.params.key)) {
          res.status(404).send();
        } else {
          validateBody(req.body, db, function () {
            ref.child(req.params.key).set(montaJson(req.body)).then(() => res.status(200).send());
          }, function (error) {
            res.status(400).send(error);
          });
        }
      });
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
