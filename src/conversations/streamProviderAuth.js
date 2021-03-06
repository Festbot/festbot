const {
	sendReply,
	sendQuickReply,
	sendLoginButton,
	sendButtons,
	getSpotifyArtists,
	getSpotifyTopGenres,
	setContext,
	getDeezerArtists,
	getDeezerGenres,
} = require('../actions');
const i18n = require('../i18n');

const confirmSelect = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`Használsz Spotify-t, Apple Music-ot vagy Deezert?`,
		[
			{
				title: t`Igen` + ' 😎',
				to: '/stream-provider-auth/select',
			},
			{
				title: t`Kizárólag bakelitet` + ' 🤓',
				to: '/stream-provider-auth/dont-want',
			},
		],
		psid
	);
};

const select = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendButtons(
		t`Kérlek válaszd ki az alábbi szolgáltatók közül:`,
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
		t`Cool, Hallottam, hogy a magnókazetta lesz az új sztenderd.` + ' 😉',
		psid
	);

	yield sendReply(
		t`Ha estleg meggondolod magad később, a lenti menüben bármikor hozzáadhatod a zenei fiókodat.` +
			' 😉',
		psid
	);
};

const auth = function*({ locale, psid }, param) {
	const t = i18n(locale);

	switch (param) {
		case 'spotify':
			return sendLoginButton(
				t`A hozzáférés engedélyezésével egyszerűen és gyorsan megkapom a legtöbbet hallgatott előadóid listáját. A kérés jóváhagyásához kérlek jelentkezz be a Spotify fiókodba.`,
				`https://${process.env.HOST}/spotify-login?psid=` + psid,
				psid
			);
		case 'deezer':
			return sendLoginButton(
				t`A hozzáférés engedélyezésével egyszerűen és gyorsan megkapom a legtöbbet hallgatott előadóid listáját. A kérés jóváhagyásához kérlek jelentkezz be a Deezer fiókodba.`,
				`https://${process.env.HOST}/deezer-login?psid=` + psid,
				psid
			);
	}
};

const dataReceived = function*({ locale, topArtists = [], psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Wow!, Látom, hogy a ${topArtists[0]} és a ${
			topArtists[1]
		} neked is a kedvenced` + ' 😏',
		psid
	);

	yield sendReply(
		t`Szólni fogok, ha fellépnek valahol a környéken...` + ' 😏',
		psid
	);
};

const spotifyTokenReceived = function*({ psid }, accessToken) {
	const spotifyArtists = yield getSpotifyArtists(accessToken);
	const spotifyGenres = yield getSpotifyTopGenres(accessToken);

	const newContext = yield setContext(psid, {
		spotifyAccessToken: accessToken,
		topArtists: spotifyArtists,
		topGenres: spotifyGenres,
	});

	yield* dataReceived(newContext);
};

const deezerTokenReceived = function*({ psid }, accessToken) {
	const deezerArtists = yield getDeezerArtists(accessToken);

	const newContext = yield setContext(psid, {
		spotifyAccessToken: accessToken,
		topArtists: deezerArtists,
		topGenres: [],
	});

	yield* dataReceived(newContext);
};

const notice = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendReply(
		t`Egyébként, a rólad megismert adatok végleges törlését bármikor kérheted tőlem, csak gépeld be a csevegésbe, hogy "forget me"` +
			' 😉',
		psid
	);
};

module.exports = {
	confirmSelect,
	select,
	dontWant,
	auth,
	notice,
	spotifyTokenReceived,
	deezerTokenReceived,
};
