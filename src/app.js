'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const FacebookAuth = require('./apiHelpers/facebook/auth');
const SpotifyApi = require('./apiHelpers/spotify');
const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const DeezerApi = require('./apiHelpers/deezer');
const { matchRoute, routes } = require('./conversationRouter');
const { processAction } = require('./actionProcessor');
const StatusPage = require('./statusPage');
const app = express();
const throng = require('throng');
const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(
	{
		workers: WORKERS,
		lifetime: Infinity,
	},
	function() {
		app.set('port', process.env.PORT || 5000);
		app.set('view engine', 'ejs');
		app.use(
			bodyParser.json({ verify: FacebookAuth.verifyRequestSignature })
		);
		app.get('/', StatusPage.statusPage);
		app.get('/spotify-login', SpotifyApi.login);
		app.get('/spotify-callback', async function(req, res) {
			const { accessToken, psid } = await SpotifyApi.getAccessToken(
				req,
				res
			);

			const { handler, param } = matchRoute(
				routes,
				'/stream-provider-auth/token-received/spotify/' + accessToken
			);

			await processAction(handler, param, psid);
		});
		app.get('/deezer-login', DeezerApi.login);
		app.get('/deezer-callback', async function(req, res) {
			const { accessToken, psid } = await DeezerApi.getAccessToken(
				req,
				res
			);
			//const newContext = await ContextProvider.set(psid, {
			//	deezerAccesToken: accessToken,
			//	topArtists: await DeezerApi.getTopArtists(accessToken),
			//	topGenres: ['pinarock'],
			//});

			//conversationRouter(
			//	'/stream-provider-auth/data-received',
			//	newContext
			//);
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
					if (
						messagingEvent.message &&
						messagingEvent.message.quick_reply
					) {
						receivedPostback(
							messagingEvent.sender.id,
							messagingEvent.message.quick_reply.payload
						);
					} else if (
						messagingEvent.message &&
						messagingEvent.message.attachments &&
						messagingEvent.message.attachments.length > 0 &&
						messagingEvent.message.attachments[0].type ===
							'location'
					) {
						const {
							coordinates,
						} = messagingEvent.message.attachments[0].payload;
						receivedPostback(
							messagingEvent.sender.id,
							'/add-poi/save-poi/' +
								coordinates.lat +
								':' +
								coordinates.long
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
			const { handler, param } = matchRoute(routes, payload);
			await processAction(handler, param, psid);
		}

		app.listen(app.get('port'), () => {
			console.log('Listening on port ' + app.get('port'));
		});

		console.log('Setting up messenger profile...');
		FacebookGraph.setUpMessengerProfile();
	}
);
