// Initialise Mongoose
const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
	// This will be checked against the Company schema to ensure validity
	company: {
		type: mongoose.Schema.Types.ObjectId,
		unique: false,
		require: true,
	},
	// This will be the username within the company, company will be able to list employees registered to them
	name: {
		type: String,
		required: true,
	},
	// Encrypted with BCryptJS, 15 salt rounds
	pass: {
		type: String,
		required: true,
	},
	// Considering adding validation to this to ensure that all emails have the same domain as the parent company
	// Perhaps a toggle?
	email: {
		type: String,
		required: true,
	},
	lastLogin: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	// This will be a list of the services that they have access to, controlled by parent company
	services: [
		{
			type: String,
		},
	],
});

// Map the schema to a model
const User = mongoose.model('User', userSchema);

// Export model to be used in ../src/server.js
module.exports = User;
 