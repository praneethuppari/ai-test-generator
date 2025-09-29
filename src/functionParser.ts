// src/functionParser.ts
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { FunctionInfo } from './types';

export function extractFunctionInfo(code: string): FunctionInfo | null {
    try {
        // Step 1. Parse code with Babel
        const ast = parse(code, {
            sourceType: 'script',
            plugins: ['typescript', 'jsx']
        });

         let functionInfo: FunctionInfo | null = null;
    
        // Step 2: Traverse - find the function in the AST
        traverse(ast, {
            FunctionDeclaration(path) {
                // Found a function declaration!
                // Step 3. Extract function name, params, async status
                functionInfo = {
                    name: path.node.id?.name || 'anonymous',
                    parameters: path.node.params.map(p => {
                        if (p.type === 'Identifier') {
                            return p.name;
                        }
                        return 'unknown';
                    }),
                    isAsync: path.node.async,
                    code: code,
                    startLine: path.node.loc?.start.line || 0,
                    endLine: path.node.loc?.end.line || 0
                };
            
                // Stop traversing once we found it
                path.stop();
            }
        });
    
        // Step 4. Return functionInfo object
        return functionInfo;
        

    } catch (error) {
        console.error('Failed to parse function:', error);
        return null;
    }
}