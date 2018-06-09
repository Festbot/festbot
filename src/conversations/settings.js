const { sendReply, sendQuickReply } = require('../actions');
const i18n = require('../i18n');

const languages = [
	{ title: 'Magyar', code: 'hu_HU', emoji: '🇭🇺' },
	{ title: 'English', code: 'en_US', emoji: '🇬🇧🇺🇸' },
];

const askLanguage = function*({ locale, psid }) {
	const t = i18n(locale);
	return sendQuickReply(
		t`I know a few languages, which one do you prefer?` + '😎',
		languages.map(language => ({
			title: language.title + ' ' + language.emoji,
			to: '/settings/set-language/' + language.code,
		})),
		psid
	);
};

const setLanguage = function*({ locale, psid }, router, param) {
	const t = i18n(locale);
	return sendReply(
		{
			message: t`Ezt választottad: ` + param + ' 😎',
			newContext: { ...arguments[0], locale: 'hu_HU' },
		},
		psid
	);
};

module.exports = { askLanguage, setLanguage };
