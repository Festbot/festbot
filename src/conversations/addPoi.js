const {
	sendReply,
	sendLocation,
	getFacebookData,
	sendQuickReply,
	setContext,
} = require('../actions');
const i18n = require('../i18n');

const addPoi = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Mit szeretnél hozzáadni` + ' 📍',
		[
			{
				title: t`Színpad` + ' 😎',
				to: '/add-poi/request-location/stage',
			},
			{
				title: t`Toalett` + ' 🚻🚻🚻',
				to: '/add-poi/request-location/wc',
			},
			{
				title: t`Kemping` + ' ⛺⛺⛺⛺',
				to: '/add-poi/request-location/camping',
			},
			{
				title: t`Bejárat` + ' ⛩️',
				to: '/add-poi/request-location/entrance',
			},
			{
				title: t`Hiénák` + ' 🚕🚕🚕🚕',
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
				to: '/add-poi/request-location/hotdoghamburger',
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
				to: '/add-poi/request-location/healty',
			},
		],
		psid
	);
};

const requestLocation = function*({ locale, psid }, type) {
	const t = i18n(locale);

	yield sendLocation(
		t`Add meg a helyzetét` + ' 📍',

		psid
	);
};

module.exports = { addPoi, requestLocation, addFood };
