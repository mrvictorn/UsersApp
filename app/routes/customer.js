var Models = require('../models/models'),

Routes = function(app) {
    app.get('/api/customers', function(req, res) {
        Models.Customer.find(function(err, pers) {
            if (err)
                res.send(err);
            res.json(pers); 
            });
        })
    .post('/api/customers', function(req, res) {    
        var customer = new Models.Customer();
        customer.name = req.body.name;
        customer.dateOfBirth = req.body.dateOfBirth;
         
        customer.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Customer '+customer.cname+' created' });
        });
    })
    .get('/api/customers/:pers_id', function(req, res) {    
        Models.Customer.findById(req.params.pers_id, function(err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })
    .put('/api/customers/:pers_id', function(req, res) {    
        Models.Customer.findById(req.params.pers_id, function(err, person) {
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
    .delete('/api/customers/:pers_id',function(req, res) {
        Models.Customer.remove({
            _id: req.params.pers_id
        }, function(err, pers) {
            if (err)
                res.send(err);
            res.json({ message: 'Person '+req.params.pers_id+' successfully deleted' });
        });
    });

}
module.exports = Routes;