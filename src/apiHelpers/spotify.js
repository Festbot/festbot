const request = require('request-promise');
const querystring = require('querystring');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
const CALLBACK_URL = 'https://' + process.env.HOST + '/spotify-callback';

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

module.exports.getAccessToken = async function(req, res) {
	const code = req.query.code || null;
	const psid = req.query.state;

	res.sendStatus(200);

	const { access_token, refresh_token } = await request.post({
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
	});

	return {
		accessToken: access_token,
		refreshToken: refresh_token,
		psid: psid
	};
};

module.exports.getInfoAboutMyself = async function(accessToken) {
	return await request.get({
		url: 'https://api.spotify.com/v1/me',
		headers: { Authorization: 'Bearer ' + accessToken },
		json: true
	});
};

module.exports.getTopArtists = async function(accessToken) {
	const data = await request.get({
		url: 'https://api.spotify.com/v1/me/top/artists',
		headers: { Authorization: 'Bearer ' + accessToken },
		json: true
	});
	return data.items.map(artist => artist.name);
};
