const { sendReply, getFacebookData, sendQuickReply } = require('../actions');
const i18n = require('../i18n');

getStarted = function*({ locale, psid }) {
	const t = i18n(locale);
	const newContext = yield getFacebookData(psid);

	console.log('ezjonvissza', newContext);

	yield sendReply(
		t`Hey ${
			newContext.name
		}, I’m here to assist you with festival related things.` + ' 😎',
		psid
	);

	yield sendReply(t`I can't wait to get to know you more!` + ' 😍', psid);

	yield sendReply(
		t`Some of my services are based on your musical taste.` + ' 🧐',
		psid
	);

	yield sendQuickReply(
		t`I hope you wouldn’t mind if I ask a little bit about you.` + ' ☺️',
		[
			{
				title: t`No problem` + ' ☺️',
				to: '/stream-provider-auth/confirm-select',
			},
			{
				title: t`Maybe later` + ' 🤔',
				to: '/stream-provider-auth/select-later',
			},
		],
		psid
	);
};

module.exports = { getStarted };
