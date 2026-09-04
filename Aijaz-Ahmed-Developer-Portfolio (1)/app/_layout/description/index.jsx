import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function Description() {
  return (
    <section className='container py-24 md:py-36'>
      <div className='grid gap-12 border-t pt-7 lg:grid-cols-[1fr_2fr]'>
        <div>
          <p className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>01 / Profile</p>
          <p className='mt-5 text-sm text-muted-foreground'>Karachi, Pakistan</p>
        </div>
        <div>
          <h2 className='max-w-5xl text-[clamp(2.6rem,5.6vw,6rem)] leading-[1.02] tracking-[-0.04em]'>Engineering thoughtful products, from interface to infrastructure.</h2>
          <div className='mt-12 grid gap-10 md:grid-cols-2'>
            <p className='text-lg leading-relaxed text-muted-foreground'>I’m a full-stack developer focused on enterprise software, AI experiences and cloud platforms. I care about clarity, security and code that a team can confidently maintain.</p>
            <div className='space-y-4 text-sm'>
              <p><span className='block text-muted-foreground'>Currently</span>BS Computer Science · Air University</p>
              <p><span className='block text-muted-foreground'>Experience</span>Software Engineering Intern · EFU General Insurance</p>
              <Link href='/about' className='group mt-8 inline-flex items-center gap-2 border-b pb-1'>More about me <ArrowUpRight size={17} className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
