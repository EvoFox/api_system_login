// Import Dependecies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
require("dotenv").config();

/**
 * Function will run a RegEx test against an email address to ensure that it is in a valid format, throwing an error if there is either no
 * Email provided to req.body.emailor if the email is not of a valid format
 * @module Middleware
 * @function
 * @param {express.Request} req Express request object
 * @param {express.Response} res Express response object
 * @param {express.NextFunction} next Express next middleware function
 * @return {undefined}
 */
exports.verifyEmail = async (req, res, next) => {
	try {
		if (process.env.DEBUG) {
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
		console.log("Error verifying Email", error);
		res.send({
			success: false,
			msg: error,
		});
	}
};
