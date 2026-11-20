/** Keep meta descriptions within the ~158 character SERP limit without cutting mid-word. */
export function clampDescription(input: string, max = 150): string {
  const clean = input.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const body = lastSpace > 60 ? cut.slice(0, lastSpace) : cut;
  return `${body.replace(/[.,;:!?—-]+$/, '')}…`;
}
