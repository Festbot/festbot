const request = require('request-promise');
const md5 = require('md5');
const { find } = require('./utils');

const ERROR_NOT_FOUND = 'not_found';
const ERROR_CONFLICT = 'conflict';

function generateDefaultUserData() {
	return {
		topArtists: [],
		topGenres: [],
		savedArtists: [],
		savedShows: [],
		activeFestival: null,
		visitedFestivals: [],
		locale: 'en_US',
	};
}

const getUserData = async function(userId) {
	return request.get({
		url: 'https://api.festbot.com/users/' + userId,
		json: true,
	});
};

const addUser = async function(userId) {
	const userData = generateDefaultUserData();

	const options = {
		url: 'https://api.festbot.com/users/' + userId,
		json: userData,
	};

	const response = await request.put(options);

	console.log('adduser', response);

	return {
		...userData,
		_id: response.id,
		_rev: response.rev,
	};
};

const updateUserData = async function(userId, rev, data) {
	const options = {
		url: 'https://api.festbot.com/users/' + userId,
		headers: { 'If-Match': rev },
		json: data,
	};

	return request.put(options);
};

const hashFacebookPSID = function(psid) {
	return md5(psid);
};

const getUsersWithActiveFestival = async function(festivalId) {
	const { docs } = await find(
		'users',
		{
			activeFestival: festivalId,
		},
		1000
	);
	return docs;
};

module.exports = {
	getUsersWithActiveFestival,
	getUserData,
	addUser,
	updateUserData,
	hashFacebookPSID,
};
