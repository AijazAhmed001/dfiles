/** @type {import('next').Metadata} */
export const rootMetadata = {
  metadataBase: new URL('https://aijaz-ahmed.vercel.app/'),
  title: {
    template: '%s | Aijaz Ahmed',
    default: 'Aijaz Ahmed • Full-Stack Developer',
  },
  description:
    'Full-stack developer building scalable web, AI and cloud products from Karachi, Pakistan.',
  generator: 'Next.js',
  applicationName: 'Aijaz Ahmed Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Aijaz Ahmed', 'Full-stack developer', 'React', 'ASP.NET Core', 'AI'],
  authors: [{ name: 'Aijaz Ahmed', url: 'https://github.com/AijazAhmed001' }],
  creator: 'Aijaz Ahmed',
  publisher: 'Aijaz Ahmed',
  twitter: {
    card: 'summary_large_image',
    title: 'Aijaz Ahmed • Full-Stack Developer',
    description:
      'Full-stack developer building scalable web, AI and cloud products.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
