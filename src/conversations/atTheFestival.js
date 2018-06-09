const noActiveFestival = function*({ i18n: t, gender = 'female' }) {
	yield t`Looks like you didn't tell me which festival you're at right now.` +
		(gender === 'female' ? ' 🤷‍♀️' : ' 🤷‍♂️');
	yield t`Please choose one from this list, and then ask me again!` + ' 😎';
};

const noFestivalData = function*({ i18n: t }) {
	yield t`Oops, looks like the organizers of this festival dind't send me the map yet.` +
		' 😩';
	yield t`Sorry about that.` + ' 😞';
	yield t`I will let them know...`;
};

const toilet = function*({ i18n: t, activeFestival }) {
	yield t`Lemme see...` + ' 🧐';

	if (activeFestival === null) {
		yield* noActiveFestival.apply(null, arguments);
	} else {
		yield* noFestivalData.apply(null, arguments);
	}
};

const food = function*({ i18n: t, activeFestival }) {
	yield t`Lemme see...` + ' 🧐';

	if (activeFestival === null) {
		yield* noActiveFestival.apply(null, arguments);
	} else {
		yield* noFestivalData.apply(null, arguments);
	}
};

const agenda = function*({ i18n: t, activeFestival }) {
	yield t`Lemme see...` + ' 🧐';

	if (activeFestival === null) {
		yield* noActiveFestival.apply(null, arguments);
	} else {
		yield* noFestivalData.apply(null, arguments);
	}
};

module.exports = { toilet, food, agenda, noFestivalData, noActiveFestival };
