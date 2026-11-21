# Zevylo AI Tools - Rules & Policies

## Indexing Rules

### 1. No Duplicate Entries
- Each tool must have a unique `id` and `slug`
- Duplicate tools by the same provider will be grouped under subcategories
- Example: OpenAI tools (ChatGPT, DALL-E 3, Whisper, Sora) all under `ai-chatbots`/`ai-image-generation`/`ai-audio-music`/`ai-video`

### 2. No Terms & Policy Violations
- All tools must link to official vendor sites only
- Pricing information must be current and verified
- Descriptions must be accurate to the best of public knowledge
- No adult, illegal, or harmful content allowed

### 3. Subcategory Structure
- Tools are grouped by parent company
- OpenAI sub-models go under `ai-chatbots`, `ai-image-generation`, `ai-audio-music`, `ai-video`
- Google sub-models go under `ai-chatbots`, `ai-education`
- Subcategory format: `{parent-model}` (e.g., `GPT-4o`, `Gemini Nano`)

### 4. Latest Information Requirement
- All tools must have `launchYear` >= 2022
- Tools without recent updates may be marked as `upcoming` or removed
- Monthly updates recommended for pricing and feature changes

### 5. Mandatory Fields
Every tool entry must have:
- `id`: Unique identifier
- `name`: Display name
- `slug`: URL-friendly identifier
- `tagline`: One-line description
- `description`: Detailed description
- `category`: Main AI category
- `categoryName`: Human-readable category name
- `subcategory`: Specific sub-model or function
- `url`: Official website URL
- `pricing`: Pricing model (`free`, `freemium`, `paid`, `free-trial`, `open-source`)
- `startingPrice`: Starting price string
- `trending`: Boolean for trending status
- `featured`: Boolean for featured status
- `tags`: Array of keyword tags
- `keyFeatures`: Array of key features
- `pros`: Array of advantages
- `cons`: Array of disadvantages
- `alternatives`: Array of alternative tools
- `launchYear`: Year of launch
- `country`: Country of origin
- `countryCode`: ISO country code
- `flagEmoji`: Country flag emoji
- `status`: Launch status (`launched`, `beta`, `upcoming`)

### 6. Company Field
- New entries must include `company: 'OpenAI' | 'Google' | 'Anthropic' | 'Meta' | 'Microsoft' | other known AI company`
- Used for grouping and filtering in the UI

### 7. Blog & Article Automation
- New tool additions trigger blog post generation
- Articles saved to `memory.md` and `rules.md`
- Automatic GitHub push on changes
- No duplicate content across articles

### 8. GitHub Integration
- All changes tracked in Git
- Automatic push on new tool additions
- Report generation and push on schedule
- Commit message format: "Add {n} new AI tools with subcategories - {date}"

### 9. Indexing Health Check
- /ai-tools page should have complete coverage
- Missing tools should be flagged
- Orphaned tools (no category) should be reviewed
- 328 pages index target must be met or exceeded

### 10. Quality Guidelines
- Minimum 2 features per tool
- Maximum 3 alternatives listed
- At least 1 pro and 1 con per tool
- Pricing must be clearly stated (free, freemium, or paid)

### 11. Open-Source Classification
- Clearly distinguish between open-source software, open-weight models, source-available models, and proprietary hosted models
- Do not incorrectly label every downloadable or open-weight model as fully open source
- Use stable unique IDs for all entries

### 12. Duplicate Prevention
- Deduplication must consider: normalized product names, company ownership, official domain, product aliases, existing URLs, product identity
- A model must not become a duplicate product merely because it has a different version number
- Preserve version history where useful

### 13. Category Coverage
- All 36+ AI categories must have representative tools
- Categories without tools should be flagged for research and addition
- Regular gap analysis against competitor directories

### 14. Update Sitemap
- Update the sitemap when eligible public URLs change
- Ensure all eligible canonical, indexable URLs are included
- Exclude redirecting URLs, duplicate URLs, non-canonical URLs, private pages, admin pages, internal search result URLs, thin or empty pages, noindex pages, broken pages