const Send = require('../send');
const i18n = require('../i18n');

const languages = [
	{ title: 'Magyar', code: 'hu_HU', emoji: '🇭🇺' },
	{ title: 'English', code: 'en_US', emoji: '🇬🇧🇺🇸' }
];

module.exports = {
	askLanguage: async function({ locale, psid }) {
		const t = i18n(locale);
		Send.message(
			psid,
			t`I know a few languages, which one do you prefer?` + '😎',
			languages.map(language => ({
				title: language.title + ' ' + language.emoji,
				to: '/settings/set-language/' + language.code
			}))
		);
	},

	setLanguage: async function({ locale, psid }, router, param) {
		const t = i18n(locale);
		Send.message(psid, t`Ezt választottad: ` + param + ' 😎');
		return { locale: 'hu_HU' };
	}
};
