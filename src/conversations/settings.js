const { sendReply, sendQuickReply, setContext } = require('../actions');
const i18n = require('../i18n');

const languages = [
	{ title: 'Magyar', code: 'hu_HU', emoji: '🇭🇺' },
	{ title: 'English', code: 'en_US', emoji: '🇬🇧🇺🇸' },
];

const askLanguage = function*({ locale, psid }) {
	const t = i18n(locale);
	return sendQuickReply(
		t`Quelle langue parlez-vous?` + '😎',
		languages.map(language => ({
			title: language.title + ' ' + language.emoji,
			to: '/settings/set-language/' + language.code,
		})),
		psid
	);
};

const setLanguage = function*({ psid }, locale) {
	yield setContext(psid, {
		locale: locale,
	});

	switch (locale) {
		case 'hu_HU':
			yield sendReply('Oh, szia! Amúgy én is magyar vagyok. 😎', psid);
			break;
		case 'en_US':
			yield sendReply('Oh, hi there! 👋`', psid);
			break;
	}
};

module.exports = { askLanguage, setLanguage };
