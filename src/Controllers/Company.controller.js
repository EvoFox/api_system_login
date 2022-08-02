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
/**
 * Function will create a new Company document in the database and return a jwt token for login
 * @module Company
 * @controller 
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.createCompany = async (req, res) => {
	try {
		const newCompany = await Company.create(req.body);
		const token = jwt.sign({ id: newCompany._id, secret: process.env.SECRET });
		if (debug) {
			console.log(`Creating company from ${req.body}`);
			console.log(`Generated token: ${token}`);
		}
		res.send({
			success: true,
			msg: 'Company created successfully',
			token: token,
		});
	} catch (error) {
		res.send({
			ok: false,
		});
	}
};
