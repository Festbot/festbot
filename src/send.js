const FacebookSendApi = require('./apiHelpers/facebook/sendApi');

module.exports.message = function(psid, message, quickReplies = []) {
	FacebookSendApi.sendMessage(
		psid,
		message,
		quickReplies.map(quickReply => ({
			content_type: 'text',
			payload: quickReply.to,
			title: quickReply.title
		}))
	);
};

module.exports.loginButton = function(psid, message, url) {
	FacebookSendApi.sendLoginButton(psid, message, url);
};

module.exports.buttons = function(psid, message, buttons) {
	FacebookSendApi.sendButtons(
		psid,
		message,
		buttons.map(button => ({
			type: 'postback',
			title: button.title,
			payload: button.to
		}))
	);
};
