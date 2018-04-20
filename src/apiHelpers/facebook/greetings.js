const i18n = require('../../i18n');

module.exports = function getGreetings() {
	return ['default', 'en_US', 'hu_HU'].map((locale) => ({
		locale: locale,
		text: i18n('Hello!', locale)
	}));
};
