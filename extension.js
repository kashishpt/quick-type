const vscode = require('vscode');
const strings = require('./functions/strings.js')
const dataStructs = require('./functions/data-structs.js')

/**
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function activate(context) {

	let commands = {
		'quick-type.addDoubleQuotes': ()=>strings.addQuotes('"'),
		'quick-type.addSingleQuotes': ()=>strings.addQuotes("'"),
		'quick-type.addTickQuotes': ()=>strings.addQuotes('`'),
		'quick-type.toMap': dataStructs.toMap,
		'quick-type.toArray': dataStructs.toArray,
	}



	for (const command in commands) {
		context.subscriptions.push(vscode.commands.registerCommand(command, commands[command]))
	}

	// for (const command of commands) {
	// 	context.subscriptions.push(command)
	// }

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}