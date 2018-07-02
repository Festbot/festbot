const { getLocalizedMenu } = require('../config/persistentMenu');
const { sendButtons, sendQuickReply, sendReply } = require('../actions');
const i18n = require('../i18n');

const autoReply = function*({ locale, psid }) {
	const t = i18n(locale);
	const menu = getLocalizedMenu(locale);

	yield sendReply(
		t`A békesség kedvéért csak ilyen irányított módon tudunk beszélgetni`,
		psid
	);

	yield sendButtons(
		t`Küldök is hozzá neked gombokat` + ' 👉',
		menu.call_to_actions.map((button, index) => ({
			title: menu.call_to_actions[index].title,
			to: '/auto-reply/sub-menu/' + index,
		})),
		psid
	);
};

const subMenu = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const menu = getLocalizedMenu(locale);

	yield sendQuickReply(
		t`Még több gomb 👉`,
		menu.call_to_actions[parseInt(param, 10)].call_to_actions.map(
			(button, index) => ({
				title: button.title,
				to: 'semmi',
			})
		),
		psid
	);
};

module.exports = { autoReply, subMenu };
