const {
	sendReply,
	sendCarousel,
	getAgenda: getAgendaFromDb,
} = require('../actions');
const i18n = require('../i18n');

const getAgenda = function*({ locale, psid, savedShows }) {
	const t = i18n(locale);

	const agenda = yield getAgendaFromDb(savedShows);

	if (agenda.length === 0) {
		yield sendReply(t`Nem adtál hozzá mára programot.`, psid);
		return;
	}

	yield sendCarousel(
		agenda.map(event => ({
			title: event.artist,
			subtitle: event.festival + ' ' + event.stage,
			imageUrl: 'https://ucarecdn.com/' + event.artistPhoto + '/photo',
			buttons: [
				{
					url: 'https://webview.festbot.com',
					title: t`Take me there`,
				},
			],
		})),
		psid
	);
};

module.exports = { getAgenda };
