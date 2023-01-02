const vscode = require('vscode')
const errors = require('./errors.js')

function toMap() {
    const editor = vscode.window.activeTextEditor
	const selection = editor.selection
	const selectionValid = selection && !selection.isEmpty

    if (selectionValid) {
        const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const text = editor.document.getText(selectionRange).trim()
        
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
        } else if (language === 'java') {
            output += "Map<K, V> quickTypeMap = new HashMap<>();\n"
            
            for (const pair of pairs) {
                output += `quickTypeMap.put(${pair[0]}, ${pair[1]});\n`
            }
        } else if (language === 'cpp') {
            output += "std::map<K, V> quickTypeMap;\n"
            
            for (const pair of pairs) {
                output += `quickTypeMap[${pair[0]}] = ${pair[1]};\n`
            }
        } else {
            output = text;
            errors.languageNotSupported()
        }


        editor.edit(editBuilder => editBuilder.replace(selectionRange, output))


    } else {
        errors.noHighlightedSection()
    }
}

function toArray() {
    const editor = vscode.window.activeTextEditor
	const selection = editor.selection
	const selectionValid = selection && !selection.isEmpty

    if (selectionValid) {
        const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const text = editor.document.getText(selectionRange).trim();

        const items = text.split(/\s+/)

        const language = vscode.window.activeTextEditor.document.languageId
        let output = ""

        if (language === 'javascript') {
            output = 'let _ = [' + items.join(', ') + ']\n'
        } else if (language === 'python') {
            output = "_ = [" + items.join(', ') + ']\n'
        } else if (language === 'java') {
            output += "ArrayList<E> quickTypeArray = new ArrayList<>();\n"

            for (const item of items) {
                output += `quickTypeArray.add(${item});\n`
            }
        } else if (language === 'cpp') {
            output += 'list<E>quickTypeList = { ' + items.join(', ') + ' }';
        } else {
            output = text;
            errors.languageNotSupported()
        }

        editor.edit(editBuilder => editBuilder.replace(selectionRange, output))



    }
}

module.exports = {
    toMap,
    toArray
}