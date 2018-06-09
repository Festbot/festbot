const {
	toilet,
	food,
	agenda,
	noFestivalData,
	noActiveFestival,
} = require('../../src/conversations/atTheFestival');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { SEND_REPLY } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
};

describe('noActiveFestival', function() {
	const generator = noActiveFestival(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});

describe('noFestivalData', function() {
	const generator = noFestivalData(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});

describe('toilet', function() {
	const generator = toilet(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});

describe('food', function() {
	const generator = food(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});

describe('agenda', function() {
	const generator = agenda(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});
