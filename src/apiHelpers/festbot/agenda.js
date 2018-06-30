const { getDoc } = require('./utils');

const getTodaysAgenda = async function(savedShows) {
	let data = [];

	for (let i = 0; i < savedShows.length; i++) {
		const show = await getDoc('events', savedShows[i]);

		const startDate = new Date(show.startDate);
		const now = new Date();

		//if (startDate.toDateString() === now.toDateString()) {
		data.push(show);
		//}
	}

	return data;
};

module.exports = { getTodaysAgenda };
