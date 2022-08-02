// Import dependencies
const { Router } = require('expressjs');
const {
	createCompany,
	loginCompany,
	updateCompany,
	deleteCompany,
} = require('../Controllers/Company.controller');
const {
	verifyEmail,
	encryptPassword,
	updateLastLogin,
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
	loginCompany
);

// create company after verifying email and encrypting password
companyRouter.post(
	'/sign-up/company',
	verifyEmail,
	encryptPassword,
	createCompany
);

// update company after verifying email and encrypting password
companyRouter.patch(
	'/update/company',
	verifyEmail,
	encryptPassword,
	updateCompany
);

// delete company
companyRouter.delete('/delete/company', deleteCompany);

// Export companyRouter
module.exports = companyRouter;
