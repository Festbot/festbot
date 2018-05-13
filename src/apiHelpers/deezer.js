const config = require('config');
const request = require('request');
const querystring = require('querystring');

module.exports.login = function(req, res) {
	res.redirect(
		'https://connect.deezer.com/oauth/auth.php?' +
			querystring.stringify({
				app_id: config.get('deezer.applicationId'),
				redirect_uri: config.get('deezer.callbackUrl'),
				perms: 'basic_access,email',
			})
	);
};

module.exports.callback = function(req, res) {
	const code = req.query.code || null;

	res.sendStatus(200);

	const authOptions = {
		url: 'https://connect.deezer.com/oauth/access_token.php?',
		form: {
			app_id: config.get('deezer.applicationId'),
			secret: config.get('deezer.secretKey'),
			code: code,
			output: 'json'
		},
		json: true
	};

	request.post(authOptions, function(error, response, body) {
		console.log('deezer', querystring.parse(body));
	});
};
