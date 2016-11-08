const path = '/categoria';

module.exports = {
    init: function (db, app) {
        var cat = db.ref('/categoria');

        app.get(path, function (req, res) {
            cat.once('value', function (snapshot) {
                res.send(snapshot.val());
            });
        });

        app.get(path + "/:key", function (req, res) {
            cat.child(req.params.key).once('value', function (snap) {
                var obj = snap.val();

                if (obj == null) {
                    res.status(404).send();
                } else {
                    res.send(obj);
                }
            });
        });

        app.post(path, function (req, res) {
            cat.push({ nome: req.body.nome }).then((snap) => {
                res.status(201).send(snap.key);
            });
        });

        app.put(path + "/:key", function (req, res) {
            cat.once('value', function (snap) {
                if (!snap.hasChild(req.params.key)) {
                    res.status(404).send();
                } else {
                    cat.child(req.params.key).set({ nome: req.body.nome }).then(() => res.status(200).send())
                }
            });
        });

        app.delete(path + "/:key", function (req, res) {
            cat.once('value', function (snap) {
                if (!snap.hasChild(req.params.key)) {
                    res.status(404).send();
                } else {
                    cat.child(req.params.key).remove().then(() => res.status(200).send())
                }
            });
        });
    }
}