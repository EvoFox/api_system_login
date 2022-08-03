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

// set local debug to either equal environment variable or default to false
const debug = process.env.DEBUG || false;

/**
 * Function will create a new Company document in the database and return a jwt token for login
 * @module Company
 * @controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.create = async (req, res) => {
	try {
		const newCompany = await Company.create(req.body);
		// Create a JWT token based on newCompany and set an expiry for 1 day
		const token = jwt.sign({ newCompany }, process.env.SECRET, {
			expiresIn: '1d',
		});
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

/**
 *  Function will be reached when all previous have been confirmed to be accurate, and will return success and JWT token to the users client.
 * @module Company
 * @controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.login = async (req, res) => {
	try {
		if (debug) {
			console.log(`Logging in company based on ${req.body}`);
		}

		// One final check to see if req.user exists
		if (req.user) {
			// Log message to console confirming login
			console.log(`Found company ${req.user.companyName}, logging in...`);

			// Update last login time
			Company.updateOne(req.user, { lastLogin: req.body.lastLogin });

			// Generate a new login token with expiry time of 1 day
			req.token = jwt.sign(req.user, process.env.SECRET, { expiresIn: '1d' });

			// Send response to front end marking request successful, with a message and token value
			res.send({
				success: true,
				msg: `${req.body.companyName} logged in successfully`,
				token: req.token,
			});
		} else {
			throw new Error("Couldn't login with credentials");
		}
	} catch (error) {
		if (debug) {
			console.log(`Error logging in company: ${error}`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};

/**
 * Function will update company database entry, finding the record to be updated using the JWT token and generating a new token based on the updated entry.
 * @module Company
 * @controller
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 */
exports.update = async (req, res) => {
	try {
		if (debug) {
			console.log(`Updating company... ${req.user}`);
			console.log(`Updating fields: ${req.body}`);
		}
		// Update company fields from request body and sign new JWT token with updated data
		req.user = Company.findOneAndUpdate(req.user, req.body, {
			returnDocument: 'after',
		});
		req.token = jwt.sign(req.user, process.env.SECRET, { expiresIn: '1d' });

		// Send response with message and token
		res.send({
			success: true,
			msg: "Successfully updated Company",
			token: req.token
		})
	} catch (error) {
		if (debug) {
			console.log(`Failure on updating Company... ${error}`);
			console.log(`Filter data: ${req.user}`);
			console.log(`Update data: ${req.body}`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};
