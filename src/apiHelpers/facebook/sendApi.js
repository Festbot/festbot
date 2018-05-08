const config = require('config');
const request = require('request-promise');

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

const sendTyping = function(recipientId, timeout) {
	return new Promise((resolve, reject) => {
		callSendAPI({
			recipient: {
				id: recipientId
			},
			sender_action: 'typing_on'
		});

		setTimeout(function() {
			callSendAPI({
				recipient: {
					id: recipientId
				},
				sender_action: 'typing_off'
			});

			resolve();
		}, timeout);
	});
};

module.exports.sendMessage = async function(
	recipientId,
	message,
	quickReplies = []
) {
	await sendTyping(recipientId, message.length * 100);

	const obj = {
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: {
			text: message,
		}
	}

	if (quickReplies.length > 0) {
		obj.message.quick_replies = quickReplies.map(quickReply => ({
			content_type: 'text',
			title: quickReply.title,
			payload: quickReply.payload
		}));
	}

	callSendAPI(obj);
};

module.exports.sendLoginButton = function(recipientId, text, buttonUrl) {
	callSendAPI({
		recipient: { id: recipientId },
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'button',
					text: text,
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

module.exports.sendButtons = function(recipientId, text, buttons) {
	callSendAPI({
		recipient: { id: recipientId },
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'button',
					text: text,
					buttons: buttons
				}
			}
		}
	});
}

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
