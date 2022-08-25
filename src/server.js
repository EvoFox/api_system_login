// Import Dependencies
// Database Connection
require('./db/connection.js');

// Express Web Server
const express = require('express');
// Cross Origin Resource Sharing
const cors = require('cors');

// Import Routers
const { companyRouter } = require('./Routes/Company.routes');
const userRouter = require('./Routes/User.routes');

// Set up express server and port
const app = express();
const _PORT = process.env.PORT || 5001;

// Make all requests use JSON and allow external requests to be made.
app.use(express.json());
app.use(cors());

// Add routers to server
app.use(companyRouter);
// app.use(userRouter);

// Listen on provided port, or default to 5001
app.listen(_PORT, () => {
	console.log(`Listening on port ${_PORT}`);
});
