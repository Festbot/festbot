const i18n = require('../../i18n');

module.exports = function getPersistentMenu() {
	return ['default', 'en_US', 'hu_HU'].map(locale => {
		const t = i18n(locale);
		return {
			locale: locale,
			composer_input_disabled: false,
			call_to_actions: [
				{
					title: '👨‍🎤  ' + t`At the festival`,
					type: 'nested',
					call_to_actions: [
						{
							title: '💦  ' + t`I need to pee`,
							type: 'postback',
							payload: '/at-the-festival/toilet'
						},
						{
							title: '🍔  ' + t`I'm hungry`,
							type: 'postback',
							payload: '/at-the-festival/food'
						},
						{
							title: '📅  ' + t`My agenda`,
							type: 'postback',
							payload: '/at-the-festival/agenda'
						},
						{
							title: '😜 ' + t`Sobriety test`,
							type: 'postback',
							payload: '/sobriety-test/how-many-drinks'
						}
					]
				},
				{
					title: '🎒 ' + t`Before the festival`,
					type: 'nested',
					call_to_actions: [
						{
							title: '🎧 ' + t`Connect streaming services`,
							type: 'postback',
							payload: '/stream-provider-auth/confirm-select'
						},
						{
							title: '🌍  ' + t`Discover artists`,
							type: 'web_url',
							url: 'https://webview.festbot.com/discover',
							webview_height_ratio: 'full',
							messenger_extensions: true
						},
						{
							title: '🎤  ' + t`Change festival`,
							type: 'web_url',
							url: 'https://webview.festbot.com',
							webview_height_ratio: 'full',
							messenger_extensions: true
						}
					]
				},
				{
					title: '⚙️ ' + t`Settings & Help`,
					type: 'nested',
					call_to_actions: [
						{
							title: '👩‍⚖️  ' + t`Legal stuff`,
							type: 'nested',
							call_to_actions: [
								{
									title: '🇪🇺 ' + t`GDPR`,
									type: 'postback',
									payload: '/legal/gdpr'
								},
								{
									title: '📗 ' + t`Terms of use`,
									type: 'postback',
									payload: '/legal/terms-of-use'
								},
								{
									title:
										'🔒 ' + t`Privacy policy`,
									type: 'postback',
									payload: '/legal/privacy-policy'
								}
							]
						},
						{
							title: '🌐 ' + t`Language`,
							type: 'postback',
							payload: '/settings/ask-language'
						}
					]
				}
			]
		};
	});
};
