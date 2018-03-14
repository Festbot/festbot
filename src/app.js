'use strict';

var senderId = null;

const bodyParser = require('body-parser'),
	config = require('config'),
	express = require('express'),
	https = require('https'),
	fs = require('fs'),
	messageParser = require('./messageParser'),
	FacebookAuth = require('./apiHelpers/facebook/auth'),
	FacebookSend = require('./apiHelpers/facebook/sendApi'),
	SpotifyApi = require('./apiHelpers/spotify');

const app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: FacebookAuth.verifyRequestSignature }));
app.use(express.static('public'));

app.get('/spotify-login', SpotifyApi.login);
app.get('/spotify-callback', (req, res) => {
	SpotifyApi.callback(req, res).then((data) => {
		const accessToken = data.accessToken;
		SpotifyApi.getInfoAboutMyself(accessToken).then((data) => {
			if (senderId) {
				FacebookSend.sendImage(senderId, data.images[0].url);
			}

			SpotifyApi.getTopArtists(accessToken).then((topartists) => {
				let artistsNames = '';
				topartists.items.forEach(artist => {
					artistsNames += ' ' + artist.name
				});

				FacebookSend.sendMessage(senderId, 'Your favorite artists are:' + artistsNames);
			});
		});
	});
});
app.get('/webhook', FacebookAuth.validateWebhook);
app.get('/authorize', FacebookAuth.authorize);

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
	const messageText = event.message.text;

	if (messageText) {
		messageParser(messageText, function(response) {
			senderId = event.sender.id;

			FacebookSend.sendMessage(senderId, response);

			setTimeout(() => {
				FacebookSend.sendLoginButton(senderId, 'https://eurorack.haveinstock.com:5000/spotify-login');
			}, 1000);
		});
	}
}

https.createServer({
	key: fs.readFileSync("../keys/eurorack_privatekey.pem"),
	cert: fs.readFileSync("../keys/eurorack_certs.pem")
}, app).listen(app.get('port'));

module.exports = app;
