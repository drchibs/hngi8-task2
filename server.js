const dotenv = require("dotenv").config({ path: "./config.env" });
const app = require("./app");

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
	throw new GeneralError(`${err.message}`);
	process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
	throw new GeneralError(`${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
