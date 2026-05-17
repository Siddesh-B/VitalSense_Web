'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NavLink({ 
  href, 
  children, 
  className 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  const pathname = usePathname();
  
  // Exact match for dashboard home, otherwise prefix match
  const isActive = href === '/' 
    ? pathname === '/' 
    : pathname.startsWith(href);

  return (
    <Link href={href} className={`${className || ''} ${isActive ? 'active' : ''}`.trim()}>
      {children}
    </Link>
  );
}
