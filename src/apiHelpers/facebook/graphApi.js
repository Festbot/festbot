const request = require('request-promise');
const { getPersistentMenu } = require('../../config/persistentMenu');
const getGreetings = require('./greetings');

const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

module.exports.getUserInformation = async function(psid) {
	return await request({
		uri: 'https://graph.facebook.com/v3.0/' + psid,
		qs: {
			fields: 'first_name,last_name,locale,timezone',
			access_token: PAGE_ACCESS_TOKEN,
		},
		method: 'GET',
		json: true,
	});
};

module.exports.setUpMessengerProfile = async function() {
	try {
		const response = await request({
			uri: 'https://graph.facebook.com/v3.0/me/messenger_profile',
			qs: { access_token: PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: {
				whitelisted_domains: [
					'https://chatbot.festbot.com',
					'https://api.festbot.com',
					'https://webview.festbot.com',
					'https://festbot.com',
				],
				greeting: getGreetings(),
				get_started: {
					payload: '/get-started',
				},
				persistent_menu: getPersistentMenu(),
			},
		});
		console.log(response);
	} catch (e) {
		console.log('fb api error: ', e);
	}
};
