'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Live Scores', href: '/live' },
  { name: 'Upcoming', href: '/upcoming' },
  { name: 'Points Table', href: '/points-table' },
];

export default function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 backdrop-blur-2xl shadow-md">
        <nav className="container mx-auto flex items-center justify-between p-4 h-20">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="https://documents.iplt20.com/ipl/assets/images/ipl-logo-new-old.png"
              alt="IPL Logo"
              width={80}
              height={40}
              priority
              className="h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1 z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open navigation menu"
          >
            <span className={`w-6 h-0.5 bg-slate-800 dark:bg-slate-200 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-slate-800 dark:bg-slate-200 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-slate-800 dark:bg-slate-200 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white dark:bg-slate-900 transform transition-transform duration-300 ease-in-out z-20 md:hidden ${
          isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col items-start justify-start px-6 py-24 space-y-8 text-lg font-semibold">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for when drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}