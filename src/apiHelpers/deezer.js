const config = require('config');
const request = require('request-promise');
const querystring = require('querystring');

module.exports.login = function(req, res) {
	res.redirect(
		'https://connect.deezer.com/oauth/auth.php?' +
			querystring.stringify({
				app_id: config.get('deezer.applicationId'),
				redirect_uri: config.get('deezer.callbackUrl'),
				perms: 'basic_access,listening_history,offline_access',
				state: req.query.psid
			})
	);
};

module.exports.getAccessToken = async function(req, res) {
	const code = req.query.code || null;
	const psid = req.query.state;

	res.sendStatus(200);

	const body = await request.post({
		url: 'https://connect.deezer.com/oauth/access_token.php?',
		form: {
			app_id: config.get('deezer.applicationId'),
			secret: config.get('deezer.secretKey'),
			code: code,
			output: 'json'
		},
		json: true
	});

	return {
		accessToken: querystring.parse(body).access_token,
		psid: psid
	};
};

module.exports.getInfoAboutMyself = async function(accessToken) {
	return await request.get({
		url:
			'https://api.deezer.com/user/me?' +
			querystring.stringify({
				access_token: accessToken
			}),
		json: true
	});
};

module.exports.getTopArtists = async function(accessToken) {
	const {data} = await request.get({
		url:
			'https://api.deezer.com/user/me/artists?' +
			querystring.stringify({
				access_token: accessToken
			}),
		json: true
	});

	return data.map(artist => artist.name);
};
