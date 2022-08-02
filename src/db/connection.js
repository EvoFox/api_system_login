// Import dependencies and initialise Mongoose
require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
	try {
		// Check if the software is currently in debug mode
		if (process.env.DEBUG) {
			// If DEBUG, print the connection string
			console.log(process.env.MONGO_INFRA_URI);
		}

		// Attempt to connect to MongoDB using connection string and report success to the console
		await mongoose.connect(process.env.MONGO_INFRA_URI);
		console.log('Successful connection');
	} catch (error) {
		// If the code errors out, log the error to the console
		console.log('Connection Error: ', error);
	}
};

// Automatically run when software is loaded
connection();
