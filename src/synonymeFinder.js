const synonymes = require('./synonymes.json');

module.exports = function getSynonymes(word) {
	return synonymes.filter(sysnonyme => {
		return synonyme.indexOf(word) !== -1;
	});
}
