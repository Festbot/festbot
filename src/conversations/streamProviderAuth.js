const confirmSelect = function*({ i18n: t }) {
	return {
		message: t`Do you use Spotify, Apple Music or Deezer to stream music?`,
		quickReplies: [
			{
				title: t`Yes` + ' 😎',
				to: '/stream-provider-auth/select'
			},
			{
				title: t`Only vinyl` + ' 🤓',
				to: '/stream-provider-auth/dont-want'
			}
		]
	};
};

const select = function*({ i18n: t }) {
	return {
		message: t`Please select your music streaming provider from the list below:`,
		buttons: [
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
	};
};

const dontWant = function*({ i18n: t }) {
	yield t`Cool. I heard that cassette is the new thing now.` + ' 😉';

	yield t`If you ever change your mind, you can reach this function from the menu.` +
		' 😉';
};

const auth = function*({ i18n: t }, param) {
	switch (param) {
		case 'spotify':
			return {
				message: t`At this point I have to ask you to login using your Spotify account, at which I will retrieve the list of your most listened artists from Spotify.`,
				loginButton:
					'https://eurorack.haveinstock.com:5000/spotify-login?psid=' +
					psid
			};
		case 'deezer':
			return {
				message: t`At this point I have to ask you to login using your Deezer account, at which I will retrieve the list of your most listened artists from Deezer.`,
				loginButton:
					'https://eurorack.haveinstock.com:5000/deezer-login?psid=' +
					psid
			};
	}
};

const notice = function*({ i18n: t }) {
	return (
		t`Btw. if you ever wan\'t me to forget these things about you, just type "forget me" into the chat.` +
		' 😉'
	);
};

const dataReceived = function*(context) {
	const { i18n: t, topArtists = [] } = context;
	return t`Wow! I see you like ${topArtists[0]} and ${topArtists[1]}` + ' 😏';
	notice(context);
};

module.exports = {
	confirmSelect,
	select,
	dontWant,
	auth,
	notice,
	dataReceived
};
