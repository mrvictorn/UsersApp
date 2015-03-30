CrudRouteCreator = function(app,model,apiname) {
    app.get('/api/'+apiname, function(req, res) {// READ ALL
        model.find({},function(err, docs) {
            if (err) res.send(err)
            else res.json(docs); 
            });
        })
    .post('/api/'+apiname, function(req, res) { // CREATE   
        model.createFromBody(req.body,function(err) {
            if (err) res.send(err);
            else res.json({ status: 'Document created' });
        });
    })
    .get('/api/'+apiname+'/:pers_id', function(req, res) { //READ BY ID    
        model.find({_id:req.params.pers_id}, function(err, doc) {
            if (err) res.send(err)
            else res.json(doc);
        });
    })
    .put('/api/'+apiname+'/:pers_id', function(req, res) { //UPDATE   
        model.save(req.body,req.params.pers_id,function(err) {
            if (err) res.send(err)
            else res.json({ message: 'Document '+req.params.pers_id+' updated!' });
            });
    })
    .delete('/api/'+apiname+'/:pers_id',function(req, res) { //DELETE
        model.remove({_id: req.params.pers_id}, function(err, pers) {
            if (err) res.send(err)
            else res.json({ message: 'Document '+req.params.pers_id+' successfully deleted' });
        });
    });
}

module.exports = CrudRouteCreator;