import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const socials = [
  ['GitHub', 'https://github.com/AijazAhmed001'],
  ['LinkedIn', 'https://www.linkedin.com/in/aijaz-ahmed-605a89249'],
  ['Live project', 'https://efu-inventory-system-wji1.vercel.app/'],
];

export function Contact() {
  return (
    <footer className='bg-[#111318] px-6 py-24 text-white md:px-10 md:py-32 lg:px-16'>
      <div className='mx-auto max-w-[1440px]'>
        <div className='grid gap-10 border-t border-white/20 pt-7 lg:grid-cols-[1fr_2fr]'>
          <p className='text-xs uppercase tracking-[0.22em] text-white/45'>05 / Contact</p>
          <div>
            <p className='mb-5 text-sm text-white/50'>Have a serious project or opportunity in mind?</p>
            <h2 className='max-w-5xl text-[clamp(3.6rem,8vw,8.5rem)] leading-[0.9] tracking-[-0.05em]'>Let’s build it<br /><span className='text-white/45'>properly.</span></h2>
            <div className='mt-14 flex flex-wrap items-center gap-4'>
              <Link href='/contact' className='group inline-flex items-center gap-12 rounded-full bg-[#5267ff] px-7 py-5 text-sm transition hover:bg-[#6476ff]'>Start a conversation <ArrowUpRight size={19} className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></Link>
              <span className='text-sm text-white/50'>Karachi, Pakistan · Available remotely</span>
            </div>
          </div>
        </div>
        <div className='mt-24 flex flex-col gap-8 border-t border-white/20 pt-7 text-sm md:flex-row md:items-end md:justify-between'>
          <div><p className='text-white/40'>Aijaz Ahmed</p><p className='mt-2'>Full-stack developer · Web, AI and Cloud</p></div>
          <ul className='flex flex-wrap gap-7'>{socials.map(([label, href]) => <li key={label}><a href={href} target='_blank' rel='noreferrer' className='group inline-flex items-center gap-1 text-white/70 hover:text-white'>{label}<ArrowUpRight size={14} className='transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' /></a></li>)}</ul>
          <p className='text-white/40'>© 2026 Aijaz Ahmed</p>
        </div>
      </div>
    </footer>
  );
}
