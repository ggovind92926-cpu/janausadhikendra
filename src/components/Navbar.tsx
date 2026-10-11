import React from 'react';
import { Phone, MessageCircle, MapPin, ShoppingBag, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/medicines';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenPrescriptionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenPrescriptionModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-blue-100 shadow-xs">
      {/* Top Essential Bar with Owner Details and Address */}
      <div className="bg-blue-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-blue-200">Owner: {STORE_INFO.owner}</span>
            <span className="hidden sm:inline text-blue-400">|</span>
            <a 
              href={`tel:${STORE_INFO.phoneRaw}`} 
              className="inline-flex items-center gap-1 text-white hover:text-blue-200 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <span className="hidden md:inline text-blue-400">|</span>
            <div className="hidden md:flex items-center gap-1 text-blue-100">
              <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span className="truncate max-w-md">Khargapur, Gomti Nagar, Lucknow</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-1 text-blue-200">
              <Clock className="w-3.5 h-3.5" />
              <span>{STORE_INFO.timings}</span>
            </span>
            <button
              onClick={onOpenPrescriptionModal}
              className="inline-flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-600 px-2.5 py-0.5 rounded text-xs font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-300" />
              <span>Prescription Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs">
            <span className="text-sm font-extrabold tracking-wider">PM</span>
          </div>
          <div className="whitespace-nowrap">
            <div className="text-base sm:text-lg font-bold text-blue-900 tracking-tight leading-tight">
              Pradhan Mantri Bhartiya Janaushadhi Kendra
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Gomti Nagar, Lucknow · Quality Medicines at 50%–90% Savings
            </div>
          </div>
        </a>

        {/* Zone 2: Clean 4–5 single-line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#medicines" className="hover:text-blue-800 transition-colors whitespace-nowrap shrink-0">
            Medicines Catalog
          </a>
          <a href="#brand-match" className="hover:text-blue-800 transition-colors whitespace-nowrap shrink-0">
            Salt & Brand Match
          </a>
          <a href="#savings-calculator" className="hover:text-blue-800 transition-colors whitespace-nowrap shrink-0">
            Savings Calculator
          </a>
          <a href="#store-location" className="hover:text-blue-800 transition-colors whitespace-nowrap shrink-0">
            Store & Location
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer / Order Bag) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent('Hello Govind ji, I want to inquire about Jan Aushadhi medicines at your Lucknow Kendra.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Govind Joshi</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            aria-label="View Medicine Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Medicine Bag</span>
            {cartItemCount > 0 && (
              <span className="bg-emerald-400 text-slate-900 font-bold px-1.5 py-0.2 rounded-full text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
