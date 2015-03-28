var mongoose = require('mongoose');

module.exports = mongoose.model('Person', {
    name : {
    	first: {type : String, default: ''},
   		last:  {type : String, default: ''}
   	}
});