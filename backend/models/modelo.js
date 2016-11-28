function geraPdf(db, modelo, res) {
  var PDFDocument = require('pdfkit');
  var reflect = require('harmony-reflect');
  var Q = require('q');
  require('./../q-foreach.js')(Q);

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

  areaProcRef.orderByChild('modelo').startAt(modelo.id).endAt(modelo.id).once('value').then(areaProcSnap => {
    return Q.forEach(areaProcSnap, childAreaProcSnap => {
      var areaProc = childAreaProcSnap.val();
      doc.text(' areaProc:');
      doc.text('    nome: ' + areaProc.nome);
      doc.text('    descricao: ' + areaProc.descricao);
      doc.text('    sigla: ' + areaProc.sigla);

      return categoriaRef.child(areaProc.categoria).once('value').then(categoriaSnap => {
        var categoria = categoriaSnap.val();
        doc.text('    categoria: ' + categoria.nome);
        return Q.when(categoria);
      }).then(() => {
        return nivelMatuRef.child(areaProc.nivelMatu).once('value').then(nivelMatuSnap => {
          var nivelMatu = nivelMatuSnap.val();
          doc.text('    nivelMatu:');
          doc.text('        nome: ' + nivelMatu.nome);
          doc.text('        descricao: ' + nivelMatu.descricao);
          doc.text('        sigla: ' + nivelMatu.sigla);

          return Q.when(nivelMatu);
        });
      }).then(() => {
        return metasEspecRef.orderByChild('areaProc').startAt(childAreaProcSnap.key).endAt(childAreaProcSnap.key).once('value').then(metasEspecSnap => {
          return Q.forEach(metasEspecSnap, childMetasEspecSnap => {
            var metasEspec = childMetasEspecSnap.val();
            doc.text('    metasEspec:');
            doc.text('        nome: ' + metasEspec.nome);
            doc.text('        descricao: ' + metasEspec.descricao);
            doc.text('        sigla: ' + metasEspec.sigla);

            return praticasEspecRef.orderByChild('metasEspec').startAt(childMetasEspecSnap.key).endAt(childMetasEspecSnap.key).once('value').then(praticasEspecSnap => {
              return Q.forEach(praticasEspecSnap, childPraticasEspecSnap => {
                var praticasEspec = childPraticasEspecSnap.val();

                doc.text('        praticasEspec:');
                doc.text('            nome: ' + praticasEspec.nome);
                doc.text('            descricao: ' + praticasEspec.descricao);
                doc.text('            sigla: ' + praticasEspec.sigla);

                return Q.when(praticasEspec);
              });
            });
          });
        });
      });
    });
  }).then(() => {
    return metasGenRef.orderByChild('modelo').startAt(modelo.id).endAt(modelo.id).once('value').then(metasGenSnap => {
      return Q.forEach(metasGenSnap, childMetasGenSnap => {
        var metasGen = childMetasGenSnap.val();

        doc.text(' metasGen:');
        doc.text('    nome: ' + metasGen.nome);
        doc.text('    descricao: ' + metasGen.descricao);
        doc.text('    sigla: ' + metasGen.sigla);

        return nivelCapRef.child(metasGen.nivelCap).once('value').then(nivelCapSnap => {
          var nivelCap = nivelCapSnap.val();

          doc.text('    nivelCap:');
          doc.text('        nome: ' + nivelCap.nome);
          doc.text('        descricao: ' + nivelCap.descricao);
          doc.text('        sigla: ' + nivelCap.sigla);

          return Q.when(nivelCap);
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

    app.get('/modelo/:key/pdf', function (req, res) {
      ref.child(req.params.key).once('value', function (snap) {
        var obj = snap.val();

        if (obj == null) {
          res.status(404).send();
        } else {
          obj.id = req.params.key;
          geraPdf(db, obj, res);
        }
      });
    });
  }
}
