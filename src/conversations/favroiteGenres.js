const FacebookSend = require('../apiHelpers/facebook/sendApi');
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

		FacebookSend.sendMessage(psid, 'Do you like ' + artist.name + '?', [
			{
				title: i18n('Yes', locale) + isRock(artist) ? ' 😎🎸🤘' : ' 😍',
				payload: '/favorite-genres/like/' + '0'
			},
			{
				title: i18n('Not really', locale) + ' 🙄',
				payload: '/favorite-genres/dont-like/' + '0'
			},
			{
				title: i18n('Never heard of it', locale) + ' 😅',
				payload: '/favorite-genres/dont-like/' + '0'
			}
		]);
	}
};
