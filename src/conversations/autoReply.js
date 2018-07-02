const { getLocalizedMenu } = require('../config/persistentMenu');
const { sendButtons, sendQuickReply } = require('../actions');

const autoReply = function*({ locale, psid }) {
	const menu = getLocalizedMenu(locale);

	yield sendButtons(
		'These are my functions: ',
		menu.call_to_actions.map((button, index) => ({
			title: menu.call_to_actions[index].title,
			to: '/auto-reply/sub-menu/' + index,
		})),
		psid
	);
};

const subMenu = function*({ locale, psid }) {
	const menu = getLocalizedMenu(locale);

	yield sendQuickReply(
		'These are my functions.',
		menu.call_to_actions.map((button, index) => ({
			title: menu.call_to_actions[index],
			to: '/auto-reply/sub-menu/' + index,
		})),
		psid
	);
};

module.exports = { autoReply };
