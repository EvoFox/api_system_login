// Import dependencies
const { Router } = require('expressjs');
const {
	create,
	login,
	update,
	remove,
} = require('../Controllers/Company.controller');
const {
	verifyEmail,
	encryptPassword,
	updateLastLogin,
	tokenCheck,
	comparePass,
} = require('../middleware');

// Create companyRouter
const companyRouter = Router();

// Define routes

// login company after login verifying email, encrypt password and setting last login to current time.
companyRouter.post(
	'/login/company',
	verifyEmail,
	encryptPassword,
	updateLastLogin,
	login
);

// create company after verifying email and encrypting password
companyRouter.post('/sign-up/company',encryptPassword, tokenCheck,comparePass,  create);

// update company after verifying email and encrypting password
companyRouter.patch('/update/company', tokenCheck, update);

// delete company
companyRouter.delete('/delete/company', remove);

// Export companyRouter
module.exports = companyRouter;
