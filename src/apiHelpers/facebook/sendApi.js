const config = require('config');
const request = require('request-promise');

const PAGE_ACCESS_TOKEN = config.get('pageAccessToken');

const callSendAPI = function(messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: PAGE_ACCESS_TOKEN },
		method: 'POST',
		json: messageData
	}).then(data => {

	}).catch(data => {
		console.log('fb api error: ', data.error.error.message);
	});
};

module.exports.sendMessage = function(recipientId, message) {
	callSendAPI({
		messaging_type: 'RESPONSE',
		recipient: { id: recipientId },
		message: { text: message }
	});
}

module.exports.sendLoginButton = function(recipientId, buttonUrl) {
	callSendAPI({
		recipient: { id: recipientId },
		message: {
			attachment:{
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
