const locales = {
	hu_HU: require('./locales/hu_HU')
};

const i18n = function i18n(locale) {
	const translations = locales[locale];
	return function(strings, ...keys) {
		const key = i18n.buildKey(strings);

		if (translations && translations[key]) {
			return i18n.replaceKeys(translations[key], keys);
		}
		return i18n.replaceKeys(key, keys);
	};
};

i18n.buildKey = function(strings) {
	let string = '';
	for (let i = 1; i < strings.length; i++) {
		string += `{${i}}${strings[i]}`;
	}
	return strings[0] + string;
};

i18n.replaceKeys = function(translation, keys) {
	let replaced = translation;
	for (let i = 0; i < keys.length; i++) {
		replaced = replaced.replace(`{${i + 1}}`, keys[i]);
	}
	return replaced;
};

module.exports = i18n;
