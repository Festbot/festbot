const FacebookSend = require('../apiHelpers/facebook/sendApi');
const FacebookGraph = require('../apiHelpers/facebook/graphApi');
const FestbotApi = require('../apiHelpers/festbot');
const i18n = require('../i18n');

module.exports = {
	getStarted: async function({ name, locale, psid }) {
		await FacebookSend.sendMessage(
			psid,
			i18n(
				'Hey ' +
					name +
					', I’m here to assist you with festival related questions and more.',
				locale
			) + ' 😎'
		);

		await FacebookSend.sendMessage(
			psid,
			i18n("I can't wait to get to know you more!", locale) + ' 😍'
		);

		await FacebookSend.sendMessage(
			psid,
			i18n(
				'Some of my services are based on your musical taste.',
				locale
			) + ' 🧐'
		);

		await FacebookSend.sendMessage(
			psid,
			i18n('I hope you wouldn’t mind if I ask a little bit about you.', locale) +
				' ☺️',
			[
				{
					title: i18n('No problem', locale) + ' ☺️',
					payload: '/stream-provider-auth/confirm-select'
				},
				{
					title: i18n('Maybe later', locale) + ' 🤔',
					payload: '/stream-provider-auth/select-later'
				}
			]
		);
	}
};
