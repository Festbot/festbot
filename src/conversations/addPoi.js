const {
	sendReply,
	sendLocation,
	sendQuickReply,
	addPoi: addPoiToDb,
	setContext,
} = require('../actions');
const i18n = require('../i18n');

const noActiveFestival = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Nekem nem is írtad, hogy melyik fesztiválon vagy...` + ' 🤷‍',
		psid
	);
	yield sendWebViewButton(
		t`Válaszd ki erről a listáról, aztán próbáld újra!` + ' 😎',
		t`Fesztiválok böngészése`,
		'https://webview.festbot.com',
		psid
	);
};

const addPoi = function*({ locale, psid, activeFestival }) {
	const t = i18n(locale);

	if (!activeFestival) {
		yield* noActiveFestival();
		return;
	}

	yield sendQuickReply(
		t`Mit szeretnél hozzáadni` + ' 📍',
		[
			{
				title: t`Színpad` + ' 😎',
				to: '/add-poi/request-location/stage',
			},
			{
				title: t`Toalett` + ' 🚻',
				to: '/add-poi/request-location/wc',
			},
			{
				title: t`Kemping` + ' ⛺⛺⛺',
				to: '/add-poi/request-location/camping',
			},
			{
				title: t`Bejárat` + ' ⛩️',
				to: '/add-poi/request-location/entrance',
			},
			{
				title: t`Hiénák` + ' 🚕🚕🚕',
				to: '/add-poi/request-location/taxi',
			},
			{
				title: t`Kaja` + ' 🍽️',
				to: '/add-poi/add-food',
			},
			{
				title: t`Bolt` + ' 🛒',
				to: '/add-poi/request-location/supermarket',
			},
		],
		psid
	);
};

const addFood = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Konyha jellege` + ' 🍽️',
		[
			{
				title: t`Amerikai` + ' 🍔 🌭',
				to: '/add-poi/request-location/hotdog_hamburger',
			},
			{
				title: t`Pizza` + ' 🍕',
				to: '/add-poi/request-location/pizza',
			},
			{
				title: t`Mexikói` + ' 🌮',
				to: '/add-poi/request-location/mexican',
			},
			{
				title: t`Gyros`,
				to: '/add-poi/request-location/gyros',
			},
			{
				title: t`Egészséges` + ' 🥗',
				to: '/add-poi/request-location/healty_food',
			},
		],
		psid
	);
};

const savePoi = function*(
	{ locale, psid, activeFestival, lastAskedLocation },
	location
) {
	const t = i18n(locale);

	const [lat, lng] = location.split(':');

	yield addPoiToDb(activeFestival, lastAskedLocation, lat, lng);

	yield sendReply(t`Köszi, így most már megvan!` + ' 🤟', psid);
};

const requestLocation = function*({ locale, psid }, type) {
	const t = i18n(locale);

	yield setContext(psid, {
		lastAskedLocation: type,
	});

	yield sendLocation(t`Add meg a helyzetét!` + ' 📍', psid);
};

module.exports = { addPoi, requestLocation, addFood, savePoi };
