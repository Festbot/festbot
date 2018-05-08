const locales = {
	'hu_HU': require('./locales/hu_HU'),
	'en_US': require('./locales/en_US')
};

module.exports = function i18n(key, locale) {
	if (locales[locale]) {
		if (locales[locale][key]) {
			return locales[locale][key];
		}
	}

	if (locales['en_US'][key]) {
		return locales['en_US'][key];
	}

	return key;
};
