'use client';

import { NavbarBrand } from './brand';
import { NavbarList } from './list';

export function Navbar() {
  return <nav aria-label='Primary navigation' className='absolute inset-x-0 top-0 z-30 text-white'><div className='mx-auto flex max-w-[1536px] items-center justify-between px-6 py-6 md:px-10 lg:px-16'><NavbarBrand /><NavbarList /></div></nav>;
}
