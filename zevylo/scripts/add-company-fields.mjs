#!/usr/bin/env node
/** 
 * add-company-fields.mjs
 * -------------------------------------------------------------
 * Adds missing company: 'CompanyName' fields to AI tools
 * in the database based on tool names and descriptions.
 * -------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'src', 'lib', 'ai-directory', 'database.ts');

/** Known companies and their possible name patterns */
const COMPANY_PATTERNS = {
  OpenAI: [
    /ChatGPT/i,
    /DALL-E/i,
    /Whisper/i,
    /Sora/i,
    /OpenAI/i
  ],
  Google: [
    /Gemini/i,
    /Bard/i,
    /Google/i
  ],
  Anthropic: [
    /Claude/i
  ],
  Meta: [
    /Llama/i,
    /AudioCraft/i,
    /Meta/i
  ],
  Microsoft: [
    /Copilot/i,
    /Bing/i,
    /Microsoft/i
  ],
  Amazon: [
    /Bedrock/i,
    /Titan/i,
    /Amazon/i
  ],
  Adobe: [
    /Firefly/i,
    /Premiere/i,
    /Adobe/i
  ]
};

/** Extract company from name or description */
function extractCompany(name, description) {
  const fullText = (name + ' ' + description).toLowerCase();
  
  // Check each known company
  for (const [company, patterns] of Object.entries(COMPANY_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(fullText)) {
        return company;
      }
    }
  }
  
  // Check for company in parentheses at end of name
  const parenMatch = name.match(/\(([^)]+)\)\s*$/);
  if (parenMatch) {
    const potentialCompany = parenMatch[1].trim();
    // Check if it's a known company
    for (const [company] of Object.entries(COMPANY_PATTERNS)) {
      if (potentialCompany.toLowerCase().includes(company.toLowerCase())) {
        return company;
      }
    }
  }
  
  return 'Unknown';
}

/** Add company field to a tool object string */
function addCompanyField(objString) {
  // Check if company field already exists
  if (objString.includes("company:")) {
    return objString; // Already has company field
  }
  
  // Extract name
  const nameMatch = objString.match(/name\s*:\s*['\"]([^'\"]+)'\s*[,)]/i);
  const name = nameMatch ? nameMatch[1] : '';
  
  // Extract description
  const descMatch = objString.match(/description\s*:\s*['\"]([^'\"]+)'\s*[,)]/i);
  const description = descMatch ? descMatch[1] : '';
  
  // Extract company
  const company = extractCompany(name, description);
  
  if (company === 'Unknown') {
    return objString; // Skip if can't determine
  }
  
  // Add company field after the opening brace
  const insertPos = objString.indexOf('{') + 1;
  
  // Insert company field
  const companyLine = `    company: '${company}',\n`;
  const newObj = objString.slice(0, insertPos) + companyLine + objString.slice(insertPos);
  
  return newObj;
}

async function main() {
  console.log('=== Adding Company Fields to Database ===');
  
  // Read database
  let src = fs.readFileSync(DB_PATH, 'utf8');
  
  // Match tool objects
  const toolObjRegex = /\{[^}]+\}/g;
  const toolMatches = src.match(toolObjRegex) || [];
  
  let modified = 0;
  let skipped = 0;
  let skippedUnknown = 0;
  
  // Process each tool object
  for (let i = 0; i < toolMatches.length; i++) {
    const obj = toolMatches[i];
    
    if (!obj.includes('id:') || !obj.includes('name:') || !obj.includes('slug:')) continue;
    
    // Skip if already has company field
    if (obj.includes("company:")) {
      skipped++;
      continue;
    }
    
    // Add company field
    const modifiedObj = addCompanyField(obj);
    
    if (modifiedObj !== obj) {
      // Replace in the source - need to do string replacement carefully
      const oldStr = JSON.stringify(obj).replace(/"/g, '\\"');
      const newStr = JSON.stringify(modifiedObj).replace(/"/g, '\\"');
      
      // Actually, let's just find the position and replace
      // Since objects can span multiple lines, we need a different approach
      
      // Find the position of this object in src
      const objStart = src.indexOf(obj);
      if (objStart === -1) {
        console.log('⚠️  Could not find object at index', i);
        skippedUnknown++;
        continue;
      }
      
      const objEnd = objStart + obj.length;
      const newSrc = src.substring(0, objStart) + modifiedObj + src.substring(objEnd);
      src = newSrc;
      
      modified++;
      const companyName = modifiedObj.match(/company:\s*'([^']+)'/)?.[1] || 'unknown';
      const toolName = obj.match(/name:\s*'([^']+)'/)?.[1] || 'unknown';
      console.log(`✅ Added company: ${companyName} to ${toolName}`);
    }
  }
  
  // Write back to database
  fs.writeFileSync(DB_PATH, src, 'utf8');
  
  console.log(`\n=== Complete ===`);
  console.log(`Modified: ${modified} tools`);
  console.log(`Already had company: ${skipped} tools`);
  console.log(`Could not determine: ${skippedUnknown} tools`);
  console.log(`Total tools processed: ${toolMatches.length}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});