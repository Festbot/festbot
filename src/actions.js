const {
	SEND_REPLY,
	SET_CONTEXT,
	SEND_QUICK_REPLY,
	SEND_BUTTONS,
	SEND_LOGIN_BUTTON,
	GET_FACEBOOK_DATA,
	GET_SPOTIFY_ARTISTS,
} = require('./actionTypes');

const sendReply = (message, psid) => ({
	type: SEND_REPLY,
	payload: { message, psid },
});

const sendQuickReply = (message, quickReplies, psid) => ({
	type: SEND_QUICK_REPLY,
	payload: { message, quickReplies, psid },
});

const sendButtons = (message, buttons, psid) => ({
	type: SEND_BUTTONS,
	payload: { message, buttons, psid },
});

const sendLoginButton = (message, url, psid) => ({
	type: SEND_LOGIN_BUTTON,
	payload: { message, url, psid },
});

const setContext = payload => ({ type: SET_CONTEXT, payload });

const getFacebookData = psid => ({ type: GET_FACEBOOK_DATA, payload: psid });

const getSpotifyArtists = accessToken => ({
	type: GET_SPOTIFY_ARTISTS,
	payload: accessToken,
});

module.exports = {
	sendReply,
	setContext,
	sendQuickReply,
	sendButtons,
	sendLoginButton,
	getFacebookData,
	getSpotifyArtists,
};
