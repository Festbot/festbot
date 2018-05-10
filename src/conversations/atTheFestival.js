const FacebookSend = require('../apiHelpers/facebook/sendApi');
const i18n = require('../i18n');

module.exports = {
	toilet: async function({ name, locale, psid }) {
		await FacebookSend.sendMessage(
			psid,
			i18n('And now what? Go to the toilet!', locale) + ' 🚽'
		);
	},

	food: async function({ name, locale, psid }) {
		await FacebookSend.sendMessage(psid, i18n('Mee too...', locale) + ' 😞');
	},

	agenda: async function({ name, locale, psid }) {
		await FacebookSend.sendMessage(
			psid,
			i18n('Sorry, what?', locale) + ' 😕'
		);
	}
};
