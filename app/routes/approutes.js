var customerRoute   = require('./customer'),
    personRoute     = require('./person'),

Routes = function(app) {
    personRoute(app);
    customerRoute(app);
    
    //default routes
    app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); 
        });

};

module.exports = Routes;