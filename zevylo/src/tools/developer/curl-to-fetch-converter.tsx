'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Terminal, Play, RotateCcw } from 'lucide-react';

interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
  auth: string | null;
}

const SAMPLE_CURLS: Record<string, string> = {
  simpleGet: `curl "https://api.github.com/users/octocat" -H "Accept: application/vnd.github.v3+json"`,
  postJson: `curl -X POST https://api.example.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer my_secret_token_123" \\
  -d '{"email":"developer@example.com","password":"securePassword123"}'`,
  formData: `curl -X POST https://httpbin.org/post \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "user=alice&status=active&priority=high"`,
};

function parseCurl(rawCurl: string): ParsedCurl {
  const result: ParsedCurl = {
    url: '',
    method: 'GET',
    headers: {},
    body: null,
    auth: null,
  };

  if (!rawCurl.trim()) return result;

  // Clean multiline escapes and unify whitespace
  const cleaned = rawCurl
    .replace(/\\\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Tokenize while respecting single and double quotes
  const tokens: string[] = [];
  let currentToken = '';
  let inQuote: '"' | "'" | null = null;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (inQuote) {
      if (char === inQuote) {
        inQuote = null;
      } else {
        currentToken += char;
      }
    } else {
      if (char === '"' || char === "'") {
        inQuote = char;
      } else if (char === ' ') {
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = '';
        }
      } else {
        currentToken += char;
      }
    }
  }
  if (currentToken.length > 0) tokens.push(currentToken);

  let i = 0;
  if (tokens[0]?.toLowerCase() === 'curl') i = 1;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token === '-X' || token === '--request') {
      result.method = (tokens[i + 1] || 'GET').toUpperCase();
      i += 2;
    } else if (token === '-H' || token === '--header') {
      const headerLine = tokens[i + 1] || '';
      const splitIdx = headerLine.indexOf(':');
      if (splitIdx > 0) {
        const key = headerLine.slice(0, splitIdx).trim();
        const value = headerLine.slice(splitIdx + 1).trim();
        result.headers[key] = value;
      }
      i += 2;
    } else if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary') {
      result.body = tokens[i + 1] || '';
      if (result.method === 'GET') result.method = 'POST';
      i += 2;
    } else if (token === '-u' || token === '--user') {
      result.auth = tokens[i + 1] || null;
      i += 2;
    } else if (!token.startsWith('-') && !result.url) {
      result.url = token.replace(/^['"]|['"]$/g, '');
      i++;
    } else {
      i++;
    }
  }

  return result;
}

function generateFetch(parsed: ParsedCurl): string {
  if (!parsed.url) return '// Enter a valid cURL command above to generate code';

  const headers = { ...parsed.headers };
  if (parsed.auth) {
    headers['Authorization'] = `Basic ${btoa(parsed.auth)}`;
  }

  const options: Record<string, unknown> = {
    method: parsed.method,
  };

  if (Object.keys(headers).length > 0) {
    options.headers = headers;
  }

  if (parsed.body && parsed.method !== 'GET' && parsed.method !== 'HEAD') {
    try {
      JSON.parse(parsed.body);
      options.body = `JSON.stringify(${parsed.body})`;
    } catch {
      options.body = JSON.stringify(parsed.body);
    }
  }

  let code = `const response = await fetch(${JSON.stringify(parsed.url)}, {\n`;
  code += `  method: ${JSON.stringify(parsed.method)},\n`;
  if (Object.keys(headers).length > 0) {
    code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n`;
  }
  if (parsed.body && parsed.method !== 'GET') {
    code += `  body: ${options.body},\n`;
  }
  code += `});\n\nconst data = await response.json();\nconsole.log(data);`;

  return code;
}

function generateAxios(parsed: ParsedCurl): string {
  if (!parsed.url) return '// Enter a valid cURL command above to generate code';

  const headers = { ...parsed.headers };
  if (parsed.auth) {
    headers['Authorization'] = `Basic ${btoa(parsed.auth)}`;
  }

  let code = `import axios from 'axios';\n\n`;
  code += `const config = {\n`;
  code += `  method: ${JSON.stringify(parsed.method.toLowerCase())},\n`;
  code += `  url: ${JSON.stringify(parsed.url)},\n`;

  if (Object.keys(headers).length > 0) {
    code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n`;
  }

  if (parsed.body && parsed.method !== 'GET') {
    try {
      const parsedBody = JSON.parse(parsed.body);
      code += `  data: ${JSON.stringify(parsedBody, null, 4).replace(/\n/g, '\n  ')},\n`;
    } catch {
      code += `  data: ${JSON.stringify(parsed.body)},\n`;
    }
  }
  code += `};\n\nconst response = await axios(config);\nconsole.log(response.data);`;

  return code;
}

