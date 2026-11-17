import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PageId } from './types';

const PAGE_TITLES: Record<PageId, string> = {
  home: 'JAYTECH FARMS — Turnkey Agribusiness Engineering in Kwara State',
  services: 'Services — JAYTECH FARMS',
  about: 'About & Kwara Hub — JAYTECH FARMS',
  contact: 'Contact & Consultation — JAYTECH FARMS'
};

const PATH_TO_PAGE: Record<string, PageId> = {
  '/': 'home',
  '/services': 'services',
  '/about': 'about',
  '/contact': 'contact'
};

const PAGE_TO_PATH: Record<PageId, string> = {
  home: '/',
  services: '/services',
  about: '/about',
  contact: '/contact'
};

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const normalized = window.location.pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_PAGE[normalized] || 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [preselectedInterest, setPreselectedInterest] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageId, interest?: string) => {
    setPreselectedInterest(interest);
    setCurrentPage(page);
    const targetPath = PAGE_TO_PATH[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-amber-200 selection:text-emerald-950">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} preselectedInterest={preselectedInterest} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
