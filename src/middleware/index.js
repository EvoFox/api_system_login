const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../Models/Company.model');
require('dotenv').config();

// set local debug to either equal environment variable or default to false
const debug = process.env.DEBUG || false;
const SALT = parseInt(process.env.SALT) || 8;
/**
 * Function will run a RegEx test against an email address to ensure that it is in a valid format,
 * @module Middleware
 * @middleware
 * @throws if req.body.email empty or not valid
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 * @param {Express.NextFunction} next Express next middleware function
 * @return {undefined}
 */
exports.verifyEmail = async (req, res, next) => {
	try {
		if (debug) {
			console.log(`Verifying Email: ${req.body.email}`);
		}
		// Regex looks for three distinct groups, deliminated by @ and . With the third group allowed to repeat
		// Example@Email.co.uk
		const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

		// Check if the request has the required email field
		if (req.body.email) {
			// Check if the email field provided passes a Regex Test
			if (regex.test(req.body.email)) {
				// Move on to next function
				next();
			} else {
				// End process here, email is invalid
				throw new Error('Invalid Email Format');
			}
		} else {
			// End process here, no email provided
			throw new Error('No Email Provided');
		}
	} catch (error) {
		if (debug) {
			console.log('Error verifying Email', error);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};

/**
 * Function will encrypt req.body.pass using BCryptJS, utilising the salt from the .env file.
 * @module Middleware
 * @middleware
 * @throws if no parameter is provided to req.body.pass
 * @param {Express.Request} req Express Request Object
 * @param {Express.Response} res Express Response Object
 * @param {Express.NextFunction} next Express Next Middleware Function
 */
exports.encryptPassword = async (req, res, next) => {
	try {
		// If debugging print plaintext password
		if (debug) {
			console.log(`Encrypting Password: ${req.body.pass}`);
			console.log(`Encryption Salt: ${SALT}`);
		}
		if (req.body.pass) {
			req.body.pass = await bcrypt.hash(req.body.pass, SALT);
			next();
		} else {
			throw new Error('No password to encrypt.');
		}
	} catch (error) {
		if (debug) {
			console.log('Error Encrypting Password: ', error);
		}
		res.send({
			success: false,
			msg: 'Error Encrypting Password',
		});
	}
};

/**
 * Function will add date to request object for storing in database
 * @module Middleware
 * @middleware
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 * @param {Express.NextFunction} next Express next function
 */
exports.updateLastLogin = async (req, res, next) => {
	try {
		// Add date to request object for storing in database
		req.body.lastLogin = Date.now();

		next();
	} catch (error) {
		if (debug) {
			console.log('Error updating last login: ', error);
		}

		res.send({
			success: false,
			msg: error,
		});
	}
};

/**
 * Function will be called when attempting to login, and will check if the user has an existing token
 * @module Middleware
 * @middleware
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 * @param {Express.NextFunction} next Express next function
 */
exports.tokenCheck = async (req, res, next) => {
	try {
		if (debug) {
			// Log sensitive information for debugging
			if (req.header('Authorization'))
			{
				console.log(req.header('Authorization'));
				console.log(jwt.verify(req.header('Authorization')));
			}
		}
		// If the request contains a token, assign its contents to req.user and move to comparePass
		if (req.header('Authorization')) {
			req.user = jwt.verify(req.header('Authorization'));
			next();
		} else {
			// otherwise move onto comparePass without req.user;
			next();
		}
	} catch (error) {
		if (debug) {
			console.log(`tokenCheck Error: ${error}`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};

exports.comparePass = async (req, res, next) => {
	try {
		if (debug) {
			// Log sensitive information for debugging
			console.log('Company ComparePass Middleware');
			console.log({ 'req.body': req.body });
			console.log({ 'req.user': req.user });
		}

		// if req.user doesn't exist, create it based on req.body (making sure to search on correct database schema)
		if (!req.user) {
			if ((req.body.type = 'company')) {
				req.user = await Company.findById(req.body.id);
			} else {
				req.user = await User.findById(req.body.id);
			}
		}

		// check if user entered password matches password in database, if so, move on to the next step
		if (await bcrypt.compare(req.body.pass, req.user.pass)) {
			next();
		} else {
			// otherwise throw error
			throw new Error('Invalid login information');
		}
	} catch (error) {
		if (debug) {
			console.log(`comparePass error: ${error}`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};
