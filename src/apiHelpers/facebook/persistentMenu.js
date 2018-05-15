const i18n = require('../../i18n');

module.exports = function getPersistentMenu() {
	return ['default', 'en_US', 'hu_HU'].map(locale => ({
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
						payload: '/at-the-festival/toilet'
					},
					{
						title: '🍔  ' + i18n("I'm hungry", locale),
						type: 'postback',
						payload: '/at-the-festival/food'
					},
					{
						title: '📅  ' + i18n('My agenda', locale),
						type: 'postback',
						payload: '/at-the-festival/agenda'
					},
					{
						title: '😜 ' + i18n('Sobriety test', locale),
						type: 'postback',
						payload: '/sobriety-test/how-many-drinks'
					}
				]
			},
			{
				title: '🎒 ' + i18n('Before the festival', locale),
				type: 'nested',
				call_to_actions: [
					{
						title:
							'🎧 ' + i18n('Connect streaming services', locale),
						type: 'postback',
						payload: '/stream-provider-auth/confirm-select'
					},
					{
						title: '🌍  ' + i18n('Discover artists', locale),
						type: 'web_url',
						url: 'https://chatbot.festbot.com/discover',
						webview_height_ratio: 'full',
						messenger_extensions: true
					},
					{
						title: '🎤  ' + i18n('Change festival', locale),
						type: 'web_url',
						url: 'https://chatbot.festbot.com',
						webview_height_ratio: 'full',
						messenger_extensions: true
					}
				]
			},
			{
				title: '⚙️ ' + i18n('Settings & Help', locale),
				type: 'nested',
				call_to_actions: [
					{
						title: '👩‍⚖️  ' + i18n('Legal stuff', locale),
						type: 'nested',
						call_to_actions: [
							{
								title: '🇪🇺 ' + i18n('GDPR', locale),
								type: 'postback',
								payload: '/legal/gdpr'
							},
							{
								title: '📗 ' + i18n('Terms of use', locale),
								type: 'postback',
								payload: '/legal/terms-of-use'
							},
							{
								title: '🔒 ' + i18n('Privacy policy', locale),
								type: 'postback',
								payload: '/legal/privacy-policy'
							}
						]
					},
					{
						title: '🌐 ' + i18n('Language', locale),
						type: 'postback',
						payload: '/settings/ask-language'
					}
				]
			}
		]
	}));
};
