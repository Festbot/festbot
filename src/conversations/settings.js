const Send = require('../send');
const i18n = require('../i18n');

const languages = [
	{ title: 'Magyar', code: 'hu_HU', emoji: '🇭🇺' },
	{ title: 'English', code: 'en_US', emoji: '🇬🇧🇺🇸' },
];

const askLanguage = function*({ i18n: t }) {
	return {
		message: t`I know a few languages, which one do you prefer?` + '😎',
		quickReplies: languages.map(language => ({
			title: language.title + ' ' + language.emoji,
			to: '/settings/set-language/' + language.code,
		})),
	};
};

const setLanguage = function*(context, router, param) {
	const { i18n: t } = context;
	return {
		message: t`Ezt választottad: ` + param + ' 😎',
		newContext: { ...context, locale: 'hu_HU' },
	};
};

module.exports = { askLanguage, setLanguage };
