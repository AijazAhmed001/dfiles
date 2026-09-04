'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/data';

export function NavbarList() {
  const pathname = usePathname();
  return <ul className='hidden items-center gap-8 lg:flex'>{navItems.slice(1).map(item => <li key={item.href}><Link href={item.href} className={`relative pb-1 text-sm capitalize text-white/75 transition hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-white after:transition-transform ${pathname.startsWith(item.href) ? 'text-white after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>{item.title}</Link></li>)}</ul>;
}
