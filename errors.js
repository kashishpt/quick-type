const vscode = require('vscode')


function noHighlightedSection() {
	vscode.window.showInformationMessage('You must be highlighting some text!');
}

async function languageNotSupported(supported) {
    const language = vscode.window.activeTextEditor.document.languageId
    return await vscode.window.showQuickPick(supported, {title: `${language} not supported. You may pick a supported language with similar syntax or Escape to cancel.`})
}


module.exports = {
    noHighlightedSection,
    languageNotSupported
}