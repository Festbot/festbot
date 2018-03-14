const config = require('config');
const request = require('request');
const querystring = require('querystring');

const CLIENT_ID = config.get('spotify.clientId');
const CLIENT_SECRET = config.get('spotify.clientSecret');
const CALLBACK_URL = config.get('spotify.callbackUrl');

var state = '';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

module.exports.login = function(req, res) {
	state = generateRandomString(16);

	res.redirect('https://accounts.spotify.com/authorize?' +
		querystring.stringify({
			'response_type': 'code',
			'client_id': CLIENT_ID,
			'scope': 'user-read-private user-read-email user-top-read',
			'redirect_uri': CALLBACK_URL,
			'state': state
		}));
};

module.exports.callback = function(req, res) {
	const code = req.query.code || null;

	res.sendStatus(200);

	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: code,
			redirect_uri: CALLBACK_URL,
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
		},
		json: true
	};

	return new Promise((resolve, reject) => {
		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				resolve({
					accessToken: body.access_token,
					refreshToken: body.refresh_token
				});
			}
			else {
				reject();
			}
		});
	});
}

module.exports.getInfoAboutMyself = function(accessToken) {
	const options = {
		url: 'https://api.spotify.com/v1/me',
		headers: { 'Authorization': 'Bearer ' + accessToken },
		json: true
	};

	return new Promise((resolve, reject) => {
		request.get(options, function(error, response, body) {
			resolve(body);
		});
	});
}

module.exports.getTopArtists = function(accessToken) {
	const options = {
		url: 'https://api.spotify.com/v1/me/top/artists',
		headers: { 'Authorization': 'Bearer ' + accessToken },
		json: true
	};

	return new Promise((resolve, reject) => {
		request.get(options, function(error, response, body) {
			resolve(body);
		});
	});
}
