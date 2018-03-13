const Welcome = require('./messageHandlers/welcome');

const handlers = [
	Welcome
];

module.exports = function(message, callback) {
	handlers.forEach((handler, index) => {
		if (handler.recognize(message)) {
			callback(handler.answer(message));
		}
	});
};
