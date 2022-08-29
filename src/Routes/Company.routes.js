// Import dependencies
const { Router } = require('express');

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

// create company after verifying email, encrypting password, and checking if token is valid
companyRouter.post(
	'/sign-up/company',
	verifyEmail,
	encryptPassword,
	tokenCheck,
	createCompany
);

// login company after login encrypt password and setting last login to current time.
companyRouter.post(
	'/login/company',
	comparePass,
	updateLastLogin,
	loginCompany
);

companyRouter.get('/login/company', tokenCheck, updateLastLogin, loginCompany);

// update company after verifying email and encrypting password
companyRouter.patch(
	'/update/company',
	verifyEmail,
	tokenCheck,
	encryptPassword,
	updateCompany
);

// delete company
companyRouter.delete('/delete/company', removeCompany);

// Export companyRouter
module.exports = { companyRouter };
