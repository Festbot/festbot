const FacebookSendApi = require('./apiHelpers/facebook/sendApi');
const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const ConversationContextProvider = require('./conversationContextProvider');

const {
	SEND_REPLY,
	SEND_QUICK_REPLY,
	SEND_BUTTONS,
	SEND_LOGIN_BUTTON,
	GET_FACEBOOK_DATA,
} = require('./actionTypes');

async function executeAction({ type, payload }) {
	switch (type) {
		case GET_FACEBOOK_DATA:
			return await FacebookGraph.getUserInformation(payload);
		case SEND_REPLY:
			return await FacebookSendApi.sendMessage(
				payload.psid,
				payload.message
			);
		case SEND_QUICK_REPLY:
			return await FacebookSendApi.sendMessage(
				payload.psid,
				payload.message,
				payload.quickReplies.map(quickReply => ({
					content_type: 'text',
					payload: quickReply.to,
					title: quickReply.title,
				}))
			);
		case SEND_BUTTONS:
			return await FacebookSendApi.sendButtons(
				payload.psid,
				payload.message,
				payload.buttons.map(button => ({
					type: 'postback',
					title: button.title,
					payload: button.to,
				}))
			);
		case SEND_LOGIN_BUTTON:
			return await FacebookSendApi.sendLoginButton(
				payload.psid,
				payload.message,
				payload.url
			);
	}
}

const processAction = async function(conversation, param, psid) {
	const context = await ConversationContextProvider.get(psid);

	const generator = conversation(context, param);
	let done;
	let result;
	while (!done) {
		const yielded = generator.next(result);
		result = undefined;
		done = yielded.done;
		result = await executeAction(yielded.value);
	}
};

module.exports = { processAction };
