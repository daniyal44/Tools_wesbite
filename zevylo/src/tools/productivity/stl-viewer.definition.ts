import { ToolDefinition } from '@/lib/tools/types';

export const stlViewerDefinition: ToolDefinition = {
  id: 'stl-viewer',
  slug: 'stl-viewer',
  name: '3D STL File Viewer & Inspector',
  shortDescription: 'Preview, rotate, and inspect 3D STL CAD models in browser without any plugins.',
  longDescription: 'Direct alternative to Vectary and ViewSTL. Pure client-side 3D viewer supporting both Binary and ASCII STL file formats. Inspect 3D models with interactive mouse drag rotation, zoom, wireframe and solid lighting modes, bounding box dimension measurements (X, Y, Z in mm), triangle / facet counters, and sample models (Cube, Prism, Tetrahedron). Completely private: files are never uploaded to any remote server.',
  category: 'productivity',
  icon: 'box',
  keywords: ['stl viewer', 'view stl', 'vectary alternative', 'viewstl alternative', '3d stl viewer online', 'cad viewer', '3d print file preview', 'ascii stl viewer'],
  searchableText: 'stl viewer viewstl vectary 3d file viewer cad 3d printing inspect mesh triangles wireframe rotation zoom binary ascii stl',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: false,
  seo: {
    title: '3D STL Viewer Online - Free Interactive CAD & Mesh Inspector',
    description: 'Inspect 3D STL files for 3D printing directly in your browser. Features 360 degree rotation, wireframe toggle, triangle count, and bounding box dimensions.',
    keywords: ['stl viewer online', 'view stl free', '3d model previewer', 'viewstl', 'vectary alternative', 'cad viewer online'],
  },
  faq: [
    {
      question: 'Does this viewer support both Binary and ASCII STL files?',
      answer: 'Yes! The custom parser auto-detects whether the file header is Binary STL (standard 80-byte header + triangle count) or ASCII STL (plain-text facet coordinates).',
    },
    {
      question: 'Are my CAD files uploaded to any server?',
      answer: 'Never. All 3D rendering and mesh calculations happen 100% locally in your browser memory using HTML5 Canvas.',
    },
  ],
  relatedTools: ['aspect-ratio-calculator', 'image-cropper', 'sprint-retro-board'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'src/tools/productivity/stl-viewer',
};
