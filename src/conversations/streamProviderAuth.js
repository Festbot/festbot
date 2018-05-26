const Send = require('../send');
const i18n = require('../i18n');

const StreamProviderAuth = {
	confirmSelect: async function({ psid, locale }) {
		const t = i18n(locale);
		await Send.message(
			psid,
			t`Do you use Spotify, Apple Music or Deezer to stream music?`,
			[
				{
					title: t`Yes` + ' 😎',
					to: '/stream-provider-auth/select'
				},
				{
					title: t`Only vinyl` + ' 🤓',
					to: '/stream-provider-auth/dont-want'
				}
			]
		);
	},

	select: async function({ psid, locale }) {
		const t = i18n(locale);
		await Send.buttons(
			psid,
			t`Please select your music streaming provider from the list below:`,
			[
				{
					title: 'Spotify',
					to: '/stream-provider-auth/auth/spotify'
				},
				{
					title: 'Apple Music',
					to: '/stream-provider-auth/auth/applemusic'
				},
				{
					title: 'Deezer',
					to: '/stream-provider-auth/auth/deezer'
				}
			]
		);
	},

	dontWant: async function(context, router) {
		const { psid, locale } = context;
		const t = i18n(locale);

		await Send.message(
			psid,
			t`Cool. I heard that cassette is the new thing now.` + ' 😉'
		);
		await Send.message(
			psid,
			t`If you ever change your mind, you can reach this function from the menu.` +
				' 😉'
		);

		router('/favorite-genres/random-artist', context);
	},

	auth: async function({ psid, locale }, router, param) {
		const t = i18n(locale);

		switch (param) {
			case 'spotify':
				await Send.loginButton(
					psid,
					t`At this point I have to ask you to login using your Spotify account, at which I will retrieve the list of your most listened artists from Spotify.`,
					'https://eurorack.haveinstock.com:5000/spotify-login?psid=' +
						psid
				);
				break;
			case 'deezer':
				await Send.loginButton(
					psid,
					t`At this point I have to ask you to login using your Deezer account, at which I will retrieve the list of your most listened artists from Deezer.`,
					'https://eurorack.haveinstock.com:5000/deezer-login?psid=' +
						psid
				);
				break;
		}
	},

	dataReceived: async function(context) {
		const { psid, topArtists, locale } = context;
		const t = i18n(locale);
		await Send.message(
			psid,
			t`Wow! I see you like ${topArtists[0]} and ${topArtists[1]}` + ' 😏'
		);
		StreamProviderAuth.notice(context);
	},

	notice: async function({ psid, locale }) {
		await Send.message(
			psid,
			`Btw. if you ever wan\'t me to forget these things about you, just type "forget me" into the chat.` +
				' 😉'
		);
	}
};

module.exports = StreamProviderAuth;
