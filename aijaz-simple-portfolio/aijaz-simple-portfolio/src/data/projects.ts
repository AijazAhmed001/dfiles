import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'EFU IT Inventory System',
    category: 'Enterprise Web App',
    description: 'A hardware inventory platform for asset tracking, allocations, reports and administration.',
    tech: ['React', 'TypeScript', '.NET', 'SQL Server'],
    year: '2026',
  },
  {
    id: 2,
    title: 'EFU Mobile App',
    category: 'Mobile Application',
    description: 'A clean insurance mobile experience designed around usability, clarity and fast navigation.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    year: '2026',
  },
  {
    id: 3,
    title: 'AI Analytics Dashboard',
    category: 'Data Product',
    description: 'An analytics interface combining KPI cards, charts, data tables and AI-assisted insights.',
    tech: ['React', 'Charts', 'AI UI'],
    year: '2026',
  },
]
