const vscode = require('vscode')
const errors = require('../errors.js')

function toMap(input_language) {
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

        const language = input_language === undefined ? vscode.window.activeTextEditor.document.languageId : input_language
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
        } else if (language === 'ruby') {
            output += '_ = {\n'

            const entries = pairs.map(pair => `\t${pair[0]} => ${pair[1]}`)
            output += entries.join(',\n') + '\n}'
        }


        if (output === '') {
            const feedback = errors.languageNotSupported(['JavaScript', 'Python', 'Java', 'C++', 'Ruby'])
            if (feedback !== undefined) {
                toMap(feedback)
            }
        } else {
            editor.edit(editBuilder => editBuilder.replace(selectionRange, output))
        }


    } else {
        errors.noHighlightedSection()
    }
}

async function toArray(input_language) {
    const editor = vscode.window.activeTextEditor
	const selection = editor.selection
	const selectionValid = selection && !selection.isEmpty

    if (selectionValid) {
        const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const text = editor.document.getText(selectionRange).trim();

        const items = text.split(/\s+/)
        const language = input_language === undefined ? vscode.window.activeTextEditor.document.languageId : input_language
        let output = ''

        if (language === 'javascript') {
            output = 'let _ = [' + items.join(', ') + ']\n'
        } else if (language === 'python' || language === 'ruby') {
            output = "_ = [" + items.join(', ') + ']\n'
        } else if (language === 'java') {
            output += "ArrayList<E> quickTypeArray = new ArrayList<>();\n"
            for (const item of items) {
                output += `quickTypeArray.add(${item});\n`
            }
        } else if (language === 'cpp') {
            output = 'list<E>quickTypeList = { ' + items.join(', ') + ' };\n';
        } else if (language === 'ocaml') {
            output = 'let _  = [' + items.join(';') + '];\n'
        }
        
        

        if (output === '') {
            const feedback = await errors.languageNotSupported(['javascript', 'python', 'java', 'cpp', 'ruby', 'ocaml'])
            if (feedback !== undefined) {
                // console.log('here')
                toArray(feedback)
            }
        } else {
            editor.edit(editBuilder => editBuilder.replace(selectionRange, output))
        }

        



    }
}

module.exports = {
    toMap,
    toArray
}