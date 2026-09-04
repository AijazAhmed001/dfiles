import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { ProjectCover } from '@/app/_components/project-cover';
import { projects } from '@/data';
import { Contact, Navbar, Transition } from '@/layout';

export const metadata = { title: 'Work', description: 'Enterprise software, AI and cloud projects by Aijaz Ahmed.' };

export default function Work() {
  return <Transition><Navbar /><main><header className='bg-[#111318] px-6 pb-24 pt-40 text-white md:px-10 lg:px-16'><div className='mx-auto max-w-[1440px]'><p className='mb-8 text-xs uppercase tracking-[0.22em] text-white/45'>Selected work · 2026</p><h1 className='max-w-6xl text-[clamp(4.5rem,11vw,11rem)] leading-[0.85] tracking-[-0.055em]'>Products,<br /><span className='text-white/40'>not mockups.</span></h1><p className='mt-12 max-w-xl text-lg leading-relaxed text-white/60'>A selection of enterprise systems, intelligent experiences and platform architecture—each documented as a real engineering case study.</p></div></header><section className='container py-24 md:py-32'><div className='space-y-20'>{projects.map((project, index) => <Link href={`/work/${project.slug}`} key={project.slug} className='group grid gap-7 border-t pt-7 lg:grid-cols-[100px_1.5fr_1fr]'><p className='text-sm text-muted-foreground'>0{index + 1} / {project.year}</p><ProjectCover project={project} className='aspect-[16/10] rounded-xl transition duration-500 group-hover:-translate-y-1' /><div className='flex flex-col justify-between gap-10'><div><p className='text-sm text-muted-foreground'>{project.type}</p><h2 className='mt-3 text-4xl'>{project.title}</h2><p className='mt-5 leading-relaxed text-muted-foreground'>{project.summary}</p></div><div className='flex items-center justify-between border-t pt-5'><span className='text-sm'>{project.status}</span><ArrowUpRight className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></div></div></Link>)}</div></section></main><Contact /></Transition>;
}
