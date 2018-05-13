'use strict';

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const https = require('https');
const fs = require('fs');
const FacebookAuth = require('./apiHelpers/facebook/auth');
const FacebookSend = require('./apiHelpers/facebook/sendApi');
const SpotifyApi = require('./apiHelpers/spotify');
const ContextProvider = require('./conversationContextProvider');
const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const DeezerApi = require('./apiHelpers/deezer');
const conversationRouter = require('./conversationRouter');
const app = express();

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: FacebookAuth.verifyRequestSignature }));
app.use(express.static('public'));

app.get('/spotify-login', SpotifyApi.login);
app.get('/spotify-callback', async function(req, res) {
	const { accessToken, psid } = await SpotifyApi.getAccessToken(req, res);
	const newContext = await ContextProvider.set(psid, {
		spotifyAccessToken: accessToken,
		topArtists: await SpotifyApi.getTopArtists(accessToken),
		topGenres: ['pinarock']
	});

	conversationRouter('/stream-provider-auth/data-received', newContext);
});
app.get('/deezer-login', DeezerApi.login);
app.get('/deezer-callback', async function(req, res) {
	const { accessToken, psid } = await DeezerApi.getAccessToken(req, res);
	const newContext = await ContextProvider.set(psid, {
		deezerAccesToken: accessToken,
		topArtists: await DeezerApi.getTopArtists(accessToken),
		topGenres: ['pinarock']
	});

	conversationRouter('/stream-provider-auth/data-received', newContext);
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

async function receivedPostback(psid, payload) {
	const context = await ContextProvider.get(psid);
	const facebookData = await FacebookGraph.getUserInformation(psid);
	if (!context.facebookData) {
		await ContextProvider.set(psid, {
			facebookData: facebookData,
			name: facebookData.first_name
		});
	}

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
