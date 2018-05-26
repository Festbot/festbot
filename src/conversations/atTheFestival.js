const Send = require('../send');
const i18n = require('../i18n');

module.exports = {
	toilet: async function({ psid, locale }) {
		const t = i18n(locale);
		await Send.message(psid, t`And now what? Go to the toilet!` + ' 🚽');
	},

	food: async function({ psid, locale }) {
		const t = i18n(locale);
		await Send.message(psid, t`Mee too...` + ' 😞');
	},

	agenda: async function({ psid, locale }) {
		const t = i18n(locale);
		await Send.message(psid, t`Sorry, what?` + ' 😕');
	}
};
