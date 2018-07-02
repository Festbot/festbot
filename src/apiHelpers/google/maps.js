const querystring = require('querystring');

const getStaticMapUrl = function(lat, lng) {
	return (
		'https://maps.googleapis.com/maps/api/staticmap?' +
		querystring.stringify({
			center: `${lat},${lng}`,
			zoom: 16,
			scale: 2,
			format: 'png',
			size: '300x300',
			maptype: 'roadmap',
			markers: `color:red|${lat},${lng}`,
			key: process.env.GOOGLE_MAPS_API_KEY,
		})
	);
};

const getMapUrl = function(lat, lng) {
	return (
		'https://maps.googleapis.com/maps/api/staticmap?' +
		querystring.stringify({
			center: `${lat},${lng}`,
			zoom: 13,
			size: '300x300',
			maptype: 'roadmap',
			markers: 'color:red%7Clabel:S%7C40.702147,-74.015794',
			key: process.env.GOOGLE_API_KEY,
		})
	);
};

module.exports = { getStaticMapUrl, getMapUrl };
