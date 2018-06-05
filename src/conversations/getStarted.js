getStarted = function*({ name, i18n: t }) {
	yield t`Hey ${name}, I’m here to assist you with festival related things.` +
		' 😎';

	yield t`I can't wait to get to know you more!` + ' 😍';

	yield t`Some of my services are based on your musical taste.` + ' 🧐';

	return {
		message:
			t`I hope you wouldn’t mind if I ask a little bit about you.` +
			' ☺️',
		quickReplies: [
			{
				title: t`No problem` + ' ☺️',
				to: '/stream-provider-auth/confirm-select'
			},
			{
				title: t`Maybe later` + ' 🤔',
				to: '/stream-provider-auth/select-later'
			}
		]
	};
};

module.exports = { getStarted };
