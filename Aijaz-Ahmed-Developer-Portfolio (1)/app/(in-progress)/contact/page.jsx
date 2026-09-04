import { ArrowUpRight } from 'lucide-react';

import { Navbar, Transition } from '@/layout';

export const metadata = { title: 'Contact', description: 'Connect with Aijaz Ahmed for full-stack development opportunities and collaborations.' };

const links = [['LinkedIn', 'https://www.linkedin.com/in/aijaz-ahmed-605a89249'], ['GitHub', 'https://github.com/AijazAhmed001'], ['Live project', 'https://efu-inventory-system-wji1.vercel.app/']];

export default function ContactPage() {
  return <Transition><Navbar /><main className='flex min-h-screen items-center bg-[#111318] px-6 pb-16 pt-36 text-white md:px-10 lg:px-16'><div className='mx-auto w-full max-w-[1440px]'><p className='mb-8 text-xs uppercase tracking-[0.22em] text-white/45'>Contact · Available remotely</p><h1 className='max-w-6xl text-[clamp(4rem,10vw,10rem)] leading-[0.86] tracking-[-0.055em]'>Have a serious idea?<br /><span className='text-white/40'>Let’s talk.</span></h1><div className='mt-20 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-[1fr_2fr]'><div><p className='text-white/45'>Based in</p><p className='mt-2'>Karachi, Pakistan</p></div><div className='grid gap-4 sm:grid-cols-3'>{links.map(([label, href]) => <a key={label} href={href} target='_blank' rel='noreferrer' className='group flex items-center justify-between rounded-xl border border-white/20 p-5 transition hover:bg-white hover:text-[#111318]'>{label}<ArrowUpRight className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></a>)}</div></div></div></main></Transition>;
}
