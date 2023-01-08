const vscode = require('vscode')
const errors = require('../errors.js')
const utils = require('../utils.js')


function addQuotes(quote) {
	const selection = utils.getSelection()
	
	if (selection !== undefined) {
		let output = ""
		let index = 0
		output = ""
		const regex = new RegExp('(' + utils.settings()['stringRegex'] + ')')
		while (index < selection.text.length) {
			const match = selection.text.substring(index).match(regex)
			if (match != null) {
				output += quote + match[0] + quote
				index += match[0].length
			} else {
				output += selection.text[index]
				index += 1
			}
		}
		selection.editor.edit(editBuilder => editBuilder.replace(selection.range, output))

	} else {
		console.log('error')
		errors.noHighlightedSection()
	}
}



module.exports = {
    addQuotes
}