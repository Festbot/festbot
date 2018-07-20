const SpotifyApi = require('../apiHelpers/spotify');

const { GET_SPOTIFY_ARTISTS } = require('../actionTypes');

const executeAction = async function({ type, payload }) {
	switch (type) {
		case GET_SPOTIFY_ARTISTS:
			return await SpotifyApi.getTopArtists(payload);
	}
};

module.exports = executeAction;
