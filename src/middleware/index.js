// Import Dependecies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const debug = process.env.DEBUG;

/**
 * Function will run a RegEx test against an email address to ensure that it is in a valid format,
 * @module Middleware
 * @function
 * @throws if req.body.email empty or not valid
 * @param {express.Request} req Express request object
 * @param {express.Response} res Express response object
 * @param {express.NextFunction} next Express next middleware function
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
				throw new Error("Invalid Email Format");
			}
		} else {
			// End process here, no email provided
			throw new Error("No Email Provided");
		}
	} catch (error) {
		if (debug) {
			console.log("Error verifying Email", error);
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
 * @function
 * @throws if no parameter is provided to req.body.pass
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Middleware Function
 */
exports.encryptPassword = async (req, res, next) => {
	try {
		// If debugging print plaintext password
		if (debug) {
			console.log(`Encrypting Password: ${req.body.pass}`);
		}
		if (req.body.pass) {
			req.body.pass = await bcrypt.hash(req.body.pass, process.env.SALT);
			next();
		} else {
			throw new Error("No password to encrypt.");
		}
	} catch (error) {
		if (debug) {
			console.log("Error Encrypting Password: ", error);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};
