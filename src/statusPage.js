const statusPage = function(req, res) {
	res.status(200).send('Minden OK');
};

module.exports = { statusPage };
