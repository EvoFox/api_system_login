// Import dependencies
const { Router } = require('expressjs');
const { loginCompany } = require('../Controllers/Company.controller');


const {
	encryptPassword,
	updateLastLogin,
	tokenCheck,
	comparePass,
} = require('../middleware');

// Create Router
const generalRouter = Router();

// Create Token Check Router
generalRouter.GET("/login")

// Export Router
module.exports = companyRouter;
