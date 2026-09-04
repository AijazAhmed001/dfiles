import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectCover } from '@/app/_components/project-cover';
import { getProject, projects } from '@/data';
import { Contact, Navbar, Transition } from '@/layout';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default function ProjectCaseStudy({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return <Transition><Navbar /><main><header className='bg-[#111318] px-6 pb-24 pt-36 text-white md:px-10 lg:px-16'><div className='mx-auto max-w-[1440px]'><Link href='/work' className='mb-14 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white'><ArrowLeft size={17} /> All work</Link><div className='grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end'><div><p className='mb-6 text-xs uppercase tracking-[0.2em] text-white/45'>{project.type} · {project.year}</p><h1 className='text-[clamp(4rem,9vw,9rem)] leading-[0.88] tracking-[-0.055em]'>{project.title}</h1></div><p className='text-xl leading-relaxed text-white/60'>{project.description}</p></div></div></header><section className='container -mt-1 pb-24'><ProjectCover project={project} className='aspect-[16/7] rounded-b-2xl' /><div className='grid gap-8 border-b py-10 md:grid-cols-4'><div><p className='text-xs uppercase tracking-widest text-muted-foreground'>Role</p><p className='mt-3'>{project.role}</p></div><div><p className='text-xs uppercase tracking-widest text-muted-foreground'>Status</p><p className='mt-3'>{project.status}</p></div><div className='md:col-span-2'><p className='text-xs uppercase tracking-widest text-muted-foreground'>Stack</p><p className='mt-3'>{project.stack.join(' · ')}</p></div></div></section><section className='container pb-28'><div className='grid gap-14 lg:grid-cols-[1fr_2fr]'><p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>The project</p><div><h2 className='text-[clamp(2.8rem,5vw,5.5rem)] leading-none'>Designed around the real problem.</h2><div className='mt-16 grid gap-12 md:grid-cols-2'><div><h3 className='mb-4 text-sm uppercase tracking-widest text-muted-foreground'>Challenge</h3><p className='text-lg leading-relaxed'>{project.challenge}</p></div><div><h3 className='mb-4 text-sm uppercase tracking-widest text-muted-foreground'>Solution</h3><p className='text-lg leading-relaxed'>{project.solution}</p></div></div></div></div></section><section className='bg-[#eef0f4] py-24'><div className='container grid gap-14 lg:grid-cols-[1fr_2fr]'><p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>Key capabilities</p><div className='grid gap-4 md:grid-cols-2'>{project.features.map(feature => <div key={feature} className='flex gap-4 rounded-xl border border-black/10 bg-white p-6'><Check className='mt-0.5 shrink-0 text-[#5267ff]' size={19} /><p>{feature}</p></div>)}</div></div></section><section className='container py-24'><div className='grid gap-12 border-t pt-8 lg:grid-cols-[1fr_2fr]'><p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>Outcome</p><div><p className='max-w-4xl text-[clamp(2rem,4vw,4rem)] leading-[1.15]'>{project.outcome}</p><div className='mt-12 flex flex-wrap gap-3'>{project.liveUrl && <a href={project.liveUrl} target='_blank' rel='noreferrer' className='inline-flex items-center gap-6 rounded-full bg-[#111318] px-6 py-4 text-sm text-white'>View live <ArrowUpRight size={17} /></a>}{project.sourceUrl && <a href={project.sourceUrl} target='_blank' rel='noreferrer' className='inline-flex items-center gap-6 rounded-full border px-6 py-4 text-sm'>View source <ArrowUpRight size={17} /></a>}</div></div></div></section></main><Contact /></Transition>;
}
