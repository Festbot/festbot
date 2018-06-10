const {
	sendReply,
	sendQuickReply,
	sendLoginButton,
	sendButtons,
	getSpotifyArtists,
} = require('../actions');
const i18n = require('../i18n');

const confirmSelect = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`Do you use Spotify, Apple Music or Deezer to stream music?`,
		[
			{
				title: t`Yes` + ' 😎',
				to: '/stream-provider-auth/select',
			},
			{
				title: t`Only vinyl` + ' 🤓',
				to: '/stream-provider-auth/dont-want',
			},
		],
		psid
	);
};

const select = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendButtons(
		t`Please select your music streaming provider from the list below:`,
		[
			{
				title: 'Spotify',
				to: '/stream-provider-auth/auth/spotify',
			},
			{
				title: 'Deezer',
				to: '/stream-provider-auth/auth/deezer',
			},
		],
		psid
	);
};

const dontWant = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Cool. I heard that cassette is the new thing now.` + ' 😉',
		psid
	);

	yield sendReply(
		t`If you ever change your mind, you can reach this function from the menu.` +
			' 😉',
		psid
	);
};

const auth = function*({ locale, psid }, param) {
	const t = i18n(locale);

	switch (param) {
		case 'spotify':
			return sendLoginButton(
				t`At this point I have to ask you to login using your Spotify account, at which I will retrieve the list of your most listened artists from Spotify.`,
				`https://${process.env.HOST}/spotify-login?psid=` + psid,
				psid
			);
		case 'deezer':
			return sendLoginButton(
				t`At this point I have to ask you to login using your Deezer account, at which I will retrieve the list of your most listened artists from Deezer.`,
				`https://${process.env.HOST}/deezer-login?psid=` + psid,
				psid
			);
	}
};

const spotifyTokenReceived = function*({ locale, psid }, accessToken) {
	const t = i18n(locale);
	const spotifyArtists = yield getSpotifyArtists(accessToken);

	const newContext = yield setContext(psid, {
		spotifyAccessToken: accessToken,
		topArtists: spotifyArtists,
		topGenres: ['pinarock'],
	});

	return sendReply(
		t`Wow! I see you like ${spotifyArtists[0]} and ${spotifyArtists[1]}` +
			' 😏',
		psid
	);
};

const notice = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendReply(
		t`Btw. if you ever wan\'t me to forget these things about you, just type "forget me" into the chat.` +
			' 😉',
		psid
	);
};

const dataReceived = function*({ locale, topArtists = [], psid }) {
	const t = i18n(locale);

	return sendReply(
		t`Wow! I see you like ${topArtists[0]} and ${topArtists[1]}` + ' 😏',
		psid
	);
};

module.exports = {
	confirmSelect,
	select,
	dontWant,
	auth,
	notice,
	dataReceived,
	spotifyTokenReceived,
};
