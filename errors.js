const vscode = require('vscode')


function noHighlightedSection() {
	vscode.window.showInformationMessage('You must be highlighting some text!');
}

async function languageNotSupported(supported) {
    const language = vscode.window.activeTextEditor.document.languageId
    return await vscode.window.showQuickPick(supported, {placeHolder: `"${language}" is not supported. Please select another language or Escape to cancel.`})
}


module.exports = {
    noHighlightedSection,
    languageNotSupported
}