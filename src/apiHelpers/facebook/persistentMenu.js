const i18n = require('../../i18n');

module.exports = function getPersistentMenu() {
	return ['default', 'en_US', 'hu_HU'].map((locale) => (
		{
			locale: locale,
			composer_input_disabled: false,
			call_to_actions: [
				{
					title: '👨‍🎤  ' + i18n('At the festival', locale),
					type: 'nested',
					call_to_actions: [
						{
							title: '💦  ' + i18n('I need to pee', locale),
							type: 'postback',
							payload: ''
						},
						{
							title: '🍔  ' + i18n('I\'m hungry', locale),
							type: 'postback',
							payload: ''
						},
						{
							title: '📅  ' + i18n('My agenda', locale),
							type: 'postback',
							payload: ''
						}
					]
				},
				{
					title: '🌍  ' + i18n('Discover artists', locale),
					type: 'web_url',
					url: 'https://messenger.com',
					webview_height_ratio: 'full',
					messenger_extensions: false
				},
				{
					title: '🎤  ' + i18n('Change festival', locale),
					type: 'web_url',
					url: 'https://messenger.com',
					webview_height_ratio: 'full',
					messenger_extensions: false
				}
			]
		}
	));
};
