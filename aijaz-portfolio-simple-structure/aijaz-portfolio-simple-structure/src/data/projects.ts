export type Project = {
  title: string
  category: string
  description: string
  stack: string[]
  href: string
}

export const projects: Project[] = [
  {
    title: 'EFU IT Inventory System',
    category: 'Enterprise Platform',
    description: 'A hardware inventory and asset-management platform built for clear operational visibility.',
    stack: ['React', 'TypeScript', '.NET', 'SQL Server'],
    href: '#',
  },
  {
    title: 'EFU Mobile App',
    category: 'Mobile Experience',
    description: 'A clean mobile insurance experience focused on speed, clarity, and simple interaction.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    href: '#',
  },
  {
    title: 'AI Analytics Dashboard',
    category: 'Data Product',
    description: 'A modern analytics interface combining KPIs, charts, data exploration, and AI assistance.',
    stack: ['React', 'TypeScript', 'AI'],
    href: '#',
  },
]
