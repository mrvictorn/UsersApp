var mongoose = require('mongoose');

function PersonCtrl(){
	this.getModelName = function (){
		return 'Person';
	};
	this.getName = function (){
		return this.name.first+' '+this.name.last;
	};
	this.createFromBody = function(aBody,callB){  // CREATE: new objects
		return this.save(aBody,undefined,callB);
	};
	this.find = function(a,b,c,d){  // READ ALL: find objects
		return	this.model().find(a,b,c,d);
	};
	this.save = function(aBody,id,callB){  // UPDATE save object 
		var _data = this.parseBody(aBody); 
		if (!_data) return undefined;
		if (id) {
			this.model().update({ _id: id },_data, callB);
		} else {
			var mod = this.model()(_data);
			mod.save(callB);
		};
	};
	this.remove = function(a,b,c,d){  // DELETE
		return	this.model().remove(a,b,c,d);
	};
	this.model = function(){ 
		return	this._model.get();
	};
	this._model = (function (obj) {
	    var objModel;
	    function createModel() {
	    	var name = obj.getModelName();
	    	var object = mongoose.model(name,obj.getSchema());
	        return object;
	    }
	    return {
	        get: function () {
	            if (!objModel) {
	                objModel = createModel();
	            }
	            return objModel;
	        }
	    };
	})(this);
}

PersonCtrl.prototype.getSchema = function (){
	return {
		name: {
		    	first: {type : String, default: ''},
		   		last:  {type : String, default: ''}
		   	},
		dateOfBirth: Date
	};
};

PersonCtrl.prototype.parseBody = function(aBody){ // parse req.body
	if (!aBody || !aBody.name ) return undefined;// means error happened
	var fname = aBody.name.first,
	lname = aBody.name.last,
	dOfB = aBody.dateOfBirth;
	if (fname && lname && fname.length>0 && lname.length>0) {
		return {
			name:{
				first:fname,
				last:lname
			},
			dateOfBirth:dOfB
		};
	} else return undefined;

};

function CustomerCtrl(){

}

CustomerCtrl.prototype = new PersonCtrl();

CustomerCtrl.prototype.getSchema = function (){
	parentSch = PersonCtrl.prototype.getSchema();
	parentSch.companyName = {type : String, default: ''};
	parentSch.phone = {
        mobile: {type : String, default: ''},
        work: 	{type : String, default: ''},
	};
	parentSch.skype = {type : String, default: ''};
	return parentSch;
};
CustomerCtrl.prototype.getModelName = function (){
	return 'Customer';
};
CustomerCtrl.prototype.parseBody = function(aBody){ 
	var re = PersonCtrl.prototype.parseBody(aBody);
	if (!re) return undefined;
	var cname = aBody.companyName,
	mphone = aBody.phone.mobile,
	wphone = aBody.phone.work,
	skype = aBody.skype;
	if (cname && cname.length>0) {
		re.companyName = cname;
		re.phone = {
			mobile:mphone,
			work:wphone
		};
		re.skype = skype;

		return re;
		} else return undefined;
};

exports.Person = new PersonCtrl();
exports.Customer = new CustomerCtrl();

