const vscode = require('vscode')
const errors = require('./errors.js')

function addQuotes(quote) {
	const editor = vscode.window.activeTextEditor
	const selection = editor.selection
	const selectionValid = selection && !selection.isEmpty
	
	if (selectionValid) {
		const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const text = editor.document.getText(selectionRange);
		const settings = vscode.workspace.getConfiguration('quick-type')
		let output = ""
		let index = 0
		output = ""
		while (index < text.length) {
			const match = text.substring(index).match(new RegExp('(' + settings['wordRegex'] + ')'))
			if (match != null) {
				output += quote + match[0] + quote
				index += match[0].length
			} else {
				output += text[index]
				index += 1
			}
		}
		editor.edit(editBuilder => editBuilder.replace(selectionRange, output))

	} else {
		errors.noHighlightedSection()
	}
}



module.exports = {
    addQuotes
}