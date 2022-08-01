// Import dependencies
const { Router } = require("expressjs");
const {} = require("../Controllers/User.controller");
const { verifyEmail, encryptPassword } = require("../middleware");

// Create userRouter
const userRouter = Router();

// Define routes

// Export userRouter
module.exports = userRouter;
