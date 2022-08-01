require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
	try {
		if (process.env.DEBUG) {
			console.log(process.env.MONGO_INFRA_URI);
		}
		await mongoose.connect(process.env.MONGO_INFRA_URI);
		console.log("Successful connection");
	} catch (error) {
		console.log("Connection Error: ", error);
	}
};

connection();
