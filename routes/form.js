var express = require("express");
var router = express.Router();
const sendgrid = require("@sendgrid/mail");

const SENDGRID_API_KEY =
	"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";

sendgrid.setApiKey(SENDGRID_API_KEY);

router.post("/", function (req, res, next) {
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;

	const msg = {
		to: email, // Change to your recipient
		from: "richarddennis789@gmail.com", // Change to your verified sender
		subject: `Email from $name - $email`,
		text: message,
	};

	sendgrid
		.send(msg)
		.then((resp) => {
			console.log("Email sent\n", resp);
		})
		.catch((error) => {
			console.error(error);
		});

	res.status(200).json({
		status: "OK",
		name: name,
		email: email,
		message: message,
	});
});

module.exports = router;
