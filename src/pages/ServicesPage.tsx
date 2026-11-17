import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SALES_COPY } from '../data/copy';
import { PageId } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import arableImg from '../assets/images/arable_irrigation_crops_1794862676069.jpg';
import livestockImg from '../assets/images/jaytech_livestock_farm_1786457425927.jpg';
import tractorImg from '../assets/images/kwara_mechanized_tractor_1794862675804.jpg';
import seedsImg from '../assets/images/agribusiness_seeds_harvest_1794862677282.jpg';
import heroImg from '../assets/images/jaytech_hero_farm_1786457411891.jpg';

interface ServicesPageProps {
  onNavigate: (page: PageId, preselectedInterest?: string) => void;
}

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  arable: {
    src: arableImg,
    alt: 'Irrigated maize and vegetable rows on commercial Kwara farmland'
  },
  livestock: {
    src: livestockImg,
    alt: 'Bio-secure poultry and livestock housing setup'
  },
  mechanization: {
    src: tractorImg,
    alt: 'Heavy-duty tractor ploughing loamy soil in Kwara State'
  },
  seeds: {
    src: seedsImg,
    alt: 'Certified hybrid maize and soybean seeds inspected with seedlings'
  },
  logistics: {
    src: heroImg,
    alt: 'Commercial harvest estate connected to nationwide Nigerian logistics corridors'
  }
};

const INTEREST_MAP: Record<string, string> = {
  arable: 'Arable/Crop Farming (Grain, Vegetables, Cash crops)',
  livestock: 'Livestock Farming (Poultry, Fishery, Piggery, Cattle/Goats)',
  mechanization: 'Mechanized Land Clearing & Preparation Only',
  seeds: 'Premium Seeds/Seedlings Supply Only',
  logistics: 'Integrated Farming (Both Crop & Livestock)'
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'crops' | 'livestock' | 'mechanization'>('all');
  const [scale, setScale] = useState<'small' | 'medium' | 'large'>('medium');
  const [sector, setSector] = useState<'arable' | 'livestock' | 'integrated'>('integrated');

  const filteredServices =
    filter === 'all'
      ? SALES_COPY.services
      : SALES_COPY.services.filter((s) => s.category === filter);

  const getEstimatorOutput = () => {
    const scaleConfig = {
      small: {
        acreage: '1 – 5 Acres / Modular Plots',
        setupTime: '30 – 45 Days',
        budgetFloor: '₦5M – ₦15M',
        yieldRange: sector === 'arable' ? '30% – 42%' : '35% – 48%'
      },
      medium: {
        acreage: '5 – 50 Acres Commercial',
        setupTime: '60 – 90 Days',
        budgetFloor: '₦15M – ₦50M',
        yieldRange: sector === 'integrated' ? '38% – 55%' : '35% – 50%'
      },
      large: {
        acreage: '50+ Acres Agro-Estate',
        setupTime: '90 – 120 Days',
        budgetFloor: '₦50M – ₦100M+',
        yieldRange: '45% – 62%'
      }
    };

    const sectorNotes = {
      arable: 'Laboratory soil treatment, hybrid seed propagation, solar drip irrigation, and processor off-take.',
      livestock: 'Bio-secure poultry battery cages, borehole water reticulation, RAS fishery ponds, and veterinary scheduling.',
      integrated: 'Dual crop-livestock nutrient loop, mechanized clearing fleet, irrigation infrastructure, and nationwide haulage.'
    };

    return {
      ...scaleConfig[scale],
      scopeSummary: sectorNotes[sector]
    };
  };

  const estimate = getEstimatorOutput();

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
            <span className="text-amber-400 font-medium">Services</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Turnkey Agribusiness Services
          </h1>
          <p className="text-stone-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            Five integrated engineering and agronomy pillars designed to move your farm from raw land to commercial revenue.
          </p>
        </div>
      </section>

      {/* Filter Bar & Service Directory */}
      <section className="bg-white py-14 lg:py-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Interactive Segmented Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-emerald-950">
              Service Specifications
            </h2>
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-md border border-stone-200">
              {[
                { id: 'all', label: 'All Services (5)' },
                { id: 'crops', label: 'Crops & Seeds' },
                { id: 'livestock', label: 'Livestock' },
                { id: 'mechanization', label: 'Fleet & Logistics' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                    filter === tab.id
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-stone-600 hover:text-emerald-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Rows */}
          <div className="space-y-10">
            {filteredServices.map((service) => {
              const media = SERVICE_IMAGES[service.id];
              return (
                <article
                  key={service.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-stone-200 rounded-lg overflow-hidden bg-white"
                >
                  <div className="lg:col-span-5 bg-stone-100 min-h-[240px]">
                    <ImageWithFallback
                      src={media.src}
                      alt={media.alt}
                      fallbackTitle={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-stone-500">
                        <span>{service.number}</span>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>{service.tag}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-emerald-950">
                        {service.number}. {service.title}
                      </h3>

                      <p className="text-sm font-medium text-amber-700">{service.subtitle}</p>

                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 pt-2">
                        {service.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-sm text-stone-700">
                            <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-xs text-stone-500">
                        <span className="font-semibold text-stone-700">Deliverables:</span>{' '}
                        {service.deliverables}
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('contact', INTEREST_MAP[service.id])}
                        className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                      >
                        <span>Request Proposal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Project Scale & Yield Estimator */}
      <section className="bg-[#F7F8F6] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Planning Benchmark
            </p>
            <h2 className="font-serif text-3xl font-bold text-emerald-950">
              Project Scale &amp; Execution Estimator
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Select your target land scale and production focus to review standard Kwara State mobilization timelines and projected annual return benchmarks.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  1. Target Land Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'small', label: '1 – 5 Acres' },
                    { id: 'medium', label: '5 – 50 Acres' },
                    { id: 'large', label: '50+ Acres' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScale(opt.id as any)}
                      className={`px-3 py-2.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                        scale === opt.id
                          ? 'bg-emerald-900 text-white border-emerald-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  2. Venture Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'arable', label: 'Arable Crops' },
                    { id: 'livestock', label: 'Elite Livestock' },
                    { id: 'integrated', label: 'Integrated Both' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSector(opt.id as any)}
                      className={`px-3 py-2.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                        sector === opt.id
                          ? 'bg-emerald-900 text-white border-emerald-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed pt-1">
                {estimate.scopeSummary}
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#F7F8F6] border border-stone-200 rounded-lg p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="text-xs text-stone-500">Scale Tier</div>
                  <div className="text-sm font-bold text-emerald-950 mt-0.5 tabular-nums">
                    {estimate.acreage}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Turnkey Timeline</div>
                  <div className="text-sm font-bold text-emerald-950 mt-0.5 tabular-nums">
                    {estimate.setupTime}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Typical Capital Range</div>
                  <div className="text-sm font-bold text-emerald-950 mt-0.5 tabular-nums">
                    {estimate.budgetFloor}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Projected Annualized Yield</div>
                  <div className="text-lg font-serif font-bold text-amber-700 mt-0.5 tabular-nums">
                    {estimate.yieldRange}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('contact', INTEREST_MAP[sector === 'arable' ? 'arable' : sector === 'livestock' ? 'livestock' : 'logistics'])}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-md transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Feasibility Report for This Scale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
