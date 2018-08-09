const { sendReply } = require('../actions');
const i18n = require('../i18n');

const sendUrl = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Várj, mindjárt küldöm a linket` + ' 🙃', psid);

	yield sendReply('https://webview.festbot.com/navigator', psid);
};

module.exports = { sendUrl };
