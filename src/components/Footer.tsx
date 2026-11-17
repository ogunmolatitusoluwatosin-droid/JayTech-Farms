import React from 'react';
import { CONTACT_INFO, SALES_COPY } from '../data/copy';
import { PageId } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    onNavigate(page);
  };

  const directWhatsAppUrl = `https://wa.me/${CONTACT_INFO.whatsappIntl}?text=${encodeURIComponent(
    'Hello JAYTECH FARMS, I would like to discuss a turnkey farm setup in Kwara State.'
  )}`;

  return (
    <footer className="bg-[#0A2616] text-stone-200 border-t border-emerald-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/80">
          {/* Column 1: Brand Summary */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home')}
              className="font-serif text-xl font-bold text-white tracking-tight inline-block"
            >
              JAYTECH FARMS
            </a>
            <p className="text-sm text-stone-300 leading-relaxed">
              Turnkey agribusiness engineering, mechanized land development, bio-secure livestock infrastructure, and produce logistics across Kwara State, Nigeria.
            </p>
            <p className="text-xs text-stone-400">
              {CONTACT_INFO.location}
            </p>
          </div>

          {/* Column 2: Site Pages */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-amber-400">
              Pages
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, 'home')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleNav(e, 'services')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Agribusiness Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, 'about')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  About & Kwara Hub
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, 'contact')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Contact & Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Solutions */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-amber-400">
              Core Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SALES_COPY.services.map((service) => (
                <li key={service.id}>
                  <a
                    href="/services"
                    onClick={(e) => handleNav(e, 'services')}
                    className="text-stone-300 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-amber-400">
              Direct Contact
            </h3>
            <div className="space-y-2.5 text-sm text-stone-300">
              <div>
                <span className="text-stone-400 block text-xs">WhatsApp Briefing Desk</span>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-amber-400 transition-colors font-medium tabular-nums"
                >
                  {CONTACT_INFO.whatsappFormatted}
                </a>
              </div>
              <div>
                <span className="text-stone-400 block text-xs">Direct Telephone</span>
                <a
                  href={`tel:${CONTACT_INFO.phoneNumber}`}
                  className="text-white hover:text-amber-400 transition-colors tabular-nums"
                >
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </div>
              <div>
                <span className="text-stone-400 block text-xs">Email</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-white hover:text-amber-400 transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <span className="text-stone-400 block text-xs">TikTok</span>
                <a
                  href={CONTACT_INFO.tikTokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  {CONTACT_INFO.tikTokHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} JAYTECH FARMS. Kwara State, Nigeria. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer py-1 px-2"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
