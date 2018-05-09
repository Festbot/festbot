const config = require('config');
const request = require('request');
const querystring = require('querystring');

const CLIENT_ID = config.get('spotify.clientId');
const CLIENT_SECRET = config.get('spotify.clientSecret');
const CALLBACK_URL = config.get('spotify.callbackUrl');

module.exports.login = function(req, res) {
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: CLIENT_ID,
				scope: 'user-read-private user-read-email user-top-read',
				redirect_uri: CALLBACK_URL,
				state: req.query.psid
			})
	);
};

module.exports.callback = function(req, res) {
	const code = req.query.code || null;
	const psid = req.query.state;

	res.sendStatus(200);

	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: code,
			redirect_uri: CALLBACK_URL,
			grant_type: 'authorization_code'
		},
		headers: {
			Authorization:
				'Basic ' +
				new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
		},
		json: true
	};

	return new Promise((resolve, reject) => {
		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				resolve({
					accessToken: body.access_token,
					refreshToken: body.refresh_token,
					psid: psid
				});
			} else {
				reject();
			}
		});
	});
};

module.exports.getInfoAboutMyself = function(accessToken) {
	const options = {
		url: 'https://api.spotify.com/v1/me',
		headers: { Authorization: 'Bearer ' + accessToken },
		json: true
	};

	return new Promise((resolve, reject) => {
		request.get(options, function(error, response, body) {
			resolve(body);
		});
	});
};

module.exports.getTopArtists = function(accessToken) {
	const options = {
		url: 'https://api.spotify.com/v1/me/top/artists',
		headers: { Authorization: 'Bearer ' + accessToken },
		json: true
	};

	return new Promise((resolve, reject) => {
		request.get(options, function(error, response, body) {
			resolve(body);
		});
	});
};
