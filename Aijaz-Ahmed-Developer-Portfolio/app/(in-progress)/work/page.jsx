import { ArrowUpRight } from 'lucide-react';

import { projects } from '@/data';
import { Contact, Navbar, Transition } from '@/layout';

export const metadata = { title: 'Work', description: 'Selected projects by Aijaz Ahmed.' };

export default function Work() {
  return (
    <Transition>
      <Navbar />
      <main className='container min-h-screen pb-32 pt-40'>
        <p className='mb-5 uppercase tracking-[0.25em] text-muted-foreground'>Selected work · 2026</p>
        <h1 className='mb-24 text-[clamp(4rem,12vw,11rem)] leading-[0.86]'>Products,<br />not mockups.</h1>
        <div className='space-y-5'>
          {projects.map((project, index) => (
            <article key={project.slug} className='grid gap-8 border-t py-10 md:grid-cols-[80px_1fr_1fr_auto] md:items-start'>
              <span className='text-muted-foreground'>0{index + 1}</span>
              <div><h2 className='text-4xl'>{project.title}</h2><p className='mt-2 text-muted-foreground'>{project.type} · {project.year}</p></div>
              <div><p className='mb-5 text-lg'>{project.summary}</p><p className='text-sm text-muted-foreground'>{project.stack.join(' · ')}</p></div>
              <div className='flex gap-4'>
                {project.liveUrl && <a href={project.liveUrl} target='_blank' rel='noreferrer' aria-label={`Open ${project.title}`}><ArrowUpRight /></a>}
                {project.sourceUrl && <a href={project.sourceUrl} target='_blank' rel='noreferrer' className='underline underline-offset-4'>Code</a>}
              </div>
            </article>
          ))}
        </div>
      </main>
      <Contact />
    </Transition>
  );
}
