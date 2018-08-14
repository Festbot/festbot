const i18n = require('../i18n');
const { version } = require('../../package.json');

const getPersistentMenu = function() {
	return ['default', 'en_US', 'hu_HU'].map(locale => {
		const t = i18n(locale);
		return {
			locale: locale,
			composer_input_disabled: true,
			call_to_actions: [
				{
					title: '🔍  ' + t`Keresés...`,
					type: 'nested',
					call_to_actions: [
						{
							title: '🥃 ' + t`Innék valamit`,
							type: 'postback',
							payload: '/get-poi/get-bar',
						},
						{
							title: '🍔 ' + t`Éhes vagyok`,
							type: 'postback',
							payload: '/get-poi/get-food',
						},
						{
							title: 'ℹ️ ' + t`Mutasd a többit`,
							type: 'postback',
							payload: '/get-poi/get-poi',
						},
						{
							title: '😜 ' + t`Alkohol teszt`,
							type: 'postback',
							payload: '/sobriety-test/how-many-drinks',
						},
					],
				},
				{
					title: '🎒 ' + t`Fesztiválok és programok`,
					type: 'nested',
					call_to_actions: [
						{
							title: '➕ ' + t`Fesztivál aktiválás`,
							type: 'web_url',
							url: 'https://webview.festbot.com',
							webview_height_ratio: 'tall',
							messenger_extensions: true,
						},
						{
							title: '⭐  ' + t`Fesztiválok, programok`,
							type: 'web_url',
							url: 'https://webview.festbot.com/festivals',
							webview_height_ratio: 'tall',
							messenger_extensions: true,
						},
						{
							title: '🎤  ' + t`Előadók szerint`,
							type: 'web_url',
							url: 'https://webview.festbot.com/discover',
							webview_height_ratio: 'tall',
							messenger_extensions: true,
						},
						{
							title: '🗺️ ' + t`Fesztivál navigátor`,
							type: 'web_url',
							url: 'https://webview.festbot.com/navigator',
							webview_height_ratio: 'tall',
							messenger_extensions: true,
						},
					],
				},
				{
					title: '⚙️ ' + t`Beállítások és segítség`,
					type: 'nested',
					call_to_actions: [
						{
							title: '🎧 ' + t`Fiók hozzáadása`,
							type: 'postback',
							payload: '/stream-provider-auth/confirm-select',
						},
						{
							title: '🔒 ' + t`Adatvédelem`,
							type: 'nested',
							call_to_actions: [
								//{
								//	title: '🇪🇺 ' + t`GDPR`,
								//	type: 'postback',
								//	payload: '/legal/gdpr',
								//},
								{
									title: '👩‍⚖️ ' + t`Adatkezelés`,
									type: 'web_url',
									url: 'https://festbot.com/privacy',
									webview_height_ratio: 'tall',
									messenger_extensions: false,
								},
							],
						},
						{
							title: '🌐 ' + t`Nyelv`,
							type: 'postback',
							payload: '/settings/ask-language',
						},
						{
							title:
								'🐻 ' +
								t`Rólam` +
								` (v${version})`,
							type: 'postback',
							payload: '/get-started/about-me',
						},
					],
				},
			],
		};
	});
};

const getLocalizedMenu = function(locale) {
	const menu = getPersistentMenu().filter(menu => menu.locale === locale);

	if (menu.length === 0) {
		return getPersistentMenu()[0];
	}

	return menu[0];
};

module.exports = { getPersistentMenu, getLocalizedMenu };
