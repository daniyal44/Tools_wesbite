import React from 'react';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  company: string;
  category: string;
  tagline: string;
  description: string;
  readingTime?: number;
  mdxSource?: ReturnType<typeof serialize>;
}

interface Metadata {
  title: string;
  date: string;
  company: string;
  category: string;
  tagline: string;
  description: string;
}

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), 'public', 'blog');

  let posts: BlogPost[] = [];

  try {
    // Read all markdown files from the blog directory
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') && f !== 'index.md');

    posts = files.map(file => {
      const fileContent = fs.readFileSync(path.join(blogDir, file), 'utf8');
      
      // Extract frontmatter
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      let metadata: Metadata = {
        title: '',
        date: '',
        company: 'Unknown',
        category: '',
        tagline: '',
        description: '',
      };

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const frontmatterParsed = frontmatter.split('\n').reduce((acc: any, line) => {
          const match = line.match(/^(\w+):\s*(.+)$/);
          if (match) {
            acc[match[1]] = match[2].trim();
          }
          return acc;
        }, {});

        metadata = {
          title: frontmatterParsed.title || 'Untitled',
          date: frontmatterParsed.date || new Date().toISOString().split('T')[0],
          company: frontmatterParsed.company || 'Unknown',
          category: frontmatterParsed.category || '',
          tagline: frontmatterParsed.tagline || '',
          description: frontmatterParsed.description || '',
        };
      }

      // Extract the content after frontmatter
      const contentMatch = fileContent.match(/^---\n[\s\S]*?\n---\n(.*)$/);
      const content = contentMatch ? contentMatch[1] : '';

      // Parse with next-mdx-remote for React components
      const mdxSource = serialize(content);

      return {
        slug: file.replace('.md', ''),
        title: metadata.title,
        date: metadata.date,
        company: metadata.company,
        category: metadata.category,
        tagline: metadata.tagline,
        description: metadata.description,
        readingTime: readingTime(content)?.time,
        mdxSource,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    posts = [];
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-14 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            AI Tools Blog
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
            Discover the latest AI tools, models, and utilities from around the world.
          </p>
        </div>
      </div>

      <div className="prose lg:prose-xl max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Blog Posts</h2>

        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <h3 className="text-xl font-bold mb-4">Blog Posts</h3>
            <p>
              No blog posts found. Generate posts using <code>node scripts/generate-blog.mjs</code>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="group rounded-2xl border border-blue-200/20 bg-blue-50/50 backdrop-blur-sm overflow-hidden hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="ratio-16/10 bg-blue-100 dark:bg-blue-900 overflow-hidden">
                  {/* Company badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded bg-blue-600/90 text-blue-100">
                    {post.company !== 'Unknown' ? (
                      <span>{post.company}</span>
                    ) : (
                      <span>Unknown</span>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-blue-800 dark:text-blue-300 line-clamp-2">
                    {post.tagline}
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 line-clamp-2">
                    <a
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-valign-middle"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 01-1 1v2a1 1 0 11-2 0v-2A1 1 0 0110 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {post.date}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View all posts link */}
        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <a
              href="/blog"
              className="text-blue-600 hover underline text-sm font-medium"
            >
              View All {posts.length} Posts
            </a>
          </div>
        )}
      </div>
    </div>
  );
}