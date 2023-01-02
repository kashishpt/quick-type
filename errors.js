const vscode = require('vscode')


function noHighlightedSection() {
	vscode.window.showInformationMessage('You must be highlighting some text!');
}


module.exports = {
    noHighlightedSection
}