const assert = require('chai').assert;

const isAction = function(obj) {
	assert.isObject(obj);
	assert.isString(obj.type);
};

const actionTypeMatches = function(obj, type) {
	assert.strictEqual(obj.type, type);
};

module.exports = { isAction, actionTypeMatches };
