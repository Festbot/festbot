const {
	howManyDrinks,
	howManyFingers,
	dontTextYourEx,
	doYouknowWhereYouAre,
} = require('../../src/conversations/sobrietyTest');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { SEND_QUICK_REPLY } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
};

describe('howManyDrinks', function() {
	const generator = howManyDrinks(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});

describe('howManyFingers', function() {
	const generator = howManyFingers(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});

describe('dontTextYourEx', function() {
	const generator = dontTextYourEx(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});

describe('doYouknowWhereYouAre', function() {
	const generator = doYouknowWhereYouAre(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});
