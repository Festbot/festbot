const fs = require('fs');
const locales = {
	en_US: require('../src/locales/en_US')
};

const files = [
	'./src/conversations/getStarted.js',
	'./src/conversations/streamProviderAuth.js',
	'./src/conversations/sobrietyTest.js'
];

function replaceKeys(text) {
	const regex = /\$\{[a-zA-z._\s\+]+\}/;
	let counter = 1;
	while(regex.test(text)) {
		text = text.replace(regex, '{' + counter + '}');
		counter++;
	}

	return text;
}

function getTexts(file) {
	const regex = /t`([a-zA-Z.,'’_?!$áÁéÉíÍóÓöÖőŐüÜ\s\+\{\}]+)`/g;
	return texts = file.match(regex)
		.map(text => text.substring(2))
		.map(text => text.slice(0, -1));
}

files.forEach(file => {
	const content = fs.readFileSync(file).toString();

	Object.keys(locales).forEach(locale => {
		getTexts(content).forEach(text => {
			if (!locales[locale][replaceKeys(text)]) {
				console.log(file, replaceKeys(text));
			}
		});
	});
});

