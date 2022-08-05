// Import dependencies
const { Router } = require('expressjs');
const {
	loginUser,
	createUser,
	updateUser,
	removeUser,
} = require('../Controllers/User.controller');

const {
	verifyEmail,
	encryptPassword,
	updateLastLogin,
	tokenCheck,
	comparePass,
} = require('../middleware');

// Create userRouter
const userRouter = Router();

// Define routes
// Login user after verify email, encrypt password and setting last login to current time
userRouter.post(
	'/sign-up/user',
	verifyEmail,
	encryptPassword,
	tokenCheck,
	comparePass,
	updateLastLogin,
	createUser
);

userRouter.post(
	'/login/user',
	
	encryptPassword,
	updateLastLogin,
	loginUser
);
userRouter.patch('/update/company', tokenCheck, updateUser);

userRouter.delete('/delete/user', removeUser);
// Export userRouter
module.exports = userRouter;
