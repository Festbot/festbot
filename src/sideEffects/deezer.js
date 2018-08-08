const SpotifyApi = require('../apiHelpers/deezer');

const { GET_DEEZER_ARTISTS, GET_DEEZER_GENRES } = require('../actionTypes');

const executeAction = async function({ type, payload }) {
	switch (type) {
		case GET_DEEZER_ARTISTS:
			return await DeezerApi.getTopArtists(payload);
		case GET_DEEZER_GENRES:
			return await DeezerApi.getTopGenres(payload);
	}
};

module.exports = executeAction;
