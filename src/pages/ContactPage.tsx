import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { CONTACT_INFO, GOOGLE_APPS_SCRIPT_URL } from '../data/copy';
import { LeadFormData, LeadSubmissionResponse, PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  preselectedInterest?: string;
}

const FARMING_OPTIONS = [
  'Arable/Crop Farming (Grain, Vegetables, Cash crops)',
  'Livestock Farming (Poultry, Fishery, Piggery, Cattle/Goats)',
  'Integrated Farming (Both Crop & Livestock)',
  'Mechanized Land Clearing & Preparation Only',
  'Premium Seeds/Seedlings Supply Only'
];

const LAND_STATUS_OPTIONS = [
  'Yes, in Kwara State.',
  'Yes, in another State in Nigeria',
  'No, I would like JAYTECH FARMS to assist in securing fertile land in Kwara State.'
];

const LAND_SCALE_OPTIONS = [
  'Small Scale (1 – 5 Acres / Plot-based livestock)',
  'Medium Scale (5 – 50 Acres)',
  'Large/Commercial Scale (50+ Acres)'
];

const BUDGET_OPTIONS = [
  '₦5 Million – ₦15 Million',
  '₦15 Million – ₦50 Million',
  '₦50 Million – ₦100 Million',
  '₦100 Million+'
];

