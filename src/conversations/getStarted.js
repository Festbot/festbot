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
			i18n('I am so excited to getting know you better.', locale) + ' 😍'
		);

		await FacebookSend.sendMessage(
			psid,
			i18n(
				'Some of my services are based on your personal musical taste.',
				locale
			) + ' 🧐'
		);

		await FacebookSend.sendMessage(
			psid,
			i18n('Wouldn’t mind if I ask you little bit about you? ☺️', locale),
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
