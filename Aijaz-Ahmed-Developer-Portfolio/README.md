# Aijaz Ahmed — Developer Portfolio

A premium, animated portfolio built with Next.js 14, React, Tailwind CSS, Framer Motion, GSAP and Lenis.

## Included

- Animated home page and intro
- Responsive navigation and mobile menu
- Full Work, About and Contact pages
- Project live-site and source-code links
- SEO metadata
- Smooth scrolling and page transitions
- Responsive desktop, tablet and mobile layouts

## Run locally

Requirements: Node.js 18.17 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm start
```

## Add a website you built

All portfolio projects are stored in:

`app/_data/projects.js`

Add another object to the `projects` array:

```js
{
  slug: 'my-new-project',
  title: 'My New Project',
  year: '2026',
  type: 'Full-Stack Web Application',
  summary: 'A short explanation of the problem and what the product does.',
  stack: ['React', 'ASP.NET Core', 'SQL Server'],
  liveUrl: 'https://your-deployed-website.com',
  sourceUrl: 'https://github.com/AijazAhmed001/your-repository',
  accent: 'from-orange-500 to-red-950',
},
```

- `liveUrl` opens the deployed website.
- `sourceUrl` opens its GitHub repository.
- Remove either property when that link should not be displayed.
- The project automatically appears on both Home and Work pages.

## Change personal details

- Social links: `app/_data/social-medias.js`
- Navigation: `app/_data/nav-items.js`
- Homepage heading: `app/_layout/header/index.jsx`
- Homepage introduction: `app/_layout/description/index.jsx`
- Contact/location: `app/_layout/contact/components/user-details/index.jsx`
- SEO/site URL: `app/_config/metadata.config.js`

## Deploy on Vercel

1. Push this folder to a new GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Keep the detected framework as **Next.js**.
5. Click **Deploy**.
6. Replace `metadataBase` in `app/_config/metadata.config.js` with the final Vercel or custom-domain URL.

## Attribution

Customized for Aijaz Ahmed from an open-source recreation inspired by Dennis Snellenberg’s portfolio. Keep any upstream license and attribution requirements when publishing.