function generatePython(parsed: ParsedCurl): string {
  if (!parsed.url) return '# Enter a valid cURL command above to generate code';

  let code = `import requests\n\nurl = ${JSON.stringify(parsed.url)}\n`;

  if (Object.keys(parsed.headers).length > 0) {
    code += `headers = ${JSON.stringify(parsed.headers, null, 4)}\n`;
  } else {
    code += `headers = {}\n`;
  }

  if (parsed.body && parsed.method !== 'GET') {
    try {
      const parsedBody = JSON.parse(parsed.body);
      code += `payload = ${JSON.stringify(parsedBody, null, 4)}\n`;
      code += `response = requests.${parsed.method.toLowerCase()}(url, headers=headers, json=payload)\n`;
    } catch {
      code += `payload = ${JSON.stringify(parsed.body)}\n`;
      code += `response = requests.${parsed.method.toLowerCase()}(url, headers=headers, data=payload)\n`;
    }
  } else {
    code += `response = requests.${parsed.method.toLowerCase()}(url, headers=headers)\n`;
  }

  code += `\nprint(response.status_code)\nprint(response.json())`;
  return code;
}

function generateGo(parsed: ParsedCurl): string {
  if (!parsed.url) return '// Enter a valid cURL command above to generate code';

  let code = `package main\n\nimport (\n\t"fmt"\n\t"io"\n\t"net/http"\n`;
  if (parsed.body && parsed.method !== 'GET') {
    code += `\t"strings"\n`;
  }
  code += `)\n\nfunc main() {\n`;

  if (parsed.body && parsed.method !== 'GET') {
    code += `\tpayload := strings.NewReader(${JSON.stringify(parsed.body)})\n`;
    code += `\treq, err := http.NewRequest("${parsed.method}", "${parsed.url}", payload)\n`;
  } else {
    code += `\treq, err := http.NewRequest("${parsed.method}", "${parsed.url}", nil)\n`;
  }

  code += `\tif err != nil {\n\t\tpanic(err)\n\t}\n\n`;

  Object.entries(parsed.headers).forEach(([k, v]) => {
    code += `\treq.Header.Add("${k}", "${v}")\n`;
  });

  code += `\n\tres, err := http.DefaultClient.Do(req)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer res.Body.Close()\n\n`;
  code += `\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}`;

  return code;
}

export default function CurlToFetchConverter() {
  const [curlInput, setCurlInput] = useState<string>(SAMPLE_CURLS.postJson);
  const [selectedLanguage, setSelectedLanguage] = useState<'fetch' | 'axios' | 'python' | 'go'>('fetch');
  const [copied, setCopied] = useState<boolean>(false);

  const parsed = useMemo(() => parseCurl(curlInput), [curlInput]);

  const generatedCode = useMemo(() => {
    switch (selectedLanguage) {
      case 'fetch':
        return generateFetch(parsed);
      case 'axios':
        return generateAxios(parsed);
      case 'python':
        return generatePython(parsed);
      case 'go':
        return generateGo(parsed);
    }
  }, [parsed, selectedLanguage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header controls & sample picker */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">Presets & Quick Test:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurlInput(SAMPLE_CURLS.simpleGet)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            GET Request
          </button>
          <button
            onClick={() => setCurlInput(SAMPLE_CURLS.postJson)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            POST JSON + Bearer
          </button>
          <button
            onClick={() => setCurlInput(SAMPLE_CURLS.formData)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Form URL-Encoded
          </button>
          <button
            onClick={() => setCurlInput('')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input cURL */}
        <div className="flex flex-col h-[520px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Input cURL Command
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Paste command directly</span>
          </div>
          <div className="flex-1 p-3">
            <textarea
              value={curlInput}
              onChange={(e) => setCurlInput(e.target.value)}
              placeholder="curl -X POST https://api.example.com/data -H 'Content-Type: application/json' -d '{...}'"
              className="w-full h-full font-mono text-xs sm:text-sm p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              spellCheck={false}
            />
          </div>
          {parsed.url && (
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-850 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between">
              <span className="truncate max-w-[70%] font-mono">
                <strong className="text-indigo-600 dark:text-indigo-400">{parsed.method}</strong> {parsed.url}
              </span>
              <span>{Object.keys(parsed.headers).length} header(s)</span>
            </div>
          )}
        </div>

        {/* Right Column: Code Output */}
        <div className="flex flex-col h-[520px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
            <div className="flex rounded-lg bg-gray-200 dark:bg-gray-700 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setSelectedLanguage('fetch')}
                className={`px-3 py-1 rounded-md transition ${
                  selectedLanguage === 'fetch'
                    ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Fetch
              </button>
              <button
                onClick={() => setSelectedLanguage('axios')}
                className={`px-3 py-1 rounded-md transition ${
                  selectedLanguage === 'axios'
                    ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Axios
              </button>
              <button
                onClick={() => setSelectedLanguage('python')}
                className={`px-3 py-1 rounded-md transition ${
                  selectedLanguage === 'python'
                    ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setSelectedLanguage('go')}
                className={`px-3 py-1 rounded-md transition ${
                  selectedLanguage === 'go'
                    ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Go
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </div>

          <div className="flex-1 p-3 bg-gray-900 overflow-auto">
            <pre className="font-mono text-xs sm:text-sm text-emerald-400 whitespace-pre leading-relaxed">
              {generatedCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
