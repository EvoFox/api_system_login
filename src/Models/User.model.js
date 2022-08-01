const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
	company: {
		type: String,
		unique: false,
		require: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
    },
    services: [{
        type: String,
    }]
});
