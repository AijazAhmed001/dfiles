import { projects } from '@/data';

export default function sitemap() {
  const base = 'https://aijaz-ahmed.vercel.app';
  return ['','/work','/about','/contact', ...projects.map(project => `/work/${project.slug}`)].map(path => ({ url: `${base}${path}`, lastModified: new Date() }));
}
