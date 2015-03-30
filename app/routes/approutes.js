var Models = require('../models/models'),
CRUDApiRoutes = require('./crud')
Routes = function(app) {
	//generating routes for our server API
    CRUDApiRoutes(app,Models.Person,'persons');
    CRUDApiRoutes(app,Models.Customer,'customers');
    //default routes
    app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); 
        });

};

module.exports = Routes;