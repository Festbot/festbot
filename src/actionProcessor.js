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
	SEND_CAROUSEL,
	ADD_POI,
	GET_POIS,
	GET_VENUES,
	UPDATE_VENUE_LOCATION,
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
			break;
		case SET_CONTEXT:
			return await ConversationContextProvider.set(
				payload.psid,
				payload.context
			);
			break;
		case GET_SPOTIFY_ARTISTS:
			return await SpotifyApi.getTopArtists(payload);
			break;
		case GET_FACEBOOK_DATA:
			return await FacebookGraph.getUserInformation(payload);
			break;
		case SEND_REPLY:
			return await FacebookSendApi.sendMessage(
				payload.psid,
				payload.message
			);
			break;
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
			break;
		case SEND_CAROUSEL:
			return await FacebookSendApi.sendCarousel(
				payload.psid,
				payload.elements.map(element => ({
					image_url: element.imageUrl,
					title: element.title,
					subtitle: element.subtitle,
					default_action: {
						type: 'web_url',
						url: 'https://webview.festbot.com',
						webview_height_ratio: 'tall',
					},
					buttons: element.buttons.map(button => ({
						type: button.url ? 'postback' : 'postback',
						title: button.title,
						payload: button.url,
					})),
				}))
			);
			break;
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
			break;
		case SEND_LOGIN_BUTTON:
			return await FacebookSendApi.sendLoginButton(
				payload.psid,
				payload.message,
				payload.url
			);
			break;
		case SEND_LOCATION:
			return await FacebookSendApi.sendMessage(
				payload.psid,
				payload.message,
				[{ content_type: 'location' }]
			);
			break;
		case ADD_POI:
			return await PoiApi.addPoi(
				payload.festivalId,
				payload.category,
				payload.lat,
				payload.lng
			);
			break;
		case GET_POIS:
			return await PoiApi.getPois(
				payload.festivalId,
				payload.category,
				payload.lat,
				payload.lng
			);
			break;
		case GET_VENUES:
			return await PoiApi.getVenues(payload.festivalId, payload.category);
			break;
		case UPDATE_VENUE_LOCATION:
			return await PoiApi.updateVenueLocation(
				payload.venueId,
				payload.lat,
				payload.lng
			);
			break;
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
