const vscode = require('vscode')

/* @export
    gets the text the user is highlighting in an object
    range -> the range that the user is highlighting (useful for replacing the text)
    text -> the actual text the user is highlighting
    editor -> the current editor the user is in (useful for replacing the text)
*/
function getSelection() {
    const editor = vscode.window.activeTextEditor
	const selection = editor.selection
	const valid = selection && !selection.isEmpty
    if (valid) {
        const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
        const text = editor.document.getText(selectionRange).trim()
        return {
            range: selectionRange,
            text: text,
            editor: editor
        }
    } else {
        
        const currentLine = editor.document.lineAt(editor.selection.active.line).range
        let startPosition = new vscode.Position(currentLine.start.line, 0)
        let endPosition = startPosition
        if (settings()['readMultipleLines']) {
            const whiteline = /^\s*$/

            let text = getText(editor.document.lineAt(startPosition).range)
            while (text.match(whiteline) === null && startPosition.line > 0) {
                startPosition = startPosition.translate(-1, 0)
                text = getText(editor.document.lineAt(startPosition).range)
            }

            if (text.match(whiteline) !== null) {
                startPosition = startPosition.translate(1, 0)
                text = getText(editor.document.lineAt(startPosition).range)
            }
            const equal = /^[^=]*=\s*/

            if (text.includes("=")) {
                startPosition = startPosition.translate(0, text.match(equal)[0].length)
            }

            text = getText(editor.document.lineAt(endPosition).range)
            const lines = vscode.window.activeTextEditor.document.lineCount
            while (text.match(whiteline) === null && endPosition.line < lines - 1) {
                endPosition = endPosition.translate(1, 0)
                text = getText(editor.document.lineAt(endPosition).range)
            }

            if (endPosition.line === lines - 1) {
                endPosition = endPosition.translate(0, editor.document.getText(editor.document.lineAt(editor.selection.active.line).range).length)
            }

        } else {
            let text = getText(currentLine)
            const equal = /^[^=]*=\s*/
            if (text.includes("=")) {
                startPosition = startPosition.translate(0, text.match(equal)[0].length)
            }

            endPosition = endPosition.translate(0, text.length)
        }

        const range = new vscode.Range(startPosition, endPosition)
        return {
            range: range,
            text: editor.document.getText(range).trim(),
            editor: editor
        }
    }
    
}

function settings() {
    return vscode.workspace.getConfiguration('quick-type')
}

function getText(range) {
    return vscode.window.activeTextEditor.document.getText(range)
}


module.exports = {
    getSelection,
    settings
}