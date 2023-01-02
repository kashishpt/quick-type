const vscode = require('vscode')
const errors = require('./errors.js')

function toMap() {
    const editor = vscode.window.activeTextEditor
	const selection = editor.selection
	const selectionValid = selection && !selection.isEmpty

    if (selectionValid) {
        const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const text = editor.document.getText(selectionRange);
        
        const lines = text.split('\n')
        let pairs = []
        for (let line of lines) {
            pairs.push(line.trim().split(' '))
        }

        const language = vscode.window.activeTextEditor.document.languageId
        let output = ""

        if (language === 'javascript') {
            output += "let _ = {\n"

            for (const pair of pairs) {
                output += `\t${pair[0]}: ${pair[1]},\n`
            }

            output += "}"
        } else if (language === 'python') {
            output += "_ = {\n"

            for (const pair of pairs) {
                output += `\t${pair[0]}: ${pair[1]},\n`
            }

            output += "}"
        }


        editor.edit(editBuilder => editBuilder.replace(selectionRange, output))


    } else {
        errors.noHighlightedSection()
    }
}

module.exports = {
    toMap
}