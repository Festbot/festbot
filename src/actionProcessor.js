const FacebookSendApi = require('./apiHelpers/facebook/sendApi');
const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const ConversationContextProvider = require('./conversationContextProvider');
const SpotifyApi = require('./apiHelpers/spotify');
const PoiApi = require('./apiHelpers/festbot/pois');

const {
	SEND_REPLY,
	SEND_QUICK_REPLY,
	SEND_BUTTONS,
	SEND_LOGIN_BUTTON,
	GET_FACEBOOK_DATA,
	GET_SPOTIFY_ARTISTS,
	SET_CONTEXT,
	SEND_WEBVIEW_BUTTON,
	SEND_LOCATION,
	ADD_POI,
} = require('./actionTypes');

async function executeAction({ type, payload }) {
	switch (type) {
		case SEND_WEBVIEW_BUTTON:
			return await FacebookSendApi.sendWebviewButton(
				payload.psid,
				payload.message,
				payload.buttonTitle,
				payload.url
			);
		case SET_CONTEXT:
			return await ConversationContextProvider.set(
				payload.psid,
				payload.context
			);
		case GET_SPOTIFY_ARTISTS:
			return await SpotifyApi.getTopArtists(payload);
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
		case SEND_LOCATION:
			return await FacebookSendApi.sendMessage(
				payload.psid,
				payload.message,
				[{ content_type: 'location' }]
			);
		case ADD_POI:
			return await PoiApi.addPoi(
				payload.festivalId,
				payload.category,
				payload.lat,
				payload.lng
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
		if (yielded.value) {
			result = await executeAction(yielded.value);
		}
	}
};

module.exports = { processAction };
