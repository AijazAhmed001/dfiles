import { ArrowUpRight } from 'lucide-react';

import { Navbar, Transition } from '@/layout';

export const metadata = { title: 'Contact', description: 'Contact Aijaz Ahmed for development opportunities and collaborations.' };

export default function ContactPage() {
  return (
    <Transition>
      <Navbar />
      <main className='flex min-h-screen items-center bg-foreground text-background'>
        <div className='container py-40'>
          <p className='mb-6 uppercase tracking-[0.25em] text-background/60'>Have a project or opportunity?</p>
          <h1 className='max-w-6xl text-[clamp(4rem,11vw,10rem)] leading-[0.9]'>Let’s build something serious.</h1>
          <div className='mt-20 grid gap-8 border-t border-background/30 pt-10 md:grid-cols-3'>
            <a href='https://www.linkedin.com/in/aijaz-ahmed-605a89249' target='_blank' rel='noreferrer' className='group text-xl'>Connect on LinkedIn <ArrowUpRight className='inline transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></a>
            <a href='https://efu-inventory-system-wji1.vercel.app/' target='_blank' rel='noreferrer' className='group text-xl'>View live project <ArrowUpRight className='inline' /></a>
            <a href='https://github.com/AijazAhmed001' target='_blank' rel='noreferrer' className='group text-xl'>GitHub <ArrowUpRight className='inline' /></a>
          </div>
        </div>
      </main>
    </Transition>
  );
}
