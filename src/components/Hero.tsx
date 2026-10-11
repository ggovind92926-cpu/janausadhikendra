import React from 'react';
import { Phone, MessageCircle, MapPin, Search, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/medicines';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenPrescriptionModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenPrescriptionModal,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-slate-50 border-b border-blue-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Information & Key Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Initiative Badge - Unboxed Text */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
              <span className="uppercase tracking-wider">Government of India Initiative</span>
              <span aria-hidden="true">·</span>
              <span>PMBJP Code Authorized</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700">50%–90% Savings</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
              Affordable, High-Quality Medicines for Every Family in Lucknow
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Welcome to <span className="font-semibold text-blue-900">Pradhan Mantri Bhartiya Janaushadhi Kendra</span> in Gomti Nagar, managed by <span className="font-semibold text-slate-900">{STORE_INFO.owner}</span>. Get certified generic drugs with identical efficacy and salt composition at a fraction of branded market rates.
            </p>

            {/* Quick Search Input */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-xl border-2 border-blue-600 shadow-sm focus-within:ring-3 focus-within:ring-blue-100 transition-all">
                <Search className="w-5 h-5 text-blue-600 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by salt, brand (e.g. Paracetamol, Dolo, Pan-D, Telma, Metformin)..."
                  className="w-full py-3.5 pl-3 pr-4 text-sm sm:text-base text-slate-900 bg-transparent rounded-xl focus:outline-hidden placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="mr-3 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Popular: Paracetamol 650 · Pan-D · Metformin 500 · Telmisartan 40 · Multivitamins · Suvidha Pads
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#medicines"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors"
              >
                <span>Browse Medicines</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenPrescriptionModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-blue-900 bg-white hover:bg-blue-50 border border-blue-300 rounded-lg shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Upload Prescription</span>
              </button>

              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call {STORE_INFO.owner}</span>
              </a>
            </div>

            {/* Address & Trust Strip */}
            <div className="pt-2 border-t border-blue-100/80">
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Store Address: </span>
                  {STORE_INFO.address}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Pharmacy Visual & Store Badge */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-blue-200 shadow-md bg-white">
              <img
                src="/src/assets/images/hero_janaushadhi_kendra_1791728919831.jpg"
                alt="Pradhan Mantri Bhartiya Janaushadhi Kendra Dispensary in Lucknow"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                  Official Kendra · Lucknow
                </div>
                <div className="text-lg font-bold text-white">
                  Owner: {STORE_INFO.owner}
                </div>
                <div className="text-xs text-blue-100 flex items-center gap-2 mt-1">
                  <span>Mob: {STORE_INFO.phone}</span>
                  <span>·</span>
                  <span>Open 8:00 AM – 10:30 PM</span>
                </div>
              </div>
            </div>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-blue-100 text-center shadow-xs">
                <div className="text-blue-700 font-extrabold text-lg sm:text-xl tabular-nums">50-90%</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Price Savings</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-100 text-center shadow-xs">
                <div className="text-emerald-700 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>WHO-GMP</span>
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Certified Quality</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-100 text-center shadow-xs">
                <div className="text-blue-900 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>NABL</span>
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Lab Batch Tested</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
