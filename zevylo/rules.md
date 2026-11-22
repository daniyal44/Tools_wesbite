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

### 15. Internal Linking Architecture
- Every valuable public page should be reachable through relevant internal links
- Implement breadcrumbs on all directory and tool pages
- Add related tools, related categories, and similar products sections
- Avoid orphan pages and circular links
- Cross-link relevant products across both `/tools` and `/ai-tools` directories

### 16. Keyword Research and SEO Strategy
- Build a real keyword database for both directories
- Research search demand and identify search intent
- Group keywords by topic and map each keyword to the most appropriate page
- Identify cannibalization and create new pages only when justified
- Improve existing pages where appropriate
- Track ranking and impressions when Search Console data is available
- Every indexable page must have: unique title, unique meta description, correct H1, logical H2/H3 structure, canonical URL, appropriate robots directive, relevant internal links, image alt text, structured data where eligible, original useful content, and clear search intent
- Do not generate hundreds of near-identical keyword landing pages

### 17. AEO (Answer Engine Optimization)
- Make important content easy to understand and extract
- Use direct answers, definitions, product specifications, comparison tables
- Include frequently asked questions, accurate feature descriptions, source citations
- Use clear headings and structured data where eligible

### 18. GEO (Generative Engine Optimization)
- Improve entity clarity and source credibility
- Use consistent brand and product names, company-product relationships
- Include original research, trustworthy sources, transparent updates
- Clear product specifications and relevant contextual links
- Do not promise specific Google or AI answer-engine rankings

### 19. Backlink Strategy
- Build a sustainable backlink and digital PR strategy
- Research opportunities: relevant software directories, startup directories, product launch platforms
- Developer communities, open-source communities, industry publications
- Create linkable original research, useful free tools, comparison resources
- Industry statistics with sources, tool discovery reports
- Maintain a backlink opportunity register tracking: domain, relevant page, contact method, relevance, link status, destination page, follow-up status
- Rules: No paid link schemes, no automated spam submissions, no private blog network links
- No fake profiles, no irrelevant directories, no unauthorized link insertion
- No fabricated partnerships, no misleading anchor text
- Prioritize genuine editorial links and relevant referrals

### 20. Sitemap and Robots.txt
- Audit both directories and the entire website
- Sitemap: Include every eligible canonical public page, exclude redirects, duplicate URLs, non-canonical pages, noindex pages, private pages, admin pages, thin or empty pages, internal search results
- Ensure valid XML, HTTPS URLs, correct canonical URLs, accurate lastmod dates, sitemap index where appropriate, accessible sitemap URL
- Robots.txt: Review existing rules, do not accidentally block `/tools/` and `/ai-tools/`, public product pages, public categories, public articles, necessary CSS and JavaScript assets
- Protect private routes and administrative endpoints
- Include the correct sitemap declaration
- Remember: robots.txt does not directly index pages; it controls crawler access

### 21. 232-Page Indexing Investigation
- Treat as a critical standalone project
- Identify exactly which 232 URLs are affected
- Use Google Search Console if access is available
- Classify: Discovered but not indexed, Crawled but not indexed, Duplicate pages, Incorrect canonical, Google-selected canonical mismatch, Noindex, Robots blocked, Soft 404, Actual 404, Redirect, Server error, Thin content, Other reported causes
- For every affected URL: inspect the page, check HTTP status, check canonical, check robots directives, check content quality, check internal links, check rendering, identify root cause, implement an appropriate fix
- Prioritize high-value `/ai-tools` and `/tools` pages
- Do not remove valuable pages merely to reduce the number of unindexed URLs
- Do not request indexing for every URL indiscriminately
- Submit updated sitemaps and monitor results
- Google controls final indexing decisions

### 22. Automatic Update Engine
- Build a reliable recurring update system
- Recommended schedule:
  - Daily: AI launches, new general tools, official announcements, newly released open-source projects, broken link detection, pricing and availability changes
  - Weekly: Competitor gap research, product verification, tool database updates, new articles, trending collections
  - Monthly: Full duplicate audit, SEO audit, indexing review, content quality review, competitor comparison, database integrity checks
- Implement using supported scheduled infrastructure, such as GitHub Actions or the existing backend
- Include: Logging, error handling, retry mechanisms, source verification, duplicate detection, change history, failed-job reporting, safe updates
- Do not claim automated updates work until the scheduled workflow has actually been configured and tested

### 23. Database and Data Quality
- Use a normalized, maintainable database
- Entities: Companies, Tools, Products, Models, Features, Categories, Pricing, Official links, Documentation, Articles, Sources, Comparisons, Product updates
- Each record should have: Stable ID, Normalized name, Official URL, Category, Description, Status, Pricing classification, Verification date, Source references
- Use: Unique constraints, Alias matching, URL normalization, Duplicate detection, Safe migrations, Audit logs, Version history
- One product must not appear as multiple unrelated records just because competitors use different names or categories

---

## Definition of Done

The project is complete only when:

- Both directories have been audited
- Old valuable data is preserved
- Competitor gaps have been researched
- Verified AI tools have been added
- Verified general tools have been added
- Free and paid classifications are accurate
- On-demand tools are discoverable
- Company/product/model hierarchy works
- Search and filters work
- Users can discover recommended tools
- Related pages are connected
- Duplicate prevention works
- Article discovery workflow works
- SEO/AEO/GEO improvements are tested
- Keyword mapping exists
- Backlink opportunities are documented
- Sitemap is validated
- Robots rules are verified
- The 232-page issue has been investigated
- memory.md and rules.md are updated
- Production build and applicable tests pass
- GitHub changes are pushed, when authorized
- Deployment is verified where possible
- Final reports exist in the repository

Use real numbers only.