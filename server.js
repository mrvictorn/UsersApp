var express 		= require('express'),
	app 			= express(),
	bodyParser     	= require('body-parser'),
	db 				= require('./config/db'),
	port 			= process.env.PORT || 3300,
	mongoose 		= require('mongoose');

mongoose.connect(db.url); 

app.use(bodyParser.json());

app.use(function (req, res, next) {
	console.log(Date.now());
  console.log(req.body) // populated!
  next()
}); 

app.use(express.static(__dirname + '/public')); 

//routes
require('./app/routes/approutes')(app); // configure our routes

// start here
app.listen(port);               
console.log('UserApp serves on ' + port);

// expose app           
exports = module.exports = app; 