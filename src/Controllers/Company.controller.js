// In this file I need:
//  Company Creation
//  Company Deletion
//  Company Updating
//  Company Reading
//  Listing Users by Company
//  Updating Users by Company

// Import dependencies and initialise
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import models that will be used.
const Company = require('../Models/Company.model');
const User = require('../Models/User.model');

// Company Creation
exports.createCompany = async (req, res) => {
	try {
	} catch (error) {
		res.send({
			ok: false,
		});
	}
};
