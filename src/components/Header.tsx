import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string; href: string }[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' }
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
        >
          JAYTECH FARMS
        </a>

        {/* Zone 2: Clean 4-Page WordPress Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 ${
                  isActive
                    ? 'text-emerald-950 border-amber-600 font-semibold'
                    : 'text-stone-600 border-transparent hover:text-emerald-950 hover:border-stone-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 hover:text-emerald-950 hover:bg-stone-100 rounded-md transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 py-4">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3 py-3 text-sm rounded-md min-h-[44px] flex items-center transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-950 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-950'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full px-4 py-3 bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold rounded-md transition-colors min-h-[44px]"
              >
                Book Consultation
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
