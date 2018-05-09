const FacebookSend = require('../apiHelpers/facebook/sendApi');

module.exports = {
	confirmSelect: async function({ psid }) {
		await FacebookSend.sendMessage(
			psid,
			'Do you use Spotify, Apple Music or Deezer to stream music?',
			[
				{ title: 'Yes 😎', payload: '/stream-provider-auth/select' },
				{
					title: 'Only vinyl 🤓',
					payload: '/stream-provider-auth/select-later'
				}
			]
		);
	},

	select: async function({ psid }) {
		await FacebookSend.sendButtons(
			psid,
			'Please select your music streaming provider from the list:',
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

	selectLater: async function({ psid }) {
		await FacebookSend.sendMessage(psid, 'Okay, we can do it any time. 😉');
	},

	spotify: async function({ psid }) {
		await FacebookSend.sendLoginButton(
			psid,
			'Tap the login button to connect your Spotify account!',
			'https://eurorack.haveinstock.com:5000/spotify-login?psid=' + psid
		);
	}
};
