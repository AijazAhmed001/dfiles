'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { slideUp } from './variants';

export function Header() {
  return (
    <motion.header className='relative min-h-screen overflow-hidden bg-[#111318] px-6 pb-14 pt-32 text-white md:px-10 lg:px-16' variants={slideUp} initial='initial' animate='enter'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(82,103,255,.32),transparent_28%),radial-gradient(circle_at_12%_82%,rgba(50,214,160,.17),transparent_26%)]' />
      <div className='pointer-events-none absolute right-[5vw] top-[13vh] select-none text-[clamp(13rem,36vw,36rem)] font-bold leading-none tracking-tighter text-white/[0.035]'>AA</div>

      <div className='relative mx-auto flex min-h-[calc(100vh-11.5rem)] max-w-[1440px] flex-col justify-between'>
        <div className='flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-5 text-xs uppercase tracking-[0.18em] text-white/65'>
          <span>Full-stack developer</span>
          <span className='flex items-center gap-2'><span className='h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]' /> Available remotely</span>
          <span>Karachi · Pakistan</span>
        </div>

        <div className='py-16 lg:py-8'>
          <p className='mb-7 flex items-center gap-3 text-sm text-white/65'><ArrowDownRight size={18} /> Web · AI · Cloud</p>
          <h1 className='max-w-[1250px] text-[clamp(4rem,9.2vw,9.6rem)] leading-[0.87] tracking-[-0.055em]'>
            I build reliable<br /><span className='text-white/55'>digital products.</span>
          </h1>
        </div>

        <div className='grid items-end gap-8 border-t border-white/20 pt-8 md:grid-cols-[1fr_auto]'>
          <div>
            <p className='max-w-xl text-lg leading-relaxed text-white/70 md:text-xl'>From thoughtful React interfaces to secure .NET systems, intelligent assistants and scalable cloud architecture.</p>
            <p className='mt-5 text-xs uppercase tracking-[0.16em] text-white/40'>React · TypeScript · ASP.NET Core · AI Systems · Cloud</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link href='/work' className='group inline-flex items-center gap-8 rounded-full bg-[#5267ff] px-6 py-4 text-sm transition hover:bg-[#6476ff]'>View selected work <ArrowUpRight size={18} className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></Link>
            <Link href='/contact' className='inline-flex items-center rounded-full border border-white/30 px-6 py-4 text-sm transition hover:bg-white hover:text-[#111318]'>Let’s talk</Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
