const { randomArtist } = require('../../src/conversations/favroiteGenres');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { SEND_QUICK_REPLY } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	name: 'Andor',
};

describe('randomArtist', function() {
	const generator = randomArtist(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});
