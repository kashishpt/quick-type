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
        return undefined
    }
    
}

function settings() {
    return vscode.workspace.getConfiguration('quick-type')
}


module.exports = {
    getSelection,
    settings
}