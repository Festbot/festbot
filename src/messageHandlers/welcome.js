class Welcome {
	static recognize(message) {
		return /(hi|hello|hey)/.test(message);
	}

	static answer() {
		return `Hi! 👋  Lemme check out your Spotify profile so I can learn more about your musical taste.`;
	}
};

module.exports = Welcome;
