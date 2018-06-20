const {
	sendReply,
	sendButtons,
	getFacebookData,
	sendQuickReply,
	setContext,
} = require('../actions');
const i18n = require('../i18n');

addPoi = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendButtons(
		t`Mit szeretnél hozzáadni` + ' 📍',
		[
			{
				title: t`Színpad` + ' 😎',
				to: '/add-poi/add-stage',
			},
			{
				title: t`Toalett` + ' 🚻',
				to: '/add-poi/add-wc',
			},
			{
				title: t`Kemping` + ' ⛺',
				to: '/add-poi/add-camping',
			},
			{
				title: t`Bejárat` + ' ⛩️',
				to: '/add-poi/add-entrance',
			},
			{
				title: t`Bejárat` + ' 🚕',
				to: '/add-poi/add-taxi',
			},
		],
		psid
	);
};
module.exports = { addPoi };
