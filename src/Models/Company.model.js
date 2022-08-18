// Initialise Mongoose
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
	// Store Company Name, this will be checked against when signing up as a user
	companyName: {
		type: String,
		require: true,
		unique: true,
	},
	// Store company email
	email: {
		type: String,
		require: true,
		unique: true,
	},
	// Store company password
	pass: {
		type: String,
		require: true,
		unique: true,
	},
	lastLogin: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	// Store a list of services that they have access to
	services: [
		{
			type: String,
		},
	],
});

// Map schema to model
const Company = mongoose.model('system.company', companySchema);

// Export for use in ../src/server.js
module.exports = Company;
