import {
  Contact,
  Description,
  Header,
  Navbar,
  Project,
  Transition,
} from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Home',
  description: 'Aijaz Ahmed — full-stack developer building scalable web, AI and cloud products.',
};

export default function Home() {
  return (
    <Transition>
      <Navbar />
      <Header />
      <main>
        <Description />
        <Project />
      </main>
      <Contact />
    </Transition>
  );
}
