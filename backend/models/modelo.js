const path = '/modelo';

function validaBody(reqBody, db, allGoodCallback, notGoodCallback) {
    if (reqBody.nome == null) {
        notGoodCallback('nome nao informado');
    } else if (reqBody.descricao == null) {
        notGoodCallback('descricao nao informada');
    } else if (reqBody.sigla == null) {
        notGoodCallback('sigla nao informada');
    } else if (reqBody.areaProc == null) {
        notGoodCallback('areas de processo nao informadas');
    } else if (reqBody.areaProc.length == 0) {
        notGoodCallback('areas de processo não informadas');
    } else {
        db.ref('/areaProc').once('value', function (snap) {
            for (var i = 0; i < reqBody.areaProc.length; i++) {
                if (!snap.hasChild(reqBody.areaProc[i])) {
                    notGoodCallback('area de processo não informada');
                    return;
                }
            }

            db.ref('/metasGen').once('value', function (snap) {
                for (var i = 0; i < reqBody.metasGen.length; i++) {
                    if (!snap.hasChild(reqBody.metasGen[i])) {
                        notGoodCallback('meta generica não informada');
                        return;
                    }
                }

                allGoodCallback();
            });
        });
    }
}

function montaJson(reqBody) {
    var retVal = { nome: reqBody.nome, descricao: reqBody.descricao, sigla: reqBody.sigla, areaProc: {}, metasGen: {} };

    reqBody.areaProc.forEach(function (e) {
        retVal.areaProc[e] = true;
    });

    reqBody.metasGen.forEach(function (e) {
        retVal.metasGen[e] = true;
    });

    return retVal;
}

function geraPdf(db, modelo, res) {
    var PDFDocument = require('pdfkit');
    var reflect = require('harmony-reflect');
    var Q = require('q');
    require('q-foreach')(Q);

    var doc = new PDFDocument();

    var areaProcRef = db.ref('/areaProc');
    var metasGenRef = db.ref('/metasGen');
    var nivelCapRef = db.ref('/nivelCap');
    var categoriaRef = db.ref('/categoria');
    var nivelMatuRef = db.ref('/nivelMatu');
    var metasEspecRef = db.ref('/metasEspec');
    var praticasEspecRef = db.ref('/praticasEspec');

    res.setHeader('content-type', 'application/pdf');

    doc.pipe(res);

    doc.text('modelo: ');

    doc.text(' nome: ' + modelo.nome);
    doc.text(' descricao: ' + modelo.descricao);
    doc.text(' sigla: ' + modelo.sigla);

    areaProcRef.once('value')
        .then(areaProcSnap => {
            doc.text(' areaProc:');

            return Q.forEach(reflect.ownKeys(modelo.areaProc), function (e) {
                var areaProc = areaProcSnap.child(e).val();
                doc.text('    nome: ' + areaProc.nome);
                doc.text('    descricao: ' + areaProc.descricao);
                doc.text('    sigla: ' + areaProc.sigla);

                return categoriaRef.child(areaProc.categoria).once('value').then(categoriaSnap => {
                    doc.text('    categoria: ' + categoriaSnap.val().nome);
                }).then(() => {
                    return nivelMatuRef.once('value').then(nivelMatuSnap => {
                        doc.text('    nivelMatu:');

                        reflect.ownKeys(areaProc.nivelMatu).forEach(function (e2) {
                            var nivelMatu = nivelMatuSnap.child(e2).val();
                            doc.text('        nome: ' + nivelMatu.nome);
                            doc.text('        descricao: ' + nivelMatu.descricao);
                            doc.text('        sigla: ' + nivelMatu.sigla);
                            doc.text(' ');
                        });
                    });
                }).then(() => {
                    return metasEspecRef.once('value').then(metasEspecSnap => {
                        doc.text('    metasEspec:')

                        return Q.forEach(reflect.ownKeys(areaProc.metasEspec), function (e3) {
                            var metasEspec = metasEspecSnap.child(e3).val();
                            doc.text('        nome: ' + metasEspec.nome);
                            doc.text('        descricao: ' + metasEspec.descricao);
                            doc.text('        sigla: ' + metasEspec.sigla);

                            return praticasEspecRef.once('value').then(praticasEspecSnap => {
                                doc.text('        praticasEspec:');
                                reflect.ownKeys(metasEspec.praticasEspec).forEach(function (e4) {
                                    var praticasEspec = praticasEspecSnap.child(e4).val();
                                    doc.text('            nome: ' + praticasEspec.nome);
                                    doc.text('            descricao: ' + praticasEspec.descricao);
                                    doc.text('            sigla: ' + praticasEspec.sigla);
                                    doc.text(' ');
                                });
                            }).then(() => {
                                doc.text(' ');
                            });
                        });
                    });
                }).then(() => {
                    doc.text(' ');
                });
            });
        }).then(() => {
            return metasGenRef.once('value').then(metasGenSnap => {
                doc.text(' metasGen:');
                return Q.forEach(reflect.ownKeys(modelo.metasGen), function (e5) {
                    var metasGen = metasGenSnap.child(e5).val();
                    doc.text('    nome: ' + metasGen.nome);
                    doc.text('    descricao: ' + metasGen.descricao);
                    doc.text('    sigla: ' + metasGen.sigla);
                    doc.text('    nivelCap:');
                    return nivelCapRef.child(metasGen.nivelCap).once('value').then(nivelCapSnap => {
                        var nivelCap = nivelCapSnap.val();
                        doc.text('        nome: ' + nivelCap.nome);
                        doc.text('        descricao: ' + nivelCap.descricao);
                        doc.text('        sigla: ' + nivelCap.sigla);
                        doc.text('');
                    }).then(() => {
                        doc.text(' ');
                    });
                });
            });
        }).then(() => {
            doc.end();
        });
}

module.exports = {
    init: function (db, app) {
        var ref = db.ref('/modelo');
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

        app.get(path + "/:key/pdf", function (req, res) {
            ref.child(req.params.key).once('value', function (snap) {
                var obj = snap.val();

                if (obj == null) {
                    res.status(404).send();
                } else {
                    geraPdf(db, obj, res);
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
