const {
	sendReply,
	sendLocation,
	sendQuickReply,
	addPoi: addPoiToDb,
	setContext,
	sendWebViewButton,
	getVenues,
	updateVenueLocation,
} = require('../actions');

const i18n = require('../i18n');

const noActiveFestival = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Nem is írtad, hogy melyik fesztiválon vagy...` + ' 🤷‍',
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
		yield* noActiveFestival.apply(null, arguments);
		return;
	}

	yield sendQuickReply(
		t`Na, mit találtál?` + ' 📍',
		[
			{
				title: t`Színpadot` + ' 😎',
				to: '/add-poi/add-stage',
			},
			{
				title: t`Kaját` + ' 🍽️',
				to: '/add-poi/add-food',
			},
			{
				title: t`Piát` + ' 🍻',
				to: '/add-poi/add-bar',
			},
			{
				title: t`Vécét` + ' 🚻',
				to: '/add-poi/request-location/wc',
			},
			{
				title: t`Szolgáltatást`,
				to: '/add-poi/add-service',
			},
			{
				title: t`Kempinget` + ' ⛺⛺⛺',
				to: '/add-poi/request-location/camping',
			},
			{
				title: t`Bejárat` + ' ⛩️',
				to: '/add-poi/request-location/entrance',
			},
			{
				title: t`Hiénákat` + ' 🚕🚕🚕',
				to: '/add-poi/request-location/taxi',
			},
			{
				title: t`Bolt` + ' 🛒',
				to: '/add-poi/request-location/supermarket',
			},
			{
				title: t`Parkolót` + ' 🅿️',
				to: '/add-poi/request-location/parking',
			},
			{
				title: t`Dohánybolt` + ' 🚬',
				to: '/add-poi/request-location/tobacco',
			},
		],
		psid
	);
};

const addBar = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Jó, de mit lehet ott inni? ` + ' ',
		[
			{
				title: t`Sört` + ' 🍺',
				to: '/add-poi/request-location/beer',
			},
			{
				title: t`Bort` + ' 🍷',
				to: '/add-poi/request-location/wine',
			},
			{
				title: t`Koktélt` + ' 🍹',
				to: '/add-poi/request-location/cocktails',
			},
			{
				title: t`Viszkit` + ' 🥃',
				to: '/add-poi/request-location/whisky',
			},
			{
				title: t`Coffee` + ' ☕',
				to: '/add-poi/request-location/coffee',
			},
		],
		psid
	);
};

const addService = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Jó, de az bármi lehet...`,
		[
			{
				title: t`Értékmegőrző` + ' 💍',
				to: '/add-poi/request-location/lockers',
			},
			{
				title: t`Telefontöltés` + ' 🔋',
				to: '/add-poi/request-location/charging_station',
			},
			{
				title: t`Elsősegély` + ' 🏥',
				to: '/add-poi/request-location/first_aid',
			},
			{
				title: t`Információ` + ' ℹ️',
				to: '/add-poi/request-location/information',
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
			{
				title: t`Reggeli` + ' 🍳',
				to: '/add-poi/request-location/breakfast',
			},
			{
				title: t`Fish` + ' 🐟',
				to: '/add-poi/request-location/fish',
			},
		],
		psid
	);
};

const addStage = function*({ locale, psid, activeFestival }) {
	const t = i18n(locale);

	const stages = yield getVenues(activeFestival, 'stage');

	yield sendQuickReply(
		t`Melyik színpadot?`,
		stages.map(stage => ({
			title: stage.name,
			to: '/add-poi/request-location-for-stage/' + stage._id,
		})),
		psid
	);
};

const savePoi = function*(
	{ locale, psid, activeFestival, lastAskedLocation, sendOrSave },
	location
) {
	if (sendOrSave !== 'save') {
		return;
	}

	const t = i18n(locale);

	const [lat, lng] = location.split(':');

	yield addPoiToDb(activeFestival, lastAskedLocation, lat, lng);

	yield sendReply(t`Köszi, így most már megvan!` + ' 🤟', psid);
};

const requestLocation = function*({ locale, psid }, type) {
	const t = i18n(locale);

	yield setContext(psid, {
		lastAskedLocation: type,
		sendOrSave: 'save',
	});

	yield sendLocation(t`Add meg a helyzetét!` + ' 📍', psid);
};

module.exports = {
	addPoi,
	requestLocation,
	addFood,
	savePoi,
	addBar,
	addService,
	addStage,
};
