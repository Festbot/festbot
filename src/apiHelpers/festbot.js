const config = require('config');
const request = require('request-promise');
const querystring = require('querystring');
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

async function getUserData(userId) {
	return request.get({
		url: 'https://api.festbot.com/users/' + userId,
		json: true
	});
}

async function addUser(userId) {
	const options = {
		url: 'https://api.festbot.com/users/' + userId,
		json: generateDefaultUserData()
	};

	return request.put(options);
}

async function updateUser(userId, rev, data) {
	const options = {
		url: 'https://api.festbot.com/users/' + userId,
		headers: {'If-Match': rev},
		json: data
	}

	return request.put(options);
}

const hashFacebookPSID = function(psid) {
	return md5(psid);
};

module.exports.getUserDataCreateNewIfDoesntExists = async function(psid, userData) {
	const userId = hashFacebookPSID(psid);

	try {
		const userData = await getUserData(userId);
		return userData;
	} catch ({ error }) {
		console.log('error', error);
		await addUser(userId);
		return {
			_id: userId,
			...generateDefaultUserData(),
			gender: userData.gender,
			timezone: userData.timezone,
			locale: userData.locale,
			name: userData.name
		};
	}
};
