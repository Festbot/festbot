const { sendReply, sendWebViewButton } = require('../actions');
const i18n = require('../i18n');

const noActiveFestival = function*({ locale, gender = 'female', psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Looks like you didn't tell me which festival you're at right now.` +
			(gender === 'female' ? ' 🤷‍♀️' : ' 🤷‍♂️'),
		psid
	);
	yield sendWebViewButton(
		t`Please choose one from this list, and then ask me again!` + ' 😎',
		t`Browse festivals`,
		'https://webview.festbot.com',
		psid
	);
};

const noFestivalData = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Oops, looks like the organizers of this festival dind't send me the map yet.` +
			' 😩',
		psid
	);
	yield sendReply(t`Sorry about that.` + ' 😞', psid);
	yield sendReply(t`I will let them know...`, psid);
};

const toilet = function*({ locale, activeFestival, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Lemme see...` + ' 🧐', psid);

	if (activeFestival) {
		yield* noFestivalData.apply(null, arguments);
	} else {
		yield* noActiveFestival.apply(null, arguments);
	}
};

const food = function*({ locale, activeFestival, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Lemme see...` + ' 🧐', psid);

	if (activeFestival) {
		yield* noFestivalData.apply(null, arguments);
	} else {
		yield* noActiveFestival.apply(null, arguments);
	}
};

const agenda = function*({ locale, activeFestival, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Lemme see...` + ' 🧐', psid);

	if (activeFestival) {
		yield* noFestivalData.apply(null, arguments);
	} else {
		yield* noActiveFestival.apply(null, arguments);
	}
};

module.exports = { toilet, food, agenda, noFestivalData, noActiveFestival };
