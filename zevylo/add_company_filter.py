#!/usr/bin/env python3
import re

with open('src/app/ai-tools/ai-tools-client.tsx', 'r') as f:
    content = f.read()

# Find the category filter pills section and add company filter pills after it
# The category filter ends with: ))}  </div>
# We want to insert company filters after the closing </div> of category filters

# Pattern: find the line with "))}" followed by </div> and insert company filters
# Actually, let's find the specific pattern and insert after it

# Look for the category filter pills div ending pattern
pattern = r'''\n            \)\n          \)\n        \]\n      \}\n    \}\n  \]'''

# Actually, let's use a simpler line-number based approach
# The category filter pills are around lines 402-425
# Let me find the exact insertion point

# Insert company filter pills after the category filter pills div closes
# The category filter ends with:            </div>\n

# Find "Filter by AI Category" and the closing div after it
lines = content.split('\n')
new_lines = []
inserted = False

for i, line in enumerate(lines):
    new_lines.append(line)
    # After we see "Filter by AI Category", insert company filters after the closing div
    if 'Filter by AI Category' in line and not inserted:
        # Look ahead to find the closing </div> of the category filter pills
        # The pattern is: after several lines of category buttons, there's a </div>
        # We want to insert after that </div>
        # Let me just track when we've passed the category filter section
        # and insert after the next </div> that appears
        # Actually, let's just find the line number pattern
        pass

# Simpler approach: find line 423 which should be the closing </div> of category filters
# and insert after it

for i, line in enumerate(lines):
    new_lines.append(line)
    # Insert after line 423 (0-indexed: 422) which is the closing </div> of category filters
    if i == 422 and 'Filter by AI Category' in lines[401]:
        # Insert company filter pills after this line
        new_lines.append('')
        new_lines.append('          {/* Company Filter Pills */}')
        new_lines.append('          <div className="space-y-3">')
        new_lines.append('            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">')
        new_lines.append('              Filter by Company:')
        new_lines.append('            </span>')
        new_lines.append('            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">')
        new_lines.append('              <button')
        new_lines.append('                type="button"')
        new_lines.append('                onClick={() => setSelectedCategory(\'all\')}')
        new_lines.append('                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all {`)
        new_lines.append('                  selectedCategory === \'all\'')
        new_lines.append('                    ? \'bg-blue-600 text-white shadow-sm\'')
        new_lines.append('                    : \'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200\'')
        new_lines.append('                }`}')
        new_lines.append('              >')
        new_lines.append('                All AI Tools ({AI_TOOLS_DATABASE.length})')
        new_lines.append('              </button>')
        new_lines.append('              {categories.map((comp) => (')
        new_lines.append('                <button')
        new_lines.append('                  key={comp.id}')
        new_lines.append('                  type="button"')
        new_lines.append('                  onClick={() => setSelectedCategory(comp.id)}')
        new_lines.append('                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all {')
        new_lines.append('                    selectedCategory === comp.id')
        new_lines.append('                      ? \'bg-blue-600 text-white shadow-sm\'')
        new_lines.append('                      : \'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200\'')
        new_lines.append('                  }`}')
        new_lines.append('                >')
        new_lines.append('                  {comp.name}')
        new_lines.append('                </button>')
        new_lines.append('              ))}')
        new_lines.append('            </div>')
        new_lines.append('          </div>')
        inserted = True
        # Skip the original category filter lines we don't want to duplicate
        # We'll let the original category filters stay, just add company filters after

with open('src/app/ai-tools/ai-tools-client.tsx', 'w') as f:
    f.write('\n'.join(new_lines))

print("Done! Company filter pills added.")