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
        const cursor = editor.selection.active
        let endPosition = new vscode.Position(cursor.line, 0)

        if (settings()['readUntilEnd']) {
            const whiteline = /^\s*$/
            const lines = vscode.window.activeTextEditor.document.lineCount
            while (endPosition.line < lines && editor.document.getText(editor.document.lineAt(endPosition).range).trim().match(whiteline) === null) {
                endPosition = endPosition.translate(1, 0)
            }

        } else {
            endPosition = new vscode.Position(cursor.line, editor.document.getText(editor.document.lineAt(endPosition).range).length)
        }

        const range = new vscode.Range(cursor, endPosition)
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


module.exports = {
    getSelection,
    settings
}