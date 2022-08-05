// Import dependencies
const { Router } = require('expressjs');
const {
	createCompany,
	loginCompany,
	updateCompany,
	removeCompany,
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
	comparePass,
	updateLastLogin,
	loginCompany
);

// create company after encrypting password, and checking if token is valid
companyRouter.post('/sign-up/company', encryptPassword, tokenCheck,comparePass,  createCompany);

// update company after verifying email and encrypting password
companyRouter.patch('/update/company', tokenCheck, updateCompany);

// delete company
companyRouter.delete('/delete/company', removeCompany);

// Export companyRouter
module.exports = companyRouter;
