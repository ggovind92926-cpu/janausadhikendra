import React, { useState } from 'react';
import { 
  MapPin, Phone, MessageCircle, Clock, Navigation, 
  Copy, Check, ShieldCheck, HeartPulse, Sparkles, Building2 
} from 'lucide-react';
import { STORE_INFO } from '../data/medicines';

export const StoreLocationCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(`${STORE_INFO.name}, Owner: ${STORE_INFO.owner}, ${STORE_INFO.address}, Mob: ${STORE_INFO.phoneRaw}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="store-location" className="py-14 bg-gradient-to-b from-white to-blue-50/50 border-b border-blue-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Store Location & Owner Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Visit Our Kendra in Gomti Nagar, Lucknow
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Conveniently located at the intersection of Bhaisora STP Road and Shiv Nagar Tiraha in Khargapur. Come visit in person or call us for prompt home delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Store Details & Owner Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Owner and Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs text-blue-800 font-bold uppercase tracking-wider">
                    Authorized Kendra Incharge
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950">
                    {STORE_INFO.owner}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Proprietor · Pradhan Mantri Bhartiya Janaushadhi Kendra
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed PMBJP Kendra</span>
                </div>
              </div>

              {/* Exact Address */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                      Full Store Address
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5 leading-snug">
                      {STORE_INFO.address}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Landmark: {STORE_INFO.landmark} · Gomti Nagar, Lucknow, UP
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3 pt-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                      Operating Hours
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">
                      {STORE_INFO.timings}
                    </div>
                    <div className="text-xs text-emerald-700 font-medium">
                      {STORE_INFO.workingDays}
                    </div>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex items-start gap-3 pt-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                      Direct Mobile / WhatsApp Contact
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">
                      {STORE_INFO.phone}
                    </div>
                    <div className="text-xs text-slate-500">
                      Spoken languages: Hindi, English
                    </div>
                  </div>
                </div>
              </div>

              {/* In-store Services */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Complimentary Healthcare Services Available
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Free Blood Pressure Checkup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Random Blood Sugar Testing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Cold-Chain Insulin Storage</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Home Delivery in Gomti Nagar</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3 mt-6">
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Govind Joshi</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                  `Namaste Govind ji, I need directions / medicines from your Jan Aushadhi Kendra at Khargapur Gomti Nagar.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Address Copied' : 'Copy Full Address'}</span>
              </button>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors ml-auto"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions on Map</span>
              </a>
            </div>

          </div>

          {/* Right Column: Imagery & Dispensary Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Storefront / Dispensary Image */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-200 shadow-sm bg-white">
              <img
                src="/src/assets/images/kendra_storefront_lucknow_1791728946824.jpg"
                alt="Jan Aushadhi Kendra Storefront Lucknow"
                className="w-full h-56 sm:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900">
                  Storefront View · Khargapur, Gomti Nagar
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Bhaisora STP Road Tiraha & Shiv Nagar Tiraha junction
                </div>
              </div>
            </div>

            {/* Medicine Quality & Supply Chain Image */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-200 shadow-sm bg-white flex-1">
              <img
                src="/src/assets/images/medicine_generic_showcase_1791728935524.jpg"
                alt="Jan Aushadhi Generic Medicine Packaging"
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="text-xs font-bold text-blue-900">
                  Government Quality Assurance
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Every batch tested in independent NABL accredited laboratories prior to distribution.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
