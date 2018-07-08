const { setContext, redirect } = require('../actions');

const receivedLocation = function*({ psid, redirectAfterLocation }, location) {
	const [lat, lng] = location.split(':');

	yield setContext(
		{
			lastLocation: { lat, lng },
		},
		psid
	);

	yield redirect(redirectAfterLocation);
};

module.exports = { receivedLocation };
