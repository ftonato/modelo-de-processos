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
  doc.text(' areaProc:');

  areaProcRef.orderByChild('modelo').equalTo(modelo.id).on('child_added')
    .then(areaProcSnap => {
      var areaProc = areaProcSnap.val();
      doc.text('    nome: ' + areaProc.nome);
      doc.text('    descricao: ' + areaProc.descricao);
      doc.text('    sigla: ' + areaProc.sigla);

      return categoriaRef.child(areaProc.categoria).once('value').then(categoriaSnap => {
        doc.text('    categoria: ' + categoriaSnap.val().nome);
      }).then(() => {
        return nivelMatuRef.child(areaProc.nivelMatu).once('value').then(nivelMatuSnap => {
          var nivelMatu = nivelMatuSnap.val();
          doc.text('    nivelMatu:');
          doc.text('        nome: ' + nivelMatu.nome);
          doc.text('        descricao: ' + nivelMatu.descricao);
          doc.text('        sigla: ' + nivelMatu.sigla);
          doc.text(' ');
        });
      }).then(() => {
        doc.text('    metasEspec:');
        return metasEspecRef.orderByChild('areaProc').equalTo(areaProcSnap.key).on('child_added').then(metasEspecSnap => {
          var metasEspec = metasEspecSnap.val();

          doc.text('        nome: ' + metasEspec.nome);
          doc.text('        descricao: ' + metasEspec.descricao);
          doc.text('        sigla: ' + metasEspec.sigla);
          doc.text('        praticasEspec:');

          return praticasEspecRef.orderByChild('metasEspec').equalTo(metasEspecSnap.key).on('child_added').then(praticasEspecSnap => {
            var praticasEspec = praticasEspecSnap.val();

            doc.text('            nome: ' + praticasEspec.nome);
            doc.text('            descricao: ' + praticasEspec.descricao);
            doc.text('            sigla: ' + praticasEspec.sigla);
            doc.text(' ');
          }).then(() => {
            doc.text(' ');
          });
        }).then(() => {
          doc.text(' ');
        });
      });
    }).then(() => {
      doc.text(' metasGen:');

      return metasGenRef.orderByChild('modelo').equalTo(modelo.id).on('child_added').then(metasGenSnap => {
        var metasGen = metasGenSnap.val();

        doc.text('    nome: ' + metasGen.nome);
        doc.text('    descricao: ' + metasGen.descricao);
        doc.text('    sigla: ' + metasGen.sigla);
        doc.text('    nivelCap:');

        return nivelCapRef.child(metasGen.nivelCap).once('value').then(nivelCapSnap => {
          var nivelCap = nivelCapSnap.val();
          doc.text('        nome: ' + nivelCap.nome);
          doc.text('        descricao: ' + nivelCap.descricao);
          doc.text('        sigla: ' + nivelCap.sigla);
          doc.text(' ');
        }).then(() => {
          doc.text(' ');
        });
      });
    }).then(() => {
      doc.end();
    });
}

module.exports = {
  init: function (db, app) {
    var ref = db.ref('/modelo');

    app.get('modelo/:key/pdf', function (req, res) {
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
