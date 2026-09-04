# Aijaz Ahmed — Senior Developer Portfolio

A polished Next.js portfolio presenting full-stack, AI and cloud work through real engineering case studies.

## Experience included

- High-contrast responsive hero with clear positioning and calls to action
- Desktop navigation with active states and a separate mobile menu
- Profile, capabilities and experience sections
- Featured project collection with branded visual covers
- Dedicated case-study pages for every major project
- Accessible focus states and reduced-motion support
- SEO metadata, robots and sitemap routes
- Responsive layouts from mobile through wide desktop

## Run locally

Install Node.js 18.17 or newer. Open CMD in this folder—the folder containing `package.json`—then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm start
```

## Add a project

Open `app/_data/projects.js`, copy an existing project object and change its values. The `slug` creates the case-study URL automatically:

```js
{
  slug: 'my-project',
  title: 'My Project',
  shortTitle: 'A short, outcome-focused headline.',
  year: '2026',
  status: 'Live',
  type: 'Full-Stack Application',
  summary: 'One concise project summary.',
  description: 'A fuller explanation for the case-study hero.',
  role: 'Full-stack developer',
  stack: ['React', 'ASP.NET Core', 'SQL Server'],
  liveUrl: 'https://your-live-site.com',
  sourceUrl: 'https://github.com/AijazAhmed001/repository',
  accent: 'emerald',
  features: ['Feature one', 'Feature two'],
  challenge: 'The engineering or business challenge.',
  solution: 'How you designed and implemented the solution.',
  outcome: 'What the completed work demonstrates or achieved.',
}
```

Supported cover accents are `emerald`, `violet` and `cyan`. The project automatically appears on Home, Work, the sitemap and `/work/[slug]`.

## Replace branded covers with screenshots

Add optimized `.webp` screenshots to `public/projects/`, then update `app/_components/project-cover/index.jsx` to render a Next.js `Image` using a new `image` property from the project data. Keep the overlay text as a fallback and supply meaningful `alt` text.

## Personal details

- Projects and case-study content: `app/_data/projects.js`
- Social links: `app/_data/social-medias.js`
- Hero: `app/_layout/header/index.jsx`
- Profile: `app/_layout/description/index.jsx`
- Capabilities: `app/_layout/capabilities/index.jsx`
- Experience: `app/_layout/experience/index.jsx`
- Footer: `app/_layout/contact/index.jsx`
- Site metadata and production URL: `app/_config/metadata.config.js`

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, select **Add New → Project**.
3. Import the repository and keep the detected framework as **Next.js**.
4. Deploy.
5. Replace `https://aijaz-ahmed.vercel.app` in metadata, `app/sitemap.js` and `app/robots.js` with the final domain.

## Before publishing

- Replace temporary domain values with the real deployed domain.
- Add real project screenshots when available.
- Confirm every public project link is intended to be visible.
- Keep upstream license and attribution requirements from the original open-source template.
