const request = require('request-promise');
const md5 = require('md5');

const ERROR_NOT_FOUND = 'not_found';
const ERROR_CONFLICT = 'conflict';

function generateDefaultUserData() {
	return {
		topArtist: [],
		topGenres: [],
		savedArtists: [],
		savedShows: [],
		activeFestival: null,
		visitedFestivals: []
	};
}

module.exports.getUserData = async function (userId) {
	return request.get({
		url: 'https://api.festbot.com/users/' + userId,
		json: true
	});
};

module.exports.addUser = async function (userId) {
	const userData = generateDefaultUserData();

	const options = {
		url: 'https://api.festbot.com/users/' + userId,
		json: userData
	};

	const response = await request.put(options);

	console.log('adduser', response);

	return {
		...userData,
		_id: response.id,
		_rev: response.rev
	};
};

module.exports.updateUserData = async function (userId, rev, data) {
	const options = {
		url: 'https://api.festbot.com/users/' + userId,
		headers: { 'If-Match': rev },
		json: data
	};

	return request.put(options);
};

module.exports.hashFacebookPSID = function (psid) {
	return md5(psid);
};
