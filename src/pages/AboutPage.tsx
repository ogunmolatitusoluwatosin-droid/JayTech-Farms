import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SALES_COPY } from '../data/copy';
import { PageId } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import tractorImg from '../assets/images/kwara_mechanized_tractor_1794862675804.jpg';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* WordPress Page Header */}
      <section className="bg-[#0F3822] text-white py-14 border-b border-emerald-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <nav className="text-xs text-stone-300 flex items-center gap-2" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-white cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-amber-400 font-medium">About &amp; Kwara Hub</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Engineering Agricultural Assets in Kwara State
          </h1>
          <p className="text-stone-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            Built for accountability, scientific agronomy, and reliable commercial output for investors across Nigeria and the diaspora.
          </p>
        </div>
      </section>

      {/* Company Overview & Diaspora Governance */}
      <section className="bg-white py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Who We Are
              </p>
              <h2 className="font-serif text-3xl font-bold text-emerald-950 leading-tight">
                Structured Farm Development Without Remote Guesswork
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                JAYTECH FARMS is a turnkey agricultural engineering and management firm headquartered in the Kwara State agricultural corridor. We bridge the gap between capital investors and productive Nigerian farmland.
              </p>
              <p className="text-stone-600 text-base leading-relaxed">
                Rather than leaving landowners dependent on informal caretakers, our civil engineers, soil agronomists, and livestock specialists execute every stage under documented milestones, itemized input records, and regular field inspection reports.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-6 border-t border-stone-200">
                <div>
                  <div className="font-serif text-2xl font-bold text-emerald-950 tabular-nums">
                    4 Stages
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Milestone-audited delivery workflow
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-emerald-950 tabular-nums">
                    Bi-Weekly
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Photo &amp; video field briefings for diaspora clients
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100 aspect-[16/10]">
                <ImageWithFallback
                  src={tractorImg}
                  alt="Mechanized land preparation on fertile Kwara State soil"
                  fallbackTitle="Kwara State Mechanized Operations"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-stone-500 pt-2.5">
                Mechanized primary tillage and soil preparation across the Ilorin–Moro corridor, Kwara State.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Process */}
      <section className="bg-[#F7F8F6] py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Delivery Methodology
            </p>
            <h2 className="font-serif text-3xl font-bold text-emerald-950">
              How We Build Your Turnkey Farm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SALES_COPY.howWeWork.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="font-serif text-2xl font-bold text-amber-700 tabular-nums">
                    {item.step}.
                  </div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-100 text-xs font-semibold text-stone-500">
                  Deliverable: {item.milestone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Kwara Advantage & Corridor Transit Table */}
      <section className="bg-white py-16 lg:py-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              {SALES_COPY.kwaraAdvantage.kicker}
            </p>
            <h2 className="font-serif text-3xl font-bold text-emerald-950">
              {SALES_COPY.kwaraAdvantage.title}
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              {SALES_COPY.kwaraAdvantage.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SALES_COPY.kwaraAdvantage.points.map((point, idx) => (
              <div
                key={idx}
                className="border border-stone-200 rounded-lg p-6 bg-[#F7F8F6] space-y-2.5"
              >
                <h3 className="font-serif text-lg font-bold text-emerald-950">
                  {point.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>

          {/* Clean Tabular Transit Table */}
          <div className="border border-stone-200 rounded-lg overflow-hidden">
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-serif text-lg font-bold text-emerald-950">
                Distribution Transit Schedule from Kwara Central Hub
              </h3>
              <span className="text-xs text-stone-500">Road Haulage Benchmarks</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs font-semibold uppercase tracking-wider text-stone-500 bg-white">
                    <th className="py-3.5 px-6">Destination Market</th>
                    <th className="py-3.5 px-6">Approx. Distance</th>
                    <th className="py-3.5 px-6">Transit Time</th>
                    <th className="py-3.5 px-6">Primary Off-Take Corridor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm bg-white">
                  {SALES_COPY.kwaraAdvantage.routes.map((route, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/70">
                      <td className="py-3.5 px-6 font-semibold text-emerald-950">
                        {route.destination}
                      </td>
                      <td className="py-3.5 px-6 text-stone-600 tabular-nums">
                        {route.distance}
                      </td>
                      <td className="py-3.5 px-6 text-amber-700 font-semibold tabular-nums">
                        {route.time}
                      </td>
                      <td className="py-3.5 px-6 text-stone-600">{route.corridor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Frequently Asked Questions */}
      <section className="bg-[#F7F8F6] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Investor Guidance
            </p>
            <h2 className="font-serif text-3xl font-bold text-emerald-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-200">
            {SALES_COPY.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-semibold text-emerald-950">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Your Farm Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
