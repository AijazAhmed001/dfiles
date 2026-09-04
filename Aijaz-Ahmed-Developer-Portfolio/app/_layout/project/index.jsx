import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { projects } from '@/data';

export function Project() {
  return (
    <section className='container py-24'>
      <div className='mb-12 flex items-end justify-between gap-6'>
        <div>
          <p className='mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground'>Selected projects</p>
          <h2 className='text-[clamp(3rem,7vw,7rem)] leading-none'>Built to matter.</h2>
        </div>
        <Link href='/work' className='hidden items-center gap-2 text-lg md:flex'>All work <ArrowUpRight /></Link>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        {projects.map((project, index) => (
          <article key={project.slug} className='group overflow-hidden rounded-2xl border bg-card'>
            <div className={`relative flex aspect-[4/3] items-end bg-gradient-to-br ${project.accent} p-7 text-white`}>
              <span className='absolute right-6 top-5 text-sm text-white/70'>0{index + 1}</span>
              <div>
                <p className='mb-2 text-sm text-white/70'>{project.type}</p>
                <h3 className='text-4xl leading-none'>{project.title}</h3>
              </div>
            </div>
            <div className='p-7'>
              <p className='min-h-24 text-lg text-muted-foreground'>{project.summary}</p>
              <div className='mt-6 flex flex-wrap gap-2'>
                {project.stack.map((item) => <span key={item} className='rounded-full border px-3 py-1 text-sm'>{item}</span>)}
              </div>
              <div className='mt-8 flex gap-5'>
                {project.liveUrl && <a href={project.liveUrl} target='_blank' rel='noreferrer' className='inline-flex items-center gap-1 underline underline-offset-4'>Live site <ArrowUpRight size={17} /></a>}
                {project.sourceUrl && <a href={project.sourceUrl} target='_blank' rel='noreferrer' className='inline-flex items-center gap-1 underline underline-offset-4'>Source <ArrowUpRight size={17} /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
