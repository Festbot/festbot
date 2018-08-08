const {
	SLEEP,
	SEND_REPLY,
	SET_CONTEXT,
	SEND_QUICK_REPLY,
	SEND_CAROUSEL,
	SEND_BUTTONS,
	SEND_LOGIN_BUTTON,
	GET_FACEBOOK_DATA,
	GET_SPOTIFY_ARTISTS,
	GET_SPOTIFY_TOP_GENRES,
	SEND_WEBVIEW_BUTTON,
	SEND_LOCATION,
	ADD_POI,
	GET_POIS,
	GET_VENUES,
	UPDATE_VENUE_LOCATION,
	GET_AGENDA,
	SEND_MAP_MARKER,
	GET_DEEZER_ARTISTS,
	GET_DEEZER_GENRES,
	GET_VENUE_LOCATION,
} = require('./actionTypes');

const sleep = timeout => ({
	type: SLEEP,
	payload: { timeout },
});

const sendReply = (message, psid) => ({
	type: SEND_REPLY,
	payload: { message, psid },
});

const sendQuickReply = (message, quickReplies, psid) => ({
	type: SEND_QUICK_REPLY,
	payload: { message, quickReplies, psid },
});

const sendCarousel = (elements, psid) => ({
	type: SEND_CAROUSEL,
	payload: { elements, psid },
});

const sendButtons = (message, buttons, psid) => ({
	type: SEND_BUTTONS,
	payload: { message, buttons, psid },
});

const sendLoginButton = (message, url, psid) => ({
	type: SEND_LOGIN_BUTTON,
	payload: { message, url, psid },
});

const sendWebViewButton = (message, buttonTitle, url, psid) => ({
	type: SEND_WEBVIEW_BUTTON,
	payload: { message, buttonTitle, url, psid },
});

const setContext = (psid, context) => ({
	type: SET_CONTEXT,
	payload: { psid, context },
});

const sendLocation = (message, psid) => ({
	type: SEND_LOCATION,
	payload: { message, psid },
});

const getFacebookData = psid => ({ type: GET_FACEBOOK_DATA, payload: psid });

const getSpotifyArtists = accessToken => ({
	type: GET_SPOTIFY_ARTISTS,
	payload: accessToken,
});

const getSpotifyTopGenres = accessToken => ({
	type: GET_SPOTIFY_TOP_GENRES,
	payload: accessToken,
});

const getDeezerArtists = accessToken => ({
	type: GET_DEEZER_ARTISTS,
	payload: accessToken,
});

const getDeezerGenres = accessToken => ({
	type: GET_DEEZER_GENRES,
	payload: accessToken,
});

const addPoi = (festivalId, category, lat, lng) => ({
	type: ADD_POI,
	payload: { festivalId, category, lat, lng },
});

const getPois = (festivalId, category, lat, lng) => ({
	type: GET_POIS,
	payload: { festivalId, category, lat, lng },
});

const getVenues = (festivalId, category) => ({
	type: GET_VENUES,
	payload: { festivalId, category },
});

const updateVenueLocation = (venueId, lat, lng) => ({
	type: UPDATE_VENUE_LOCATION,
	payload: { venueId, lat, lng },
});

const getAgenda = psid => ({
	type: GET_AGENDA,
	payload: { psid },
});

const sendMapMarker = (title, lat, lng, psid) => ({
	type: SEND_MAP_MARKER,
	payload: {
		title,
		lat,
		lng,
		psid,
	},
});

const getVenueLocation = venueId => ({
	type: GET_VENUE_LOCATION,
	payload: { venueId },
});

module.exports = {
	sleep,
	sendReply,
	setContext,
	sendQuickReply,
	sendButtons,
	sendCarousel,
	sendLoginButton,
	sendLocation,
	sendWebViewButton,
	getFacebookData,
	getSpotifyArtists,
	getSpotifyTopGenres,
	getDeezerArtists,
	getDeezerGenres,
	addPoi,
	getPois,
	getVenues,
	getVenueLocation,
	updateVenueLocation,
	getAgenda,
	sendMapMarker,
};
