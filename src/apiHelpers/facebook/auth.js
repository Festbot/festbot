const crypto = require('crypto');
const request = require('request-promise');

// App Secret can be retrieved from the App Dashboard
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = process.env.FACEBOOK_VALIDATION_TOKEN;
// // Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

module.exports.authorize = function (req, res) {
	const accountLinkingToken = req.query.account_linking_token;
	const redirectURI = req.query.redirect_uri;

	// Authorization Code should be generated per user by the developer. This will
	// be passed to the Account Linking callback.
	const authCode = '1234567890';

	// Redirect users to this URI on successful login
	const redirectURISuccess = redirectURI + '&authorization_code=' + authCode;

	res.render('authorize', {
		accountLinkingToken: accountLinkingToken,
		redirectURI: redirectURI,
		redirectURISuccess: redirectURISuccess
	});
};

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
module.exports.verifyRequestSignature = function (req, res, buf) {
	const signature = req.headers['x-hub-signature'];

	if (!signature) {
		// For testing, let's log an error. In production, you should throw an
		// error.
		console.error("Couldn't validate the signature.");
	} else {
		const elements = signature.split('=');
		const method = elements[0];
		const signatureHash = elements[1];

		const expectedHash = crypto
			.createHmac('sha1', APP_SECRET)
			.update(buf)
			.digest('hex');

		if (signatureHash != expectedHash) {
			throw new Error("Couldn't validate the request signature.");
		}
	}
};

module.exports.validateWebhook = function (req, res) {
	if (
		req.query['hub.mode'] === 'subscribe' &&
		req.query['hub.verify_token'] === VALIDATION_TOKEN
	) {
		console.log('Validating webhook');
		res.status(200).send(req.query['hub.challenge']);
	} else {
		console.error(
			'Failed validation. Make sure the validation tokens match.'
		);
		res.sendStatus(403);
	}
};
