const { sendReply, getFacebookData, sendQuickReply } = require('../actions');
const i18n = require('../i18n');

getStarted = function*(context) {
	const t = i18n(context.locale);
	const newContext = yield getFacebookData(context.psid);

	yield sendReply(
		t`Hey ${
			newContext.name
		}, I’m here to assist you with festival related things.` + ' 😎',
		newContext.psid
	);

	yield sendReply(
		t`I can't wait to get to know you more!` + ' 😍',
		newContext.psid
	);

	yield sendReply(
		t`Some of my services are based on your musical taste.` + ' 🧐',
		newContext.psid
	);

	yield sendQuickReply(
		{
			message:
				t`I hope you wouldn’t mind if I ask a little bit about you.` +
				' ☺️',
			quickReplies: [
				{
					title: t`No problem` + ' ☺️',
					to: '/stream-provider-auth/confirm-select',
				},
				{
					title: t`Maybe later` + ' 🤔',
					to: '/stream-provider-auth/select-later',
				},
			],
		},
		newContext.psid
	);
};

module.exports = { getStarted };
