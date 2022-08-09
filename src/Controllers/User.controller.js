require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/User.model');

const debug = process.env.DEBUG || false;

/**
 * Function will create a new User document in the database
 * @module User
 * @controller
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 */
exports.createUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);

		if (debug) {
			console.log(`Creating user from ${req.body}`);
		}

		res.send({
			success: true,
			msg: `${newUser.name} created successfully`,
		});
	} catch (error) {
		if (debug) {
			console.log(`Creating User: ${req.body}`);
			console.log(error);
		}
		res.send({
			success: false,
			msg: `Failed to create user: ${req.body.username}. \n ${error}`,
		});
	}
};

/**
 * Function will be reached when all previous functions have confirmed the login and will return success and a JWT Token to the client
 * @module User
 * @controller
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 */
exports.loginUser = async (req, res) => {
	try {
		if (debug) {
			console.log(`logging in based on ${req.user}`);
		}

		// One final check to see if the req.user exists
		if (req.user) {
			// Log message to console confirming login
			console.log(`Found user ${req.user.name}, logging in...`);

			// Update the last login time
			const User = User.updateOne(
				req.user,
				{ lastLogin: req.body.lastLogin },
				{ returnDocument: 'after' }
			);

			// Generate a new login token with expiresIn: '1d'
			req.token = jwt.sign(req.user, process.env.SECRET, { expiresIn: '1d' });

			res.send({
				success: true,
				msg: `${req.body.name} logged in successfully`,
				token: req.token,
				company: User.company,
				name: User.name,
			});
		}
		if (req.user) {
		} else {
			throw new Error("Couldn't login with credentials");
		}
	} catch (error) {
		if (debug) {
			console.log(`Error logging in user: ${error}`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};

/**
 * Function will update company user using request body object, can only be called by Company
 * @module User
 * @controller
 * @param {Express.Request} req Request object
 * @param {Express.Response} res Response object
 */
exports.updateUser = async (req, res) => {
	try {
		if (debug) {
			console.log(
				`Trying to fetch and update Company User... ${req.body.name}`
			);
		}

		// Update company user using criteria from request.
		req.user = await User.updateOne(req.body.filter, req.body.update, {
			returnDocument: 'after',
		});

		// Send response back to client with success, message and updatedUser
		res.send({
			success: true,
			msg: 'Company User updated successfully',
			updatedUser: req.user,
		});
	} catch (error) {
		if (debug) {
			console.log(`updateCompanyUser failed: ${error}`);
			console.log(`Failed to update Company User with ID: ${req.body._id}...`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};

/**
 * Function will delete User from the database and send a response back for success with message and undefined token
 * @module User
 * @controller
 * @param {*} req
 * @param {*} res
 */
exports.removeUser = async (req, res) => {
	try {
		if (debug) {
			console.log(`deleteUser: ${req.body}`);
		}
		User.deleteOne(req.user);
		res.send({
			success: true,
			msg: `${req.user.name} deleted successfully`,
			token: undefined,
		});
	} catch (error) {
		if (debug) {
			console.log(`Failed to delete User: ${error}`);
		}
	}
};

/**
 * Function will list records in User database based on the company making the request. Can only be called by the Company
 * @module User
 * @controller
 * @param {Express.Request} req Express request object
 * @param {Express.Response} res Express response object
 */
exports.listUsers = async (req, res) => {
	try {
		if (debug) {
			console.log(`getCompanyUsers based on id: ${req.user._id}`);
			console.log(
				`Number of matching user documents: `,
				await User.count({ company: req.user._id })
			);
		}
		// Try to get list of users that are assigned to the company, returning only specific fields
		const list = await User.find(
			{ company: req.params._id },
			'_id name email lastLogin services'
		);

		// send response back to the client, containing success and list of users
		res.send({
			success: true,
			msg: list,
		});
	} catch (error) {
		if (debug) {
			console.log(`Failed to get Company Users... ${error}`);
		}
		res.send({
			success: false,
			msg: error,
		});
	}
};
