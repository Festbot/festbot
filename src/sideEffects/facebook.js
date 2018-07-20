const FacebookSendApi = require('../apiHelpers/facebook/sendApi');
const FacebookGraph = require('../apiHelpers/facebook/graphApi');
const GoogleMapsApi = require('../apiHelpers/google/maps');

const {
	SEND_REPLY,
	SEND_QUICK_REPLY,
	SEND_BUTTONS,
	SEND_LOGIN_BUTTON,
	GET_FACEBOOK_DATA,
	SEND_WEBVIEW_BUTTON,
	SEND_LOCATION,
	SEND_CAROUSEL,
	SEND_MAP_MARKER,
} = require('../actionTypes');

const executeAction = async function({ type, payload }) {
	switch (type) {
		case SEND_WEBVIEW_BUTTON:
			return await FacebookSendApi.sendWebviewButton(
				payload.psid,
				payload.message,
				payload.buttonTitle,
				payload.url
			);

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
						type: button.url ? 'web_url' : 'postback',
						title: button.title,
						url: button.url,
						payload: button.to,
					})),
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

		case SEND_MAP_MARKER:
			const mapImageUrl = GoogleMapsApi.getStaticMapUrl(
				payload.lat,
				payload.lng
			);
			return await FacebookSendApi.sendMapMarker(
				payload.psid,
				payload.title,
				mapImageUrl,
				payload.lat,
				payload.lng
			);
	}
};

module.exports = executeAction;
