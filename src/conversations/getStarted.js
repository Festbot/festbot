const Send = require('../send');
const i18n = require('../i18n');

module.exports = {
	getStarted: async function({ psid, locale, name }) {
		const t = i18n(locale);

		await Send.message(
			psid,
			t`Hey ${name}, I’m here to assist you with festival related things.` +
				' 😎'
		);

		await Send.message(
			psid,
			t`I can't wait to get to know you more!` + ' 😍'
		);

		await Send.message(
			psid,
			t`Some of my services are based on your musical taste.` + ' 🧐'
		);

		await Send.message(
			psid,
			t`I hope you wouldn’t mind if I ask a little bit about you.` +
				' ☺️',
			[
				{
					title: t`No problem` + ' ☺️',
					to: '/stream-provider-auth/confirm-select'
				},
				{
					title: t`Maybe later` + ' 🤔',
					to: '/stream-provider-auth/select-later'
				}
			]
		);
	}
};
