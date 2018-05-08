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
	FestbotApi = require('./apiHelpers/festbot'),
	FacebookGraph = require('./apiHelpers/facebook/graphApi');

const app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: FacebookAuth.verifyRequestSignature }));
app.use(express.static('public'));

app.get('/spotify-login', SpotifyApi.login);
app.get('/spotify-callback', (req, res) => {
	SpotifyApi.callback(req, res).then(data => {
		const accessToken = data.accessToken;
		SpotifyApi.getInfoAboutMyself(accessToken).then(data => {
			console.log('spotify data', data);
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
	if (payload === 'getStarted') {
		const userInfo = await FacebookGraph.getUserInformation(senderId);
		const userData = await FestbotApi.getUserDataCreateNewIfDoesntExists(
			senderId,
			userInfo
		);

		await FacebookSend.sendMessage(
			senderId,
			'Hey ' +
				userInfo.name +
				', I’m here to assist you with festival related questions and more. 😎'
		);
		await FacebookSend.sendMessage(
			senderId,
			'I am so excited to getting know you better. 🤩'
		);
		await FacebookSend.sendMessage(
			senderId,
			'Some of my services are based on your personal musical taste. 🧐'
		);
		await FacebookSend.sendMessage(
			senderId,
			'Wouldn’t mind if I ask you little bit about you? ☺️',
			[
				{ title: 'No problem ☺️', payload: 'selectStreamingProvider' },
				{
					title: 'Maybe later 🤔',
					payload: 'selectStreamingProviderLater'
				}
			]
		);
	} else if (payload === 'selectStreamingProvider') {
		FacebookSend.sendButtons(
			senderId,
			'Please select your music streaming provider from the list:',
			[
				{
					type: 'postback',
					title: 'Spotify',
					payload: 'authenticateSpotify'
				},
				{
					type: 'postback',
					title: 'Apple Music',
					payload: 'authenticateAppleMusic'
				},
				{
					type: 'postback',
					title: 'Deezer',
					payload: 'authenticateDeezer'
				}
			]
		);
	} else if (payload === 'selectStreamingProviderLater') {
		await FacebookSend.sendMessage(
			senderId,
			'Okay, we can do it any time. 😉'
		);
	} else if (payload === 'authenticateSpotify') {
		await FacebookSend.sendLoginButton(
			senderId,
			'Tap the login button to connect your Spotify account!',
			'https://eurorack.haveinstock.com:5000/spotify-login'
		);
	}
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
