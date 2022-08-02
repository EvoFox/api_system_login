// Import Dependencies
require('./db/connection.js');
const express = require('expressjs');
const cors = require('cors');

// Import Routers
const companyRouter = require('./Routes/Company.routes');
const userRouter = require('./Controllers/User.controller');

// Set up express server and port
const app = express();
const port = process.env.PORT || 5001;

// Make all requests use JSON and allow external requests to be made.
app.use(express.json({ limit: '100mb' }));
app.use(cors);

// Add routers to server
app.use(companyRouter);
app.use(userRouter);

// Listen on provided port, or default to 5001
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
