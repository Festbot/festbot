const config = require('config');
const request = require('request-promise');
const getPersistentMenu = require('./persistentMenu');
const getGreetings = require('./greetings');

const PAGE_ACCESS_TOKEN = config.get('pageAccessToken');

module.exports.getUserInformation = async function(psid) {
	const userData = await request({
		uri: 'https://graph.facebook.com/v2.6/' + psid,
		qs: {
			fields: 'first_name,locale,timezone,gender',
			access_token: PAGE_ACCESS_TOKEN
		},
		method: 'GET',
		json: true
	});

	return {
		gender: userData.gender,
		name: userData.first_name,
		locale: userData.locale,
		timezone: userData.timezone
	}
};

module.exports.setUpMessengerProfile = async function() {
	try {
		const response = await request({
			uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
			qs: { access_token: PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: {
				whitelisted_domains: [
					'https://chatbot.festbot.com',
					'https://api.festbot.com'
				],
				greeting: getGreetings(),
				get_started: {
					payload: 'getStarted'
				},
				persistent_menu: getPersistentMenu()
			}
		});
		console.log(response);
	} catch (e) {
		console.log('fb api error: ', e);
	}
};
