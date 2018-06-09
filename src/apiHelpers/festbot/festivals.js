const request = require('request-promise');

const ERROR_NOT_FOUND = 'not_found';
const ERROR_CONFLICT = 'conflict';

function generateDefaultUserData() {
	return {
		topArtist: [],
		topGenres: [],
		savedArtists: [],
		savedShows: [],
		activeFestival: null,
		visitedFestivals: [],
	};
}

module.exports.getFestivalData = async function(festivalId) {
	return request.get({
		url: 'https://api.festbot.com/festivals/' + festivalId,
		json: true,
	});
};
