import React from 'react';
import { Phone, MapPin, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/medicines';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-slate-300 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Store & Initiative */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                PM
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Jan Aushadhi Kendra
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) Kendra in Lucknow, dedicated to bringing affordable quality generic healthcare to all citizens.
            </p>
            <div className="text-xs text-blue-300 font-semibold flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Pharmaceuticals & Medical Devices Bureau of India (PMBI)</span>
            </div>
          </div>

          {/* Col 2: Owner & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Store Incharge
            </h4>
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-white">{STORE_INFO.owner}</div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <a href={`tel:${STORE_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {STORE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a 
                  href={`https://wa.me/${STORE_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 96166 99394
                </a>
              </div>
              <div className="text-slate-400 pt-1">
                Open Daily: {STORE_INFO.timings}
              </div>
            </div>
          </div>

          {/* Col 3: Dispensary Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Kendra Location
            </h4>
            <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p>{STORE_INFO.address}</p>
                  <p className="text-slate-400 mt-1">Landmark: {STORE_INFO.landmark}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Statutory & Important Guidelines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quality & Compliance
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400">·</span>
                <span>All medicines sourced from WHO-GMP compliant pharmaceutical units.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400">·</span>
                <span>Batch tested at NABL accredited independent laboratories.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400">·</span>
                <span>Schedule H and H1 prescription drugs dispensed only upon presenting valid doctor prescription.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Pradhan Mantri Bhartiya Janaushadhi Kendra · Managed by {STORE_INFO.owner}, Lucknow.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Swasth Bharat, Samriddh Bharat</span>
            <span>·</span>
            <a href="#medicines" className="hover:text-white transition-colors">
              Medicines
            </a>
            <span>·</span>
            <a href="#store-location" className="hover:text-white transition-colors">
              Location
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
