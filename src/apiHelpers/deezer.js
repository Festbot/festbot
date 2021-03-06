const request = require('request-promise');
const querystring = require('querystring');

const login = function(req, res) {
	res.redirect(
		'https://connect.deezer.com/oauth/auth.php?' +
			querystring.stringify({
				app_id: process.env.DEEZER_APP_ID,
				redirect_uri:
					'https://' + process.env.HOST + '/deezer-callback',
				perms: 'basic_access,listening_history,offline_access',
				state: req.query.psid,
			})
	);
};

const getAccessToken = async function(req, res) {
	const code = req.query.code || null;
	const psid = req.query.state;

	res.sendStatus(200);

	const body = await request.post({
		url: 'https://connect.deezer.com/oauth/access_token.php?',
		form: {
			app_id: process.env.DEEZER_APP_ID,
			secret: process.env.DEEZER_APP_SECRET,
			code: code,
			output: 'json',
		},
		json: true,
	});

	return {
		accessToken: querystring.parse(body).access_token,
		psid: psid,
	};
};

const getInfoAboutMyself = async function(accessToken) {
	return await request.get({
		url:
			'https://api.deezer.com/user/me?' +
			querystring.stringify({
				access_token: accessToken,
			}),
		json: true,
	});
};

const getTopArtists = async function(accessToken) {
	const { data } = await request.get({
		url:
			'https://api.deezer.com/user/me/artists?' +
			querystring.stringify({
				access_token: accessToken,
			}),
		json: true,
	});

	return data.map(artist => artist.name);
};

const getTopGenres = async function(accessToken) {
	const { data } = await request.get({
		url:
			'https://api.deezer.com/user/me/artists?' +
			querystring.stringify({
				access_token: accessToken,
			}),
		json: true,
	});

	return data.map(artist => artist.name);
};

module.exports = {
	login,
	getAccessToken,
	getInfoAboutMyself,
	getTopArtists,
	getTopGenres,
};
