import vm from "vm";

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  error?: string;
}

export function runJavaScript(
  code: string,
  testCases: { input: string; expectedOutput: string }[]
): { status: "accepted" | "wrong_answer" | "runtime_error"; results: TestResult[]; score: number } {
  const results: TestResult[] = [];
  let passedCount = 0;

  for (const tc of testCases) {
    try {
      const sandbox: Record<string, unknown> = {};
      const context = vm.createContext(sandbox);

      const wrappedCode = `
        ${code}
        
        // Parse input and call solution
        const __input = ${JSON.stringify(tc.input)};
        let __result;
        
        if (typeof solution === 'function') {
          try {
            const parsed = JSON.parse(__input);
            __result = solution(...(Array.isArray(parsed) ? parsed : [parsed]));
          } catch {
            __result = solution(__input);
          }
        } else if (typeof main === 'function') {
          try {
            const parsed = JSON.parse(__input);
            __result = main(...(Array.isArray(parsed) ? parsed : [parsed]));
          } catch {
            __result = main(__input);
          }
        } else {
          throw new Error('Define a function named "solution" or "main"');
        }
        __result;
      `;

      const actual = vm.runInContext(wrappedCode, context, {
        timeout: 5000,
        displayErrors: true,
      });

      const actualStr = String(actual).trim();
      const expectedStr = tc.expectedOutput.trim();
      const passed = actualStr === expectedStr;

      if (passed) passedCount++;

      results.push({
        passed,
        input: tc.input,
        expected: expectedStr,
        actual: actualStr,
      });
    } catch (err) {
      results.push({
        passed: false,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: "",
        error: err instanceof Error ? err.message : "Runtime error",
      });
    }
  }

  const allPassed = passedCount === testCases.length;
  const score = Math.round((passedCount / testCases.length) * 100);

  return {
    status: allPassed ? "accepted" : results.some((r) => r.error) ? "runtime_error" : "wrong_answer",
    results,
    score,
  };
}

export function runPythonSimulated(
  code: string,
  testCases: { input: string; expectedOutput: string }[]
): { status: "accepted" | "wrong_answer" | "runtime_error"; results: TestResult[]; score: number } {
  // Convert basic Python patterns to JS for demo execution
  let jsCode = code
    .replace(/def\s+(\w+)\s*\(([^)]*)\)\s*:/g, "function $1($2) {")
    .replace(/print\s*\(/g, "console.log(")
    .replace(/:\s*$/gm, " {")
    .replace(/\belif\b/g, "else if")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/\bNone\b/g, "null")
    .replace(/\band\b/g, "&&")
    .replace(/\bor\b/g, "||")
    .replace(/\bnot\b/g, "!");

  // Rename function to solution if named differently
  const funcMatch = jsCode.match(/function\s+(\w+)/);
  if (funcMatch && funcMatch[1] !== "solution" && funcMatch[1] !== "main") {
    jsCode = jsCode.replace(`function ${funcMatch[1]}`, "function solution");
  }

  return runJavaScript(jsCode, testCases);
}

export function executeCode(
  code: string,
  language: string,
  testCases: { input: string; expectedOutput: string }[]
) {
  switch (language) {
    case "javascript":
      return runJavaScript(code, testCases);
    case "python":
      return runPythonSimulated(code, testCases);
    default:
      // For Java/C++, simulate with JS for demo - in production use Judge0 API
      return runJavaScript(
        code.replace(/public\s+\w+\s+\w+\s*\([^)]*\)\s*\{/g, "function solution() {")
            .replace(/int\s+main\s*\([^)]*\)\s*\{/g, "function main() {")
            .replace(/System\.out\.println/g, "console.log")
            .replace(/cout\s*<</g, "console.log("),
        testCases
      );
  }
}