const TIMELINE_OPTIONS = [
  'Immediately (Within 30 days)',
  '1 to 3 Months',
  '3 to 6 Months',
  'Just planning/Inquiry'
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  preselectedInterest
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    farmingInterests: preselectedInterest ? [preselectedInterest] : [],
    landStatus: 'Yes, in Kwara State.',
    otherStateLocation: '',
    landScale: 'Medium Scale (5 – 50 Acres)',
    budget: '₦15 Million – ₦50 Million',
    timeline: 'Immediately (Within 30 days)',
    additionalDetails: '',
    googleSheetWebappUrl: GOOGLE_APPS_SCRIPT_URL
  });

  useEffect(() => {
    if (preselectedInterest) {
      setFormData((prev) =>
        prev.farmingInterests.includes(preselectedInterest)
          ? prev
          : { ...prev, farmingInterests: [...prev.farmingInterests, preselectedInterest] }
      );
    }
  }, [preselectedInterest]);

  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedWA, setCopiedWA] = useState(false);

  const directWhatsAppUrl = `https://wa.me/${CONTACT_INFO.whatsappIntl}?text=${encodeURIComponent(
    'Hello JAYTECH FARMS, I would like to book a turnkey farm setup consultation in Kwara State.'
  )}`;

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.farmingInterests.includes(interest);
      return {
        ...prev,
        farmingInterests: exists
          ? prev.farmingInterests.filter((i) => i !== interest)
          : [...prev.farmingInterests, interest]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your full name, email address, and WhatsApp or telephone number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Unable to submit consultation brief.');
      }

      setSubmissionResult(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your brief. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyWAMessage = () => {
    if (submissionResult?.whatsappUrl) {
      const urlObj = new URL(submissionResult.whatsappUrl);
      const text = urlObj.searchParams.get('text') || '';
      navigator.clipboard.writeText(text);
      setCopiedWA(true);
      setTimeout(() => setCopiedWA(false), 3000);
    }
  };

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
            <span className="text-amber-400 font-medium">Contact &amp; Consultation</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Schedule Your Farm Setup Consultation
          </h1>
          <p className="text-stone-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            Submit your project specifications below. A Senior Agribusiness Consultant reviews every brief within {CONTACT_INFO.consultationTurnaround}.
          </p>
        </div>
      </section>

      {/* Main 2-Column WordPress Contact & Form Section */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Sidebar: Verified Office & Direct Channels */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-[#F7F8F6] border border-stone-200 rounded-lg p-6 space-y-6">
                <div className="space-y-1.5">
                  <h2 className="font-serif text-xl font-bold text-emerald-950">
                    Direct Contact Desk
                  </h2>
                  <p className="text-sm text-stone-600">
                    Reach our Kwara operations team directly by phone, WhatsApp, or email.
                  </p>
                </div>

                <div className="space-y-4 text-sm border-t border-stone-200 pt-5">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-emerald-800 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-stone-500">WhatsApp Briefing Line</div>
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-emerald-950 hover:text-amber-700 tabular-nums"
                      >
                        {CONTACT_INFO.whatsappFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-emerald-800 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-stone-500">Direct Telephone</div>
                      <a
                        href={`tel:${CONTACT_INFO.phoneNumber}`}
                        className="font-semibold text-emerald-950 hover:text-amber-700 tabular-nums"
                      >
                        {CONTACT_INFO.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-emerald-800 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-stone-500">Official Email</div>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="font-semibold text-emerald-950 hover:text-amber-700 break-all"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-stone-500">Operational Hub</div>
                      <div className="font-medium text-stone-800">{CONTACT_INFO.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-emerald-800 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-stone-500">Consultation Hours</div>
                      <div className="font-medium text-stone-800">{CONTACT_INFO.officeHours}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold rounded-md transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open Direct WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="border border-stone-200 rounded-lg p-6 space-y-2">
                <h3 className="font-serif text-base font-bold text-emerald-950">
                  Field Operations Updates
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  View active land clearing, irrigation installations, and livestock setup walkthroughs on TikTok at{' '}
                  <a
                    href={CONTACT_INFO.tikTokUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-emerald-900 underline"
                  >
                    {CONTACT_INFO.tikTokHandle}
                  </a>
                  .
                </p>
              </div>
            </aside>

            {/* Right Main Column: Consultation Questionnaire */}
            <div className="lg:col-span-8">
              {submissionResult ? (
                <div className="bg-[#F7F8F6] border border-emerald-800/30 rounded-lg p-8 sm:p-10 space-y-6">
                  <div className="flex items-center gap-3 text-emerald-900">
                    <CheckCircle2 className="w-8 h-8 text-emerald-800 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 tabular-nums">
                        Reference ID: {submissionResult.lead.id}
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-emerald-950">
                        Consultation Brief Received
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Thank you, <strong>{submissionResult.lead.fullName}</strong>. Your project details have been logged for our senior agronomists. Click below to dispatch your pre-formatted brief straight to our WhatsApp desk for priority review.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={submissionResult.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-md transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Send Brief via WhatsApp ({CONTACT_INFO.whatsappNumber})</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyWAMessage}
                      className="px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-medium text-sm rounded-md transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copiedWA ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedWA ? 'Brief Copied' : 'Copy Brief Text'}</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                    <span>
                      {submissionResult.googleSheetSynced
                        ? 'Confirmed: Brief synced to operations sheet.'
                        : 'Confirmed: Brief saved to JAYTECH FARMS desk.'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSubmissionResult(null)}
                      className="text-emerald-900 font-semibold hover:underline cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#F7F8F6] border border-stone-200 rounded-lg p-6 sm:p-8 space-y-8"
                  noValidate
                >
                  <div className="space-y-1 border-b border-stone-200 pb-5">
                    <h2 className="font-serif text-2xl font-bold text-emerald-950">
                      Agribusiness Consultation Questionnaire
                    </h2>
                    <p className="text-sm text-stone-600">
                      Fields marked with <span className="text-amber-700 font-semibold">*</span> are required.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-4 rounded-md bg-rose-50 border border-rose-300 text-rose-900 text-sm font-medium flex items-center gap-2.5"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 1. Personal / Corporate Information */}
                  <div className="space-y-5">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      01. Personal / Corporate Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="jf-fullName" className="block text-xs font-semibold text-stone-700">
                          Full Name <span className="text-amber-700">*</span>
                        </label>
                        <input
                          id="jf-fullName"
                          type="text"
                          required
                          placeholder="e.g. Dr. Samuel Babatunde"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="jf-company" className="block text-xs font-semibold text-stone-700">
                          Company / Organization
                        </label>
                        <input
                          id="jf-company"
                          type="text"
                          placeholder="e.g. Crown Global Agri Ltd"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="jf-email" className="block text-xs font-semibold text-stone-700">
                          Email Address <span className="text-amber-700">*</span>
                        </label>
                        <input
                          id="jf-email"
                          type="email"
                          required
                          placeholder="investor@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="jf-phone" className="block text-xs font-semibold text-stone-700">
                          WhatsApp / Phone Number <span className="text-amber-700">*</span>
                        </label>
                        <input
                          id="jf-phone"
                          type="tel"
                          required
                          placeholder="+234 803 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-800"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label htmlFor="jf-location" className="block text-xs font-semibold text-stone-700">
                          City &amp; Country of Residence
                        </label>
                        <input
                          id="jf-location"
                          type="text"
                          placeholder="e.g. London, United Kingdom / Lagos, Nigeria"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Project Scope */}
                  <div className="space-y-5 pt-4 border-t border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      02. Project Scope &amp; Land Status
                    </h3>

                    <div className="space-y-2.5">
                      <span className="block text-xs font-semibold text-stone-700">
                        Farming Ventures of Interest (Select all that apply)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {FARMING_OPTIONS.map((option, idx) => {
                          const checked = formData.farmingInterests.includes(option);
                          return (
                            <label
                              key={idx}
                              className={`flex items-start gap-2.5 p-3 rounded-md border text-xs sm:text-sm cursor-pointer transition-colors ${
                                checked
                                  ? 'bg-emerald-900 text-white border-emerald-900'
                                  : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleInterestToggle(option)}
                                className="mt-0.5 accent-amber-600"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <span className="block text-xs font-semibold text-stone-700">
                        Do you currently own land for this project?
                      </span>
                      <div className="space-y-2">
                        {LAND_STATUS_OPTIONS.map((status, idx) => (
                          <label
                            key={idx}
                            className={`flex items-center gap-2.5 p-3 rounded-md border text-xs sm:text-sm cursor-pointer transition-colors ${
                              formData.landStatus === status
                                ? 'bg-white border-emerald-800 text-emerald-950 font-medium'
                                : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="landStatus"
                              checked={formData.landStatus === status}
                              onChange={() => setFormData({ ...formData, landStatus: status })}
                              className="accent-emerald-800"
                            />
                            <span>{status}</span>
                          </label>
                        ))}
                      </div>

                      {formData.landStatus === 'Yes, in another State in Nigeria' && (
                        <input
                          type="text"
                          placeholder="Specify Nigerian State (e.g. Oyo, Ogun, Niger)..."
                          value={formData.otherStateLocation || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, otherStateLocation: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-800"
                        />
                      )}
                    </div>
                  </div>

                  {/* 3. Scale, Budget & Timeline */}
                  <div className="space-y-5 pt-4 border-t border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      03. Scale, Budget &amp; Timeline
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="jf-scale" className="block text-xs font-semibold text-stone-700">
                          Project Scale
                        </label>
                        <select
                          id="jf-scale"
                          value={formData.landScale}
                          onChange={(e) => setFormData({ ...formData, landScale: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-800"
                        >
                          {LAND_SCALE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="jf-budget" className="block text-xs font-semibold text-stone-700">
                          Setup Budget (Excl. Land)
                        </label>
                        <select
                          id="jf-budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-800"
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="jf-timeline" className="block text-xs font-semibold text-stone-700">
                          Target Commencement
                        </label>
                        <select
                          id="jf-timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-md bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-800"
                        >
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="jf-details" className="block text-xs font-semibold text-stone-700">
                        Additional Specifications or Requirements
                      </label>
                      <textarea
                        id="jf-details"
                        rows={4}
                        placeholder="Share preferred crops, livestock capacities, solar irrigation needs, or diaspora reporting preferences..."
                        value={formData.additionalDetails}
                        onChange={(e) =>
                          setFormData({ ...formData, additionalDetails: e.target.value })
                        }
                        className="w-full p-3.5 rounded-md bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-800"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold text-sm rounded-md transition-colors cursor-pointer"
                    >
                      {loading ? 'Submitting Consultation Brief...' : 'Submit Consultation Brief'}
                    </button>
                    <p className="text-xs text-stone-500 text-center">
                      Your project information is kept strictly confidential for structuring your farm engineering proposal.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
