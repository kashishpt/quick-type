const vscode = require('vscode')
const errors = require('../errors.js')
const utils = require('../utils.js')

async function toMap(input_language) {
    const selection = utils.getSelection()

    if (selection !== undefined) {
        const lines = selection.text.split('\n')
        let pairs = []
        for (let line of lines) {
            pairs.push(line.trim().split(' '))
        }

        const language = input_language === undefined ? vscode.window.activeTextEditor.document.languageId : input_language
        let output = ""

        if (language === 'javascript') {
            const type = await vscode.window.showQuickPick(['JavaScript Object ({ ... })', 'Map Object'], {title:'Which type of map would you like?'})

            if (type === 'JavaScript Object ({ ... })') {
                output += "let _ = {\n"

                for (const pair of pairs) {
                    output += `\t${pair[0]}: ${pair[1]},\n`
                }

                output += "}"
            } else if (type === 'Map Object') {
                output += 'const quicktypeMap = new Map()\n'
                for (const pair of pairs) {
                    output += `quicktypeMap.set(${pair[0]}, ${pair[1]})\n`
                }
            } else {
                output = selection.text
            }
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
            selection.editor.edit(editBuilder => editBuilder.replace(selection.range, output))
        }


    } else {
        errors.noHighlightedSection()
    }
}

async function toArray(input_language) {
    const selection = utils.getSelection()

    if (selection !== undefined) {

        const items = selection.text.split(/\s+/)
        const language = input_language === undefined ? vscode.window.activeTextEditor.document.languageId : input_language
        let output = ''

        if (language === 'javascript') {
            output = 'let _ = [' + items.join(', ') + ']\n'
        } else if (language === 'python' || language === 'ruby') {
            output = "_ = [" + items.join(', ') + ']\n'
        } else if (language === 'java') {
            const option = await vscode.window.showQuickPick(['Java Array', 'ArrayList'], {title:'Which type of array would you like?'})

            if (option === 'Java Array') {
                output += 'type[] quickPickArray = { ' + items.join(', ') + ' };'
            } else if (option === 'ArrayList') {
                output += "ArrayList<E> quickTypeArray = new ArrayList<>();\n"
                for (const item of items) {
                    output += `quickTypeArray.add(${item});\n`
                }   
            } else {
                output = selection.text
            }

        } else if (language === 'cpp') {
            const option = await vscode.window.showQuickPick(['C++ Array', 'Vector'], {title:'Which type of array would you like?'})
            
            if (option === 'Vector') {
                output += 'vector<E> quickpickVector;\n'

                for (const item of items) {
                    output += 'quickpickVector.push_back(' + item + ');\n'
                }
            } else if (option === 'C++ array') {
                output += 'type quickpickArray[] = {' + items.join(', ') + '};\n'
            } else {
                output = selection.text
            }
        } else if (language === 'ocaml') {
            output = 'let _  = [' + items.join(';') + '];\n'
        }
        

        if (output === '') {
            const feedback = await errors.languageNotSupported(['javascript', 'python', 'java', 'cpp', 'ruby', 'ocaml'])
            if (feedback !== undefined) {
                toArray(feedback)
            }
        } else {
            selection.editor.edit(editBuilder => editBuilder.replace(selection.range, output))
        }
    }
}

module.exports = {
    toMap,
    toArray
}