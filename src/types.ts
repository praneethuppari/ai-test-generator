// TODO: Define shared TypeScript interfaces and types

export interface TestCase {
    name: string;
    input: any;
    expected: any;
}

export interface FunctionInfo {
    name: string;
    parameters: string[];
    isAsync: boolean;
    returnType?: string;
    code: string;
    startLine: number;
    endLine: number;
}
