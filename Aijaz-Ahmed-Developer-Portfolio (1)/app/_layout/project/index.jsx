import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { ProjectCover } from '@/app/_components/project-cover';
import { projects } from '@/data';

export function Project() {
  return (
    <section className='bg-[#111318] py-24 text-white md:py-36'>
      <div className='container'>
        <div className='grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-[1fr_2fr]'>
          <p className='text-xs uppercase tracking-[0.22em] text-white/45'>02 / Selected work</p>
          <div className='flex flex-wrap items-end justify-between gap-8'>
            <div><h2 className='text-[clamp(3.3rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.05em]'>Built to matter.</h2><p className='mt-6 max-w-xl text-lg text-white/55'>Enterprise systems, intelligent tools and cloud infrastructure designed around real operational challenges.</p></div>
            <Link href='/work' className='group inline-flex items-center gap-5 rounded-full border border-white/30 px-6 py-4 text-sm transition hover:bg-white hover:text-[#111318]'>View all projects <ArrowUpRight size={18} className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></Link>
          </div>
        </div>

        <div className='mt-20 grid gap-8 lg:grid-cols-2'>
          {projects.map((project, index) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className={`group block ${index === 0 ? 'lg:col-span-2' : ''}`}>
              <article className='overflow-hidden rounded-2xl border border-white/15 bg-white/[0.035] transition duration-500 hover:-translate-y-1 hover:border-white/35'>
                <ProjectCover project={project} className={index === 0 ? 'aspect-[16/7]' : 'aspect-[4/3]'} />
                <div className='grid gap-8 p-7 md:grid-cols-[1fr_auto] md:p-9'>
                  <div><div className='mb-4 flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-white/45'><span>0{index + 1}</span><span>{project.year}</span><span>{project.status}</span></div><h3 className='text-3xl'>{project.shortTitle}</h3><p className='mt-4 max-w-2xl text-white/55'>{project.summary}</p></div>
                  <span className='flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition group-hover:bg-white group-hover:text-[#111318]'><ArrowUpRight size={20} /></span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
