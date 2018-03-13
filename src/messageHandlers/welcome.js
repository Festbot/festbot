class Welcome {
	static recognize(message) {
		return /(hi|hello|hey)/.test(message);
	}

	static answer() {
		return `Hi! 👋 `;
	}
};

module.exports = Welcome;
