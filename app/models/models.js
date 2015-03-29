var mongoose = require('mongoose');
var 
var Person = {
	constructor: function(afirst,alast,adayOfBirth){
		this.name = {
			first:afirst,
			last:alast
		};
		this.dayOfBirthBirth = adayOfBirthBirth;
		return this;
	}, 
	getSchema: function (){
		return {
			name: {
			    	first: {type : String, default: ''},
			   		last:  {type : String, default: ''}
			   	},
			dateOfBirth: Date
		};
	},
	getModelName: function (){
		return 'Person';
	},
	getName: function (){
		return this.name.first+' '+this.name.last;
	},
	parseBody:function(aBody){ // parse req.body
		if (!aBody || !aBody.name ) return undefined;// means error happened
		var fname = aBody.name.first,
		lname = aBody.name.last,
		dOfB = aBody.dateOfBirth;
		if (fname && lname && fname.length>0 && lname.length>0) {
			return {
				name.first:fname,
				name.last:lname,
				dateOfBirth:dOfB
			};
		} else return undefined;

	}
	saveModel:function(aBody,id){  // save model 
		var _data = this.parseBody(aBody); 
		if (!_data) return undefined;
		try {
			this.model().update({ _id: id }, { $set: _data}, function(err){
				console.log(err);
			} );
		} catch (e) {
			console.log('Error saving model:'+e);
			return false;
		}
		return true;
	}
	model:function(){
		var myModel,
		mName = this.getModelName(),
		mSchema = this.getSchema();
		function _getModel(){
			if(!myModel) {
				return mongoose.model(mName,mSchema);
			} else {
				return myModel;
			}
		};
		return _getModel();
	}
}

var Customer = Object.create(Person);
Customer.constructor = function(aFName,aLName,aDayOfBirth,aCompanyName,aMobilePhone,aWorkPhone,aSkype){
	Person.constructor.apply(this,arguments);
	this.companyName = aCompanyName;
	this.phone = {
		mobile:aMobilePhone,
		work:aWorkPhone
	};
	this.skype = aSkype;
};
Customer.getSchema = function (){
	parentSch = Person.getSchema();
	parentSch.companyName = {type : String, default: ''};
	parentSch.phone = {
        mobile: {type : String, default: ''},
        work: 	{type : String, default: ''},
	};
	parentSch.skype = {type : String, default: ''};
	return parentSch;
};
Customer.getModelName = function (){
	return 'Customer';
};
Customer.parseBody = function(aBody){ 
	var re = Person.parseBody.apply(this,aBody);
	if (!re) return undefined;
	var cname = aBody.CompanyName,
	mphone = aBody.phone.mobile,
	wphone = aBody.phone.work;
	skype = aBody.skype;
	if (cname && cname.length>0) {
		re.phone = {
			mobile:mphone,
			work:wphone
		};
		re.skype = skype;
		return re;
		} else return undefined;
};
Customer.saveModel = function(aBody,aModel,id){ // save model  
		var _data = this.ParseBody(aBody);
		if (!_data) return undefined;// means error in parsing req.body happened
		return Person.saveModel.apply(this,arguments);
};

exports.Person = Person;
exports.Customer = Customer;

