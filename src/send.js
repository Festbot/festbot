const FacebookSendApi = require('./apiHelpers/facebook/sendApi');
const i18n = require('./i18n');

module.exports.message = function(
	{ psid, locale },
	message,
	emoji,
	quickReplies
) {
	FacebookSendApi.sendMessage(
		psid,
		i18n(message, locale) + ' ' + emoji,
		quickReplies.map(quickReply => ({
			content_type: 'text',
			payload: quickReply.to,
			title: i18n(quickReply.title, locale) + ' ' + quickReply.emoji
		}))
	);
};
