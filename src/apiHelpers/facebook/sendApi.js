const request = require('request-promise');

const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

const callSendAPI = function(messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: PAGE_ACCESS_TOKEN },
		method: 'POST',
		json: messageData,
	})
		.then(data => {})
		.catch(data => {
			console.log('fb api error: ', data.error.error.message);
		});
};

const sendTyping = function(recipientId, timeout) {
	callSendAPI({
		recipient: {
			id: recipientId,
		},
		sender_action: 'typing_on',
	});

	return new Promise((resolve, reject) => {
		setTimeout(function() {
			callSendAPI({
				recipient: {
					id: recipientId,
				},
				sender_action: 'typing_off',
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
	await sendTyping(recipientId, message.length * 50);

	const obj = {
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: {
			text: message,
		},
	};

	if (quickReplies.length > 0) {
		obj.message.quick_replies = quickReplies;
	}

	callSendAPI(obj);
};

module.exports.sendDebug = async function(recipientId, message) {
	const obj = {
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: {
			text: message,
		},
	};

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
							url: buttonUrl,
						},
					],
				},
			},
		},
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
					buttons: buttons,
				},
			},
		},
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
					is_reusable: true,
				},
			},
		},
	});
};

module.exports.sendWebviewButton = function(
	recipientId,
	message,
	buttonTitle,
	url
) {
	callSendAPI({
		recipient: {
			id: recipientId,
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'button',
					text: message,
					buttons: [
						{
							type: 'web_url',
							url: url,
							title: buttonTitle,
							webview_height_ratio: 'tall',
							messenger_extensions: 'true',
						},
					],
				},
			},
		},
	});
};
