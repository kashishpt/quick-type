const vscode = require('vscode')


function noHighlightedSection() {
	vscode.window.showInformationMessage('You must be highlighting some text!');
}

function languageNotSupported() {
    vscode.window.showInformationMessage(`Sorry, this feature does not support ${vscode.window.activeTextEditor.document.languageId} `)
}


module.exports = {
    noHighlightedSection,
    languageNotSupported
}