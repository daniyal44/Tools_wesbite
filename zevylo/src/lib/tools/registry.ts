import { ToolDefinition, ToolCategory } from './types';

// Central tool registry - all tools register here
const toolRegistry: Map<string, ToolDefinition> = new Map();

export function registerTool(tool: ToolDefinition): void {
  if (toolRegistry.has(tool.id)) {
    console.warn(`Tool "${tool.id}" is already registered. Overwriting.`);
  }
  toolRegistry.set(tool.id, tool);
}

export function registerTools(tools: ToolDefinition[]): void {
  tools.forEach(registerTool);
}

export function getToolById(id: string): ToolDefinition | undefined {
  return toolRegistry.get(id);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  for (const tool of toolRegistry.values()) {
    if (tool.slug === slug) return tool;
  }
  return undefined;
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return Array.from(toolRegistry.values())
    .filter((t) => t.category === category && t.status !== 'disabled' && t.visibility === 'public')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllTools(): ToolDefinition[] {
  return Array.from(toolRegistry.values())
    .filter((t) => t.status !== 'disabled' && t.visibility === 'public')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getActiveTools(): ToolDefinition[] {
  return Array.from(toolRegistry.values())
    .filter((t) => t.status === 'active' && t.visibility === 'public')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPopularTools(limit = 12): ToolDefinition[] {
  return getActiveTools().slice(0, limit);
}

export function getRelatedTools(toolId: string, limit = 6): ToolDefinition[] {
  const tool = getToolById(toolId);
  if (!tool) return [];

  const related: ToolDefinition[] = [];

  // First, add explicitly related tools
  for (const relatedId of tool.relatedTools) {
    const relatedTool = getToolById(relatedId);
    if (relatedTool && relatedTool.status === 'active') {
      related.push(relatedTool);
    }
  }

  // If not enough, add from same category
  if (related.length < limit) {
    const categoryTools = getToolsByCategory(tool.category)
      .filter((t) => t.id !== toolId && !related.find((r) => r.id === t.id));
    related.push(...categoryTools.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}

export function searchTools(query: string): ToolDefinition[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/);

  const results = getActiveTools()
    .map((tool) => {
      let score = 0;
      const searchText = tool.searchableText.toLowerCase();
      const name = tool.name.toLowerCase();
      const slug = tool.slug.toLowerCase();

      // Exact name match
      if (name === normalizedQuery) score += 100;
      // Name starts with query
      else if (name.startsWith(normalizedQuery)) score += 50;
      // Name contains query
      else if (name.includes(normalizedQuery)) score += 30;

      // Slug match
      if (slug.includes(normalizedQuery)) score += 25;

      // Keyword match
      for (const keyword of tool.keywords) {
        if (keyword.toLowerCase() === normalizedQuery) score += 40;
        else if (keyword.toLowerCase().includes(normalizedQuery)) score += 15;
      }

      // Search text match
      for (const term of queryTerms) {
        if (searchText.includes(term)) score += 10;
      }

      // Category match
      if (tool.category.includes(normalizedQuery)) score += 20;

      return { tool, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ tool }) => tool);

  return results;
}

export function getToolCount(): number {
  return getActiveTools().length;
}

export function getCategoriesWithToolCount(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const tool of getActiveTools()) {
    counts.set(tool.category, (counts.get(tool.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
