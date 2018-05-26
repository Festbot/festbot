const Send = require('../send');
const i18n = require('../i18n');

function getRandomArtist(voltmar) {
	const artists = [
		{ name: 'Lana del Rey', genres: ['dance pop', 'pop'] },
		{ name: 'Kendrick Lamar', genres: ['hip hop', 'rap'] },
		{ name: 'Kygo', genres: ['edm', 'pop', 'tropical house'] }
	];

	return artists[Math.floor(Math.random() * artists.length)];
}

function isRock(artist) {
	return artist.genres.indexOf('rock') !== -1;
}

module.exports = {
	randomArtist: async function({ psid, locale }) {
		const artist = getRandomArtist();
		const t = i18n(locale);

		Send.message(psid, t`Do you like ${artist.name}?`, [
			{
				title: t`Yes` + isRock(artist) ? ' 😎🎸🤘' : ' 😍',
				to: '/favorite-genres/like/' + '0'
			},
			{
				title: t`Not really` + ' 🙄',
				to: '/favorite-genres/dont-like/' + '0'
			},
			{
				title: t`Never heard of it` + ' 😅',
				to: '/favorite-genres/dont-like/' + '0'
			}
		]);
	}
};
