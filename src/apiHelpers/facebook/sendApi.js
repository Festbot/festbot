const request = require('request-promise');

const callSendAPI = function(messageData) {
	request({
		uri: 'https://graph.facebook.com/v3.0/me/messages',
		qs: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
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

const sendMessage = async function(recipientId, message, quickReplies = []) {
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

const sendDebug = async function(recipientId, message) {
	const obj = {
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: {
			text: message,
		},
	};

	callSendAPI(obj);
};

const sendLoginButton = function(recipientId, text, buttonUrl) {
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

const sendButtons = function(recipientId, text, buttons) {
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

const sendImage = function(recipientId, imageUrl) {
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

const sendWebviewButton = function(recipientId, message, buttonTitle, url) {
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

const sendCarousel = function(recipientId, elements) {
	callSendAPI({
		recipient: {
			id: recipientId,
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'generic',
					elements: elements,
				},
			},
		},
	});
};

const sendMapMarker = function(recipientId, title, mapImageUrl, lat, lng) {
	callSendAPI({
		recipient: {
			id: recipientId,
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'generic',
					sharable: true,
					image_aspect_ratio: 'square',
					elements: [
						{
							title: '📍 ' + title,
							image_url: mapImageUrl,
							buttons: [
								{
									type: 'web_url',
									title: 'Open in Google Maps',
									url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
									webview_height_ratio: 'full',
								},
								{
									type: 'web_url',
									title: 'Open in Apple Maps',
									url: `https://maps.apple.com/?q=${lat},${lng}`,
									webview_height_ratio: 'full',
								},
							],
						},
					],
				},
			},
		},
	});
};

const sendList = function(recipientId, elements) {
	callSendAPI({
		recipient: {
			id: recipientId,
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'list',
					top_element_style: 'compact',
					elements: elements,
				},
			},
		},
	});
};

const sendNotification = function(recipientId, message) {
	callSendAPI({
		recipient: {
			id: recipientId,
		},
		message: {
			text: message,
		},
		messaging_type: 'MESSAGE_TAG',
		tag: 'CONFIRMED_EVENT_REMINDER',
	});
};

module.exports = {
	sendCarousel,
	sendWebviewButton,
	sendImage,
	sendButtons,
	sendLoginButton,
	sendDebug,
	sendMessage,
	sendNotification,
	sendMapMarker,
	sendList,
};
