const locales = {
	'hu_HU': require('./locales/hu_HU.json')
};

module.exports = function i18n(key, locale) {
	if (locales[locale] && locales[locale][key]) {
		return locales[locale][key];
	}

	return key;
};
