const path = '/areaProcesso';

function validaBody(reqBody, db, allGoodCallback, notGoodCallback) {
    if (reqBody.nome == null) {
        notGoodCallback('nome nao informado');
    } else if (reqBody.descricao == null) {
        notGoodCallback('descricao nao informada');
    } else if (reqBody.sigla == null) {
        notGoodCallback('sigla nao informada');
    } else if (reqBody.metasEspec == null) {
        notGoodCallback('metas especifica nao informadas');
    } else if (reqBody.categoria == null) {
        notGoodCallback('categoria nao informada');
    } else if (reqBody.nivelMatu == null) {
        notGoodCallback('nivel de maturidade nao informadas');
    } else if (reqBody.metasEspec.length == 0) {
        notGoodCallback('metas especifica nao informadas');
    } else if (reqBody.categoria.length == 0) {
        notGoodCallback('categoria nao informada');
    } else if (reqBody.nivelMatu.length == 0) {
        notGoodCallback('nivel de maturidade nao informadas');
    } else {
        db.ref('/metasEspec').once('value', function (snap) {
            for (var i = 0; i < reqBody.metasEspec.length; ++i) {
                if (!snap.hasChild(reqBody.metasEspec[i])) {
                    notGoodCallback('meta especifica não informada');
                    return;
                }
            }

            db.ref('/nivelMatu').once('value', function (snap) {
                if (!snap.hasChild(reqBody.nivelMatu)) {
                    notGoodCallback('nivel de maturidade nao existe');
                } else {
                    db.ref('/categoria').once('value', function (snap) {
                        if (!snap.hasChild(reqBody.categoria)) {
                            notGoodCallback('categoria nao existe');
                        } else {
                            allGoodCallback();
                        }
                    });
                }
            });
        });
    }
}

function montaJson(reqBody) {
    var retVal = { nome: reqBody.nome, descricao: reqBody.descricao, sigla: reqBody.sigla, categoria: reqBody.categoria, nivelMatu: reqBody.nivelMatu, metasEspec: {} };

    reqBody.metasEspec.forEach(function (e) {
        retVal.metasEspec[e] = true;
    });

    return retVal;
}

module.exports = {
    init: function (db, app) {
        var ref = db.ref('/areaProc');
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