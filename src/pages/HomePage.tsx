import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SALES_COPY, CONTACT_INFO } from '../data/copy';
import { PageId } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import heroImg from '../assets/images/jaytech_hero_farm_1786457411891.jpg';
import arableImg from '../assets/images/arable_irrigation_crops_1794862676069.jpg';
import livestockImg from '../assets/images/jaytech_livestock_farm_1786457425927.jpg';
import tractorImg from '../assets/images/kwara_mechanized_tractor_1794862675804.jpg';

interface HomePageProps {
  onNavigate: (page: PageId, preselectedInterest?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const directWhatsAppUrl = `https://wa.me/${CONTACT_INFO.whatsappIntl}?text=${encodeURIComponent(
    'Hello JAYTECH FARMS, I am interested in a turnkey agricultural setup in Kwara State.'
  )}`;

  const featuredCapabilities = [
    {
      num: '01',
      title: 'Bespoke Arable Farming',
      category: 'Crop Production',
      desc: 'Soil-tested maize, industrial cassava, soybeans, and high-value vegetables equipped with solar drip irrigation.',
      image: arableImg,
      alt: 'Commercial maize and vegetable rows with drip irrigation lines in Kwara State',
      span: 'lg:col-span-2'
    },
    {
      num: '02',
      title: 'Elite Livestock Setups',
      category: 'Animal Husbandry',
      desc: 'Bio-secure battery-cage poultry houses, RAS aquaculture ponds, and modular piggery or cattle infrastructure.',
      image: livestockImg,
      alt: 'Modern ventilated commercial livestock and poultry housing facility',
      span: 'lg:col-span-1'
    },
    {
      num: '03',
      title: 'Advanced Mechanization',
      category: 'Field Engineering',
      desc: 'Heavy bush clearing, multi-disc ploughing, precision planting, and combine harvesting to remove manual delays.',
      image: tractorImg,
      alt: 'Commercial agricultural tractor ploughing fertile loamy farmland in Kwara State',
      span: 'lg:col-span-3'
    }
  ];

  return (
    <div>
      {/* 1. Split Editorial Hero */}
      <section className="bg-[#0F3822] text-white border-b border-emerald-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {SALES_COPY.header.kicker}
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-[1.12] tracking-tight">
                {SALES_COPY.header.headline}
              </h1>

              <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl">
                {SALES_COPY.header.subHeadline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-md transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{SALES_COPY.header.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 border border-emerald-700 hover:border-stone-400 text-white font-medium text-sm rounded-md transition-colors duration-150 cursor-pointer"
                >
                  Explore 5 Services
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <div className="rounded-lg overflow-hidden border border-emerald-800 bg-emerald-950 flex-1 min-h-[300px] lg:min-h-[380px]">
                <ImageWithFallback
                  src={heroImg}
                  alt="JAYTECH FARMS commercial agricultural estate in Kwara State"
                  fallbackTitle="JAYTECH FARMS Kwara Estate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-stone-300">
                <span>Turnkey Crop &amp; Livestock Engineering</span>
                <span aria-hidden="true">·</span>
                <span>Ilorin Corridor, Kwara State</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Benchmark Strip */}
        <div className="border-t border-emerald-900 bg-[#0B2B1A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {SALES_COPY.benchmarks.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                    {item.metric}
                  </div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-xs text-stone-300">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Industry Reality & Engineering Standard */}
      <section className="bg-[#F7F8F6] py-16 lg:py-24 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                {SALES_COPY.problemPromise.kicker}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 leading-tight">
                {SALES_COPY.problemPromise.title}
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                {SALES_COPY.problemPromise.promiseBody}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-sm font-semibold text-emerald-900 hover:text-amber-700 inline-flex items-center gap-1.5 border-b border-emerald-900 pb-0.5 transition-colors cursor-pointer"
                >
                  <span>Read our 4-step delivery methodology</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SALES_COPY.problemPromise.hurdles.map((hurdle, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-lg p-6 space-y-3"
                >
                  <div className="text-xs font-semibold text-stone-500 tabular-nums">
                    0{idx + 1} · Challenge &amp; Fix
                  </div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    {hurdle.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{hurdle.desc}</p>
                  <div className="pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-emerald-900 font-medium">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{hurdle.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Capabilities Grid */}
      <section className="bg-white py-16 lg:py-24 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Core Capabilities
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
                Turnkey Engineering From Soil to Off-Take
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-sm font-semibold text-emerald-900 hover:text-amber-700 inline-flex items-center gap-1.5 border-b border-emerald-900 pb-0.5 transition-colors self-start md:self-auto cursor-pointer whitespace-nowrap"
            >
              <span>View all 5 services &amp; yield estimator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCapabilities.map((item) => (
              <article
                key={item.num}
                className={`${item.span} border border-stone-200 rounded-lg overflow-hidden bg-white flex flex-col`}
              >
                <div className="h-56 sm:h-64 bg-stone-100 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-stone-500">
                      <span>{item.num}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-emerald-950">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => onNavigate('services')}
                      className="text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-amber-700 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Service specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Client Proof & Kwara Corridor */}
      <section className="bg-[#F7F8F6] py-16 lg:py-24 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Proven Field Execution
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
              Built for Local &amp; Diaspora Investors
            </h2>
            <p className="text-base text-stone-600">
              Recent commercial setups delivered across Kwara State with documented timelines and verified market off-take.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALES_COPY.caseProof.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-lg p-7 space-y-4"
              >
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  {item.project}
                </div>
                <p className="text-base text-stone-800 leading-relaxed font-medium">
                  “{item.outcome}”
                </p>
                <div className="pt-3 border-t border-stone-100 text-xs font-semibold text-stone-500">
                  {item.client}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Conversion Callout */}
      <section className="bg-[#0F3822] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-3xl font-bold text-white">
              Ready to structure your Kwara State farm project?
            </h2>
            <p className="text-stone-200 text-base">
              Complete our consultation questionnaire for a tailored feasibility review within 24 hours, or message our lead engineer directly on WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Start Consultation Brief
            </button>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 border border-emerald-700 hover:border-stone-400 text-white font-medium text-sm rounded-md transition-colors whitespace-nowrap"
            >
              WhatsApp: {CONTACT_INFO.whatsappNumber}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
