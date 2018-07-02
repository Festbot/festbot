const { getLocalizedMenu } = require('../config/persistentMenu');
const { sendButtons } = require('../actions');

const autoReply = function*({ locale, psid }) {
	const menu = getLocalizedMenu(locale);

	yield sendButtons(
		'These are my functions: ',
		menu.call_to_actions.map(button => ({
			title: button.title,
			to: button.payload,
		})),
		psid
	);
};

module.exports = { autoReply };
