'use strict';

const bodyParser = require('body-parser'),
	config = require('config'),
	express = require('express'),
	https = require('https'),
	fs = require('fs'),
	messageParser = require('./messageParser'),
	FacebookApi = require('./apiHelpers/facebook'),
	SpotifyApi = require('./apiHelpers/spotify');

const app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: FacebookApi.verifyRequestSignature }));
app.use(express.static('public'));
app.get('/spotify-login', SpotifyApi.login);
app.get('/webhook', FacebookApi.validateWebhook);
app.get('/authorize', FacebookApi.authorize);

app.post('/webhook', function (req, res) {
	const data = req.body;

	// Make sure this is a page subscription
	if (data.object == 'page') {
		// Iterate over each entry
		// There may be multiple if batched
		data.entry.forEach(function(pageEntry) {
			const pageID = pageEntry.id;
			const timeOfEvent = pageEntry.time;

			// Iterate over each messaging event
			pageEntry.messaging.forEach(function(messagingEvent) {
			if (messagingEvent.message) {
					receivedMessage(messagingEvent);
				}
			});
		});

		res.sendStatus(200);
	}
});

function receivedMessage(event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;

	var isEcho = message.is_echo;
	var messageId = message.mid;
	var appId = message.app_id;
	var metadata = message.metadata;

	var messageText = message.text;
	var messageAttachments = message.attachments;
	var quickReply = message.quick_reply;

	if (messageText) {
		messageParser(messageText, function(response) {
			console.log('send response', response);

			FacebookApi.callSendAPI({
				recipient: { id: senderID },
				message: { text: response }
			});
		});
	}
}

https.createServer({
	key: fs.readFileSync("../keys/eurorack_privatekey.pem"),
	cert: fs.readFileSync("../keys/eurorack_certs.pem")
}, app).listen(app.get('port'));

module.exports = app;
