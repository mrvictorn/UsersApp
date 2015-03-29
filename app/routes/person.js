var Models = require('../models/models'),

Routes = function(app) {
    app.get('/api/persons', function(req, res) {
        Models.Person.find(function(err, pers) {
            if (err)
                res.send(err);
            res.json(pers); 
            });
        })
    .post('/api/persons', function(req, res) {    
        var person = new Models.Person();
        person.name = req.body.name;
        person.dateOfBirth = req.body.dateOfBirth;
         
        person.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Person '+person.name.first+' '+person.name.last+' created' });
        });
    })
    .get('/api/persons/:pers_id', function(req, res) {    
        Models.Person.findById(req.params.pers_id, function(err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })
    .put('/api/persons/:pers_id', function(req, res) {    
        Models.Person.findById(req.params.pers_id, function(err, person) {
            if (err)
                res.send(err);
            person.name = req.body.name;
            person.dateOfBirth = req.body.dateOfBirth; 
            person.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Person '+req.params.pers_id+' updated!' });
            });

        });
    })
    .delete('/api/persons/:pers_id',function(req, res) {
        Models.Person.remove({
            _id: req.params.pers_id
        }, function(err, pers) {
            if (err)
                res.send(err);
            res.json({ message: 'Person '+req.params.pers_id+' successfully deleted' });
        });
    });
}

module.exports = Routes;