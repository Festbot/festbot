const { sendReply, sendWebViewButton } = require('../actions');
const i18n = require('../i18n');

const noActiveFestival = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Úgy tűnik, hogy nem állítottál be aktív fesztivált egyelőre.` +
			' 🤷‍',
		psid
	);
	yield sendWebViewButton(
		t`Kérlek aktiváld a fesztivált a zöld + jelre kattintva, aztán próbáld újra!` +
			' 😎',
		t`Fesztiválok listája`,
		'https://webview.festbot.com',
		psid
	);
};

const noFestivalData = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`A macska rúgja meg! Úgy tűnik, hogy a felsztivál szervezői még nem küldtek még térkép adatokat.` +
			' 😩',
		psid
	);
	yield sendReply(t`Elnézést kérek ezért.` + ' 😞', psid);
	yield sendReply(t`Jelzem nekik az igényt...`, psid);
};

const toilet = function*({ locale, activeFestival, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Lássuk csak...` + ' 🧐', psid);

	if (activeFestival) {
		yield* noFestivalData.apply(null, arguments);
	} else {
		yield* noActiveFestival.apply(null, arguments);
	}
};

const food = function*({ locale, activeFestival, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Lássuk csak...` + ' 🧐', psid);

	if (activeFestival) {
		yield* noFestivalData.apply(null, arguments);
	} else {
		yield* noActiveFestival.apply(null, arguments);
	}
};

const agenda = function*({ locale, activeFestival, psid }) {
	const t = i18n(locale);

	yield sendReply(t`Lássuk csak...` + ' 🧐', psid);

	if (activeFestival) {
		yield* noFestivalData.apply(null, arguments);
	} else {
		yield* noActiveFestival.apply(null, arguments);
	}
};

module.exports = { toilet, food, agenda, noFestivalData, noActiveFestival };
