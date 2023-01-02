const vscode = require('vscode');
const strings = require('./strings.js')
const maps = require('./maps.js')

/**
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function activate(context) {

	let commands = []

	commands.push(vscode.commands.registerCommand('quick-type.addDoubleQuotes', () => strings.addQuotes('"')))
	commands.push(vscode.commands.registerCommand('quick-type.addSingleQuotes', () => strings.addQuotes("'")))
	commands.push(vscode.commands.registerCommand('quick-type.addTickQuotes', () => strings.addQuotes("`")))
	commands.push(vscode.commands.registerCommand('quick-type.toMap', maps.toMap))


	for (const command of commands) {
		context.subscriptions.push(command)
	}

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
