// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { extractFunctionInfo } from './functionParser';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ai-test-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('ai-test-generator.generateTests', async () => {

		const editor = vscode.window.activeTextEditor;
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ai-test-generator!');

		if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

		const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        
        if (!selectedText) {
            vscode.window.showErrorMessage('Please select a function to generate tests for');
            return;
        }

		// Extract function info
        const functionInfo = extractFunctionInfo(selectedText);
        
        if (!functionInfo) {
            vscode.window.showErrorMessage('Could not parse function. Make sure you selected a valid function.');
            return;
        }

        // For now, just show the extracted info
        vscode.window.showInformationMessage(
            `Found function: ${functionInfo.name} with ${functionInfo.parameters.length} parameters`
        );
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
