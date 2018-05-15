const Send = require('../send');
const i18n = require('../i18n');

module.exports = {
	toilet: async function(context) {
		await Send.message(context, 'And now what? Go to the toilet!', '🚽');
	},

	food: async function(context) {
		await Send.message(context, 'Mee too...', '😞');
	},

	agenda: async function(context) {
		await Send.message(context, 'Sorry, what?', '😕');
	}
};
