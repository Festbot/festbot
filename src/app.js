'use strict';

var senderId = null;

const bodyParser = require('body-parser'),
	config = require('config'),
	express = require('express'),
	https = require('https'),
	fs = require('fs'),
	FacebookAuth = require('./apiHelpers/facebook/auth'),
	FacebookSend = require('./apiHelpers/facebook/sendApi'),
	SpotifyApi = require('./apiHelpers/spotify'),
	ContextProvider = require('./conversationContextProvider'),
	FacebookGraph = require('./apiHelpers/facebook/graphApi'),
	conversationRouter = require('./coversationRouter');

const app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: FacebookAuth.verifyRequestSignature }));
app.use(express.static('public'));

app.get('/spotify-login', SpotifyApi.login);
app.get('/spotify-callback', (req, res) => {
	SpotifyApi.callback(req, res).then(({accessToken, psid}) => {
		SpotifyApi.getInfoAboutMyself(accessToken).then(data => {
			ContextProvider.set(psid, {
				spotifyId: data.id,
				spotifyCountry: data.country,
				spotifyAccessToken: accessToken
			});
		});
	});
});
app.get('/webhook', FacebookAuth.validateWebhook);
app.get('/authorize', FacebookAuth.authorize);

app.post('/webhook', function(req, res) {
	const data = req.body;

	// Make sure this is a page subscription
	if (data.object !== 'page') {
		return res.sendStatus(404);
	}

	// Iterate over each entry
	// There may be multiple if batched
	data.entry.forEach(function(pageEntry) {
		if (!pageEntry.messaging) {
			return;
		}

		pageEntry.messaging.forEach(function(messagingEvent) {
			if (messagingEvent.message && messagingEvent.message.quick_reply) {
				receivedPostback(
					messagingEvent.sender.id,
					messagingEvent.message.quick_reply.payload
				);
			} else if (messagingEvent.postback) {
				receivedPostback(
					messagingEvent.sender.id,
					messagingEvent.postback.payload
				);
			}
		});
	});

	res.sendStatus(200);
});

async function receivedPostback(senderId, payload) {
	const context = await ContextProvider.get(senderId);
	conversationRouter(payload, context);
}

https
	.createServer(
		{
			key: fs.readFileSync('../keys/eurorack_privatekey.pem'),
			cert: fs.readFileSync('../keys/eurorack_certs.pem')
		},
		app
	)
	.listen(app.get('port'));

console.log('Setting up messenger profile...');
FacebookGraph.setUpMessengerProfile();

module.exports = app;
