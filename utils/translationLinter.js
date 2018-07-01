const fs = require('fs');
const chalk = require('chalk');

const locales = {
	en_US: require('../src/locales/en_US'),
};

function replaceKeys(text) {
	const regex = /\$\{[a-zA-z._\s\+]+\}/;
	let counter = 1;
	while (regex.test(text)) {
		text = text.replace(regex, '{' + counter + '}');
		counter++;
	}

	return text;
}

function getLineNumber(file, text) {
	const regex = /\n/g;
	const position = file.indexOf(text);
	const beforePosition = file.slice(0, position);
	const newLines = beforePosition.match(regex);
	return newLines.length + 1;
}

function getTexts(file) {
	const regex = /t`([a-zA-Z.,'’_?!$áÁéÉíÍóÓöÖőŐüÜ\s\+\{\}]+)`/g;
	return (texts = file
		.match(regex)
		.map(text => text.substring(2))
		.map(text => text.slice(0, -1)))
		.map(text => ({
			line: getLineNumber(file, text),
			text: text
		}));
}

fs.readdirSync('./src/conversations').forEach(file => {
	const content = fs.readFileSync('./src/conversations/' + file).toString();

	Object.keys(locales).forEach(locale => {
		getTexts(content).forEach(text => {
			if (!locales[locale][replaceKeys(text.text)]) {
				console.log(chalk.black.bgYellow('WARN') +
					' ' + file + ':' + text.line,
					'Missing translation:',
					'"' + replaceKeys(text.text) + '"'
				);
			}
		});
	});
});
