'use client';

import { motion } from 'framer-motion';
import { MoveDownRight } from 'lucide-react';

import { ParallaxSlider } from '@/components';

import { slideUp } from './variants';

export function Header() {
  return (
    <motion.header
      className='relative h-screen overflow-hidden bg-secondary-foreground text-background'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(92,94,255,0.38),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(12,193,138,0.22),transparent_30%)]' />
      <div className='absolute right-[8vw] top-[14vh] select-none text-[clamp(12rem,35vw,34rem)] font-bold leading-none text-white/5'>AA</div>

      <div className='relative flex h-full flex-col justify-end gap-2 md:flex-col-reverse md:justify-normal'>
        <div className='select-none'>
          <h1 className='text-[max(9em,15vw)]'>
            <ParallaxSlider repeat={4} baseVelocity={2}>
              <span className='pe-12'>
                Aijaz Ahmed
                <span className='spacer'>—</span>
              </span>
            </ParallaxSlider>
          </h1>
        </div>

        <div className='md:ml-auto'>
          <div className='mx-10 max-md:my-12 md:mx-36'>
            <div className='mb-4 md:mb-20'>
              <MoveDownRight size={28} strokeWidth={1.25} />
            </div>

            <h4 className='text-[clamp(1.55em,2.5vw,2.75em)]'>
              <span className='block'>Full-Stack Developer</span>
              <span className='block'>AI &amp; Cloud Builder</span>
            </h4>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
