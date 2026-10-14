'use client';
import React, { useState, useMemo } from 'react';

export default function PasswordStrength() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    const pwd = password;
    if (!pwd) {
      return {
        score: 0,
        entropy: 0,
        crackTime: 'Instant',
        feedback: [] as string[],
        label: 'None',
        color: 'bg-gray-200',
      };
    }

    let charsetSize = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasNumber) charsetSize += 10;
    if (hasSymbol) charsetSize += 32;

    const entropy = pwd.length * Math.log2(charsetSize || 1);
    
    let score = 0;
    const feedback: string[] = [];

    if (pwd.length < 8) feedback.push('Password is too short. Use at least 8 characters, preferably 12+.');
    else if (pwd.length >= 12) score += 2;
    else score += 1;

    if (!hasLower) feedback.push('Add lowercase letters.');
    else score += 1;

    if (!hasUpper) feedback.push('Add uppercase letters.');
    else score += 1;

    if (!hasNumber) feedback.push('Add numbers.');
    else score += 1;

    if (!hasSymbol) feedback.push('Add special characters or symbols.');
    else score += 1;

    if (/(.)\\1{2,}/.test(pwd)) {
      feedback.push('Avoid repeating characters (e.g., "aaa").');
      score -= 1;
    }

    // Top 10 common passwords check (simple subset for example)
    const commonPasswords = ['password', '123456', '123456789', 'qwerty', 'password123'];
    if (commonPasswords.includes(pwd.toLowerCase())) {
      feedback.push('This is a very common password. DO NOT USE IT.');
      score = 0;
    }

    score = Math.max(0, Math.min(5, score));

    let label = 'Very Weak';
    let color = 'bg-red-500';
    if (score === 2) { label = 'Weak'; color = 'bg-orange-500'; }
    if (score === 3) { label = 'Fair'; color = 'bg-yellow-500'; }
    if (score === 4) { label = 'Strong'; color = 'bg-blue-500'; }
    if (score === 5) { label = 'Very Strong'; color = 'bg-green-500'; }

    // Crack time estimation (rough estimate at 100 billion guesses/sec)
    const guessesPerSecond = 100000000000;
    const combinations = Math.pow(charsetSize, pwd.length);
    const seconds = combinations / guessesPerSecond;
    
    let crackTime = '';
    if (seconds < 1) crackTime = 'Instant';
    else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
    else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
    else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
    else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
    else if (seconds < 3153600000) crackTime = `${Math.round(seconds / 31536000)} years`;
    else crackTime = 'Centuries';

    return { score, entropy, crackTime, feedback, label, color };
  }, [password]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-xl border p-6 bg-white dark:bg-gray-900 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Test Your Password</h2>
        
        <div className="relative mb-8">
          <input 
            type={showPassword ? "text" : "password"} 
            className="w-full border-2 border-gray-300 dark:border-gray-700 p-4 rounded-xl text-lg dark:bg-gray-800 pr-12 focus:border-blue-500 outline-none transition-colors"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Type a password to test..."
          />
          <button 
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {password && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Strength: <span className={analysis.color.replace('bg-', 'text-')}>{analysis.label}</span></span>
                <span className="text-sm text-gray-500">Estimated Crack Time: <strong>{analysis.crackTime}</strong></span>
              </div>
              <div className="flex gap-1 h-3 w-full">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`flex-1 rounded-full ${level <= analysis.score ? analysis.color : 'bg-gray-200 dark:bg-gray-700'}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div>
                <span className="block text-gray-500">Length</span>
                <strong className="text-lg">{password.length} characters</strong>
              </div>
              <div>
                <span className="block text-gray-500">Entropy</span>
                <strong className="text-lg">~{Math.round(analysis.entropy)} bits</strong>
              </div>
            </div>

            {analysis.feedback.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Suggestions to improve:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {analysis.feedback.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 py-3 rounded-lg flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Processed locally in your browser. No passwords are sent to our servers.
        </div>
      </div>
    </div>
  );
}
