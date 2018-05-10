const FacebookSend = require('../apiHelpers/facebook/sendApi');
const i18n = require('../i18n');

const StreamProviderAuth = {
	confirmSelect: async function({ psid, locale }) {
		await FacebookSend.sendMessage(
			psid,
			i18n(
				'Do you use Spotify, Apple Music or Deezer to stream music?',
				locale
			),
			[
				{
					title: i18n('Yes', locale) + ' 😎',
					payload: '/stream-provider-auth/select'
				},
				{
					title: i18n('Only vinyl', locale) + ' 🤓',
					payload: '/stream-provider-auth/dont-want'
				}
			]
		);
	},

	select: async function({ psid, locale }) {
		await FacebookSend.sendButtons(
			psid,
			i18n(
				'Please select your music streaming provider from the list below:',
				locale
			),
			[
				{
					type: 'postback',
					title: 'Spotify',
					payload: '/stream-provider-auth/spotify'
				},
				{
					type: 'postback',
					title: 'Apple Music',
					payload: '/stream-provider-auth/applemusic'
				},
				{
					type: 'postback',
					title: 'Deezer',
					payload: '/stream-provider-auth/deezer'
				}
			]
		);
	},

	dontWant: async function({ psid, locale }) {
		await FacebookSend.sendMessage(
			psid,
			i18n('Cool. I heard that cassette is the new thing now.', locale) +
				' 😉'
		);
		await FacebookSend.sendMessage(
			psid,
			i18n(
				'If you ever change your mind, you can reach this function from the menu.',
				locale
			) + ' 😉'
		);
	},

	spotify: async function({ psid, locale }) {
		await FacebookSend.sendLoginButton(
			psid,
			i18n(
				'At this point I have to ask you to login using your Spotify account, at which I will retrieve the list of your most listened artists from Spotify.',
				locale
			),
			'https://eurorack.haveinstock.com:5000/spotify-login?psid=' + psid
		);
	},

	dataReceived: async function({ psid, topArtists, locale }) {
		await FacebookSend.sendMessage(
			psid,
			i18n(
				'Wow! I see you like ' +
					topArtists[0] +
					' and ' +
					topArtists[1] +
					' 😏',
				locale
			)
		);

		StreamProviderAuth.notice({ psid, locale });
	},

	notice: async function({ psid, locale }) {
		await FacebookSend.sendMessage(
			psid,
			i18n(
				'Btw. if you ever wan\'t me to forget these things about you, just type "forget me" into the chat. 😉'
			)
		);
	}
};

module.exports = StreamProviderAuth;
