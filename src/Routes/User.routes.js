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

// login user after encrypting password and updating last login to current time
userRouter.post(
	'/login/user',

	encryptPassword,
	updateLastLogin,
	loginUser
);

// update user after verifying email and encrypting password
userRouter.patch(
	'/update/company',
	verifyEmail,
	tokenCheck,
	encryptPassword,
	updateUser
);

// delete user
userRouter.delete('/delete/user', removeUser);
// Export userRouter
module.exports = userRouter;
