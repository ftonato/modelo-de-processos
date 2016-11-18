const path = '/metaEspecifica';

function validaBody(reqBody, db, allGoodCallback, notGoodCallback) {
    if (reqBody.nome == null) {
        notGoodCallback('nome nao informado');
    } else if (reqBody.descricao == null) {
        notGoodCallback('descricao nao informada');
    } else if (reqBody.sigla == null) {
        notGoodCallback('sigla nao informada');
    } else if (reqBody.praticasEspec == null) {
        notGoodCallback('praticas especifica nao informadas');
    } else if (reqBody.praticasEspec.length == 0) {
        notGoodCallback('praticas especifica não informadas');
    } else {
        db.ref('/praticasEspec').once('value', function (snap) {
            for (var i = 0; i < reqBody.praticasEspec.length; ++i) {
                if (!snap.hasChild(reqBody.praticasEspec[i])) {
                    notGoodCallback('pratica especifica não informada');
                    return;
                }
            }

            allGoodCallback();
        });
    }
}

function montaJson(reqBody) {
    var retVal = { nome: reqBody.nome, descricao: reqBody.descricao, sigla: reqBody.sigla, praticasEspec: {} };

    reqBody.praticasEspec.forEach(function (e) {
        retVal.praticasEspec[e] = true;
    });

    console.log(retVal);

    return retVal;
}

module.exports = {
    init: function (db, app) {
        var ref = db.ref('/metasEspec');

        app.get(path, function (req, res) {
            ref.once('value', function (snapshot) {
                res.send(snapshot.val());
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