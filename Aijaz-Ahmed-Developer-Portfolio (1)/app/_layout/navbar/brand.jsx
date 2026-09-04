'use client';

import Link from 'next/link';

export function NavbarBrand() {
  return <Link href='/' className='group flex items-center gap-3 font-medium'><span className='flex h-9 w-9 items-center justify-center rounded-full border border-current text-xs transition group-hover:bg-white group-hover:text-[#111318]'>AA</span><span>Aijaz Ahmed</span></Link>;
}
