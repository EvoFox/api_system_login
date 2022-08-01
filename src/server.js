// Import Dependencies
require("./db/connection.js");
const express = require("expressjs");
const cors = require("cors");

// Set up express server and port
const app = express();
const port = process.env.PORT || 5001;

// Make all requests use JSON and allow external requests to be made.
app.use(express.json({ limit: "100mb" }));
app.use(cors);

// Add routers to server

// Listen on provided port, or default to 5001
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
