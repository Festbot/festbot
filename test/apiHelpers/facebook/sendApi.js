const {
	sendMapMarker,
	sendList,
} = require('../../../src/apiHelpers/facebook/sendApi');
const { getStaticMapUrl } = require('../../../src/apiHelpers/google/maps');
const assert = require('chai').assert;

describe('facebook send api: sendMapMarker', function() {
	process.env.FACEBOOK_ACCESS_TOKEN =
		'EAAdt5kAH7AcBAH2aiQvfnVkrpbRkELbq2t1aZB23qobDJNGkudZBFzCIYAIyaqTPN7ESqQoUN4xGAZAI60ZA3PBRYrsq1Pp91xLVnGTjhDR3y1u6JZBnCrBcjLlX4R2tFIJs07Cx7yT8m5AbhyVQuARMmyULUDH7EmaUeT1rIpAZDZD';
	process.env.GOOGLE_MAPS_API_KEY = 'AIzaSyDTCkVlGg_KCM_MH7WM3Yd-gXlhPhaWvFw';

	const mapUrl = getStaticMapUrl(47.684, 16.593);

	it('sendMapMarker', async function() {
		await sendMapMarker(
			'2021564191208299',
			'Nagyszinpad',
			mapUrl,
			47.684,
			16.593
		);
	});
});

describe('facebook send api: sendList', function() {
	process.env.FACEBOOK_ACCESS_TOKEN =
		'EAAdt5kAH7AcBAH2aiQvfnVkrpbRkELbq2t1aZB23qobDJNGkudZBFzCIYAIyaqTPN7ESqQoUN4xGAZAI60ZA3PBRYrsq1Pp91xLVnGTjhDR3y1u6JZBnCrBcjLlX4R2tFIJs07Cx7yT8m5AbhyVQuARMmyULUDH7EmaUeT1rIpAZDZD';

	it('sendList', async function() {
		await sendList('2021564191208299');
	});
});
