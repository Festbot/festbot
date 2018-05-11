const FacebookSend = require('../apiHelpers/facebook/sendApi');
const i18n = require('../i18n');

const languages = [
	{ title: 'Magyar', code: 'hu_HU', emoji: '🇭🇺' },
	{ title: 'English', code: 'en_US', emoji: '🇬🇧🇺🇸' }
];

module.exports = {
	askLanguage: async function({ psid, locale }) {
		FacebookSend.sendMessage(
			psid,
			i18n('I know a few languages, which one do you prefer?') + ' 😎',
			languages.map(language => ({
				title: language.title + ' ' + language.emoji,
				payload: '/settings/set-language/' + language.code
			}))
		);
	},

	setLanguage: async function({ psid, locale }, router, param) {
		FacebookSend.sendMessage(
			psid,
			i18n('Ezt választottad: ' + param) + ' 😎'
		);
		return { locale: 'hu_HU' };
	}
};
