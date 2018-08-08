const SpotifyApi = require('../apiHelpers/spotify');

const {
	GET_SPOTIFY_ARTISTS,
	GET_SPOTIFY_TOP_GENRES,
} = require('../actionTypes');

const executeAction = async function({ type, payload }) {
	switch (type) {
		case GET_SPOTIFY_ARTISTS:
			return await SpotifyApi.getTopArtists(payload);
		case GET_SPOTIFY_TOP_GENRES:
			return await SpotifyApi.getTopGenres(payload);
	}
};

module.exports = executeAction;
