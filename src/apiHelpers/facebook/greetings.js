const i18n = require('../../i18n');

module.exports = function getGreetings() {
	return ['default', 'en_US', 'hu_HU'].map(locale => ({
		locale: locale,
		text: i18n(
			"Hello {{user_first_name}}! \nI'm here to help you plan your next festival visit, discover new artists, and meet new people.",
			locale
		)
	}));
};
