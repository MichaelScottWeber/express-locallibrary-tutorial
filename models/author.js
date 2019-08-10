var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
	first_name: { type: String, required: true, max: 100 },
	family_name: { type: String, required: true, max: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
	return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
	var birth_formatted = '';
	var death_formatted = '';
	if (this.date_of_death) {
		death_formatted = moment(this.date_of_death)
			.format('MMMM Do, YYYY')
			.toString();
	}
	if (this.date_of_birth) {
		birth_formatted = moment(this.date_of_birth)
			.format('MMM Do, YYYY')
			.toString();
	}
	return birth_formatted + '-' + death_formatted;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function() {
	return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
