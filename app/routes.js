var Person = require('./models/person'),
Routes = function(app) {
    app.get('/api/persons', function(req, res) {
        Person.find(function(err, pers) {
            if (err)
                res.send(err);
            res.json(pers); 
            });
        })
    .post('/api/persons', function(req, res) {    
        var person = new Person();
        person.name = req.body.name; 
        person.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Person '+person.name.first+' '+person.name.last+' created' });
        });
    })
    .get('/api/persons/:pers_id', function(req, res) {    
        Person.findById(req.params.pers_id, function(err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })
    .put('/api/persons/:pers_id', function(req, res) {    
         Person.findById(req.params.pers_id, function(err, person) {
            if (err)
                res.send(err);
            person.name = req.body.name; 
            person.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Person '+req.params.pers_id+' updated!' });
            });

        });
    })
    .delete('/api/persons/:pers_id',function(req, res) {
        Person.remove({
            _id: req.params.pers_id
        }, function(err, pers) {
            if (err)
                res.send(err);
            res.json({ message: 'Person '+req.params.pers_id+' successfully deleted' });
        });
    });

    app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); 
        });

    };

module.exports = Routes;