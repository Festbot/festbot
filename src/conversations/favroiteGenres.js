const { sendQuickReply } = require('../actions');
const i18n = require('../i18n');

const getRandomArtist = function(voltmar) {
	const artists = [
		{ name: 'Lana del Rey', genres: ['dance pop', 'pop'] },
		{ name: 'Kendrick Lamar', genres: ['hip hop', 'rap'] },
		{ name: 'Kygo', genres: ['edm', 'pop', 'tropical house'] },
	];

	return artists[Math.floor(Math.random() * artists.length)];
};

const isRock = function(artist) {
	return artist.genres.indexOf('rock') !== -1;
};

const randomArtist = function*({ locale, psid }) {
	const t = i18n(locale);
	const artist = getRandomArtist();

	return sendQuickReply(
		{
			message: t`Do you like ${artist.name}?`,
			quickReplies: [
				{
					title: t`Yes` + isRock(artist) ? ' 😎🎸🤘' : ' 😍',
					to: '/favorite-genres/like/' + '0',
				},
				{
					title: t`Not really` + ' 🙄',
					to: '/favorite-genres/dont-like/' + '0',
				},
				{
					title: t`Never heard of it` + ' 😅',
					to: '/favorite-genres/dont-like/' + '0',
				},
			],
		},
		psid
	);
};

module.exports = { randomArtist };
