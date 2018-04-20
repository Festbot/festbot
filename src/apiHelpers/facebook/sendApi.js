const config = require('config');
const request = require('request-promise');
const getPersistentMenu = requrire('./getPersistentMenu');
const getGreetings = require('./greetings');

const PAGE_ACCESS_TOKEN = config.get('pageAccessToken');

const callSendAPI = function(messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: PAGE_ACCESS_TOKEN },
		method: 'POST',
		json: messageData
	})
		.then(data => {})
		.catch(data => {
			console.log('fb api error: ', data.error.error.message);
		});
};

module.exports.sendMessage = function(recipientId, message) {
	callSendAPI({
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: { text: message }
	});
};

module.exports.setUpMessengerProfile = async function() {
	try {
		const response = await request({
			uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
			qs: { access_token: PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: {
				greeting: getGreetings(),
				get_started: {
					payload: 'ez kizard dolog, mert nem tudom'
				},
				persistent_menu: getPersistentMenu()
			}
		});
		console.log(response);
	} catch (e) {
		console.log('fb api error: ', e);
	}
};

module.exports.sendLoginButton = function(recipientId, buttonUrl) {
	callSendAPI({
		recipient: { id: recipientId },
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'button',
					text: 'Tap the log in button!',
					buttons: [
						{
							type: 'account_link',
							url: buttonUrl
						}
					]
				}
			}
		}
	});
};

module.exports.sendImage = function(recipientId, imageUrl) {
	callSendAPI({
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: {
			attachment: {
				type: 'image',
				payload: {
					url: imageUrl,
					is_reusable: true
				}
			}
		}
	});
};

module.exports.sendWebviewButton = function(recipientId) {
	callSendAPI({
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'button',
					text: 'Try the URL button!',
					buttons: [
						{
							type: 'web_url',
							url: 'https://grumpy-parrot-29.localtunnel.me',
							title: 'URL Button',
							webview_height_ratio: 'full',
							messenger_extensions: 'false'
						}
					]
				}
			}
		}
	});
};
