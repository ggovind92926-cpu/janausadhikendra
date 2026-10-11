import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Minus, Check, ShoppingBag, 
  Percent, ArrowUpDown, Filter, ShieldCheck, Heart 
} from 'lucide-react';
import { Medicine, MEDICINE_CATEGORIES } from '../data/medicines';

interface MedicineCatalogProps {
  medicines: Medicine[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cart: { [id: string]: number };
  onAddToCart: (medicine: Medicine) => void;
  onRemoveFromCart: (medicineId: string) => void;
  onOpenPrescriptionModal: () => void;
}

export const MedicineCatalog: React.FC<MedicineCatalogProps> = ({
  medicines,
  searchQuery,
  onSearchChange,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenPrescriptionModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'savings' | 'price-asc' | 'price-desc' | 'name'>('savings');
  const [dosageFilter, setDosageFilter] = useState<string>('All');

  // Filter & sort medicines
  const filteredMedicines = useMemo(() => {
    return medicines
      .filter((med) => {
        // Category filter
        if (selectedCategory !== 'All' && med.category !== selectedCategory) {
          return false;
        }

        // Dosage form filter
        if (dosageFilter !== 'All' && med.dosageForm !== dosageFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = med.name.toLowerCase().includes(q);
          const matchSalt = med.genericSalt.toLowerCase().includes(q);
          const matchIndication = med.indications.toLowerCase().includes(q);
          const matchEquivalent = med.popularBrandEquivalent.toLowerCase().includes(q);
          const matchCategory = med.category.toLowerCase().includes(q);
          return matchName || matchSalt || matchIndication || matchEquivalent || matchCategory;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'savings') {
          const savingsA = (a.marketPrice - a.janAushadhiPrice) / a.marketPrice;
          const savingsB = (b.marketPrice - b.janAushadhiPrice) / b.marketPrice;
          return savingsB - savingsA;
        }
        if (sortBy === 'price-asc') {
          return a.janAushadhiPrice - b.janAushadhiPrice;
        }
        if (sortBy === 'price-desc') {
          return b.janAushadhiPrice - a.janAushadhiPrice;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [medicines, selectedCategory, dosageFilter, searchQuery, sortBy]);

  return (
    <section id="medicines" className="py-12 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with single focal point */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
              Official Jan Aushadhi Dispensary Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Genuine Generic Medicines Available in Stock
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Manufactured as per Indian Pharmacopoeia (IP) standards with guaranteed chemical potency.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-500 font-medium">Showing:</span>
            <span className="text-xs font-bold text-blue-900 tabular-nums">
              {filteredMedicines.length} Medicines
            </span>
          </div>
        </div>

        {/* Category Tabs (Segmented control) */}
        <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            {MEDICINE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Inner Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search in catalog..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
            {/* Dosage Form Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Type:</span>
              <select
                value={dosageFilter}
                onChange={(e) => setDosageFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:border-blue-600"
              >
                <option value="All">All Formats</option>
                <option value="Tablet">Tablets</option>
                <option value="Capsule">Capsules</option>
                <option value="Syrup">Syrups</option>
                <option value="Device">Devices</option>
                <option value="Hygiene">Hygiene / Pads</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:border-blue-600"
              >
                <option value="savings">Highest Savings (%)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMedicines.map((med) => {
            const quantityInCart = cart[med.id] || 0;
            const savingsAmount = med.marketPrice - med.janAushadhiPrice;
            const savingsPercent = Math.round((savingsAmount / med.marketPrice) * 100);

            return (
              <div
                key={med.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  {/* Category and Form - Clean Unboxed Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-blue-800">{med.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{med.dosageForm}</span>
                      <span aria-hidden="true">·</span>
                      <span>{med.packSize}</span>
                    </div>
                    {med.inStock && (
                      <span className="text-[11px] font-semibold text-emerald-700">In Stock</span>
                    )}
                  </div>

                  {/* Medicine Name */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {med.name}
                  </h3>

                  {/* Generic Active Composition */}
                  <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Composition: </span>
                    <span>{med.genericSalt}</span>
                  </div>

                  {/* Brand Comparison Info */}
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="text-slate-400">Equivalent to: </span>
                    <span className="text-slate-700 font-medium">{med.popularBrandEquivalent}</span>
                  </div>

                  {/* Indications / Used for */}
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    <span className="font-medium text-slate-600">Uses: </span>
                    {med.indications}
                  </p>
                </div>

                {/* Pricing & Add to Cart Module */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        Jan Aushadhi Price
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-blue-700 tabular-nums">
                          ₹{med.janAushadhiPrice}
                        </span>
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          Mkt ₹{med.marketPrice}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                        Save {savingsPercent}%
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
                        Save ₹{savingsAmount}
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Counter or Add */}
                  {quantityInCart > 0 ? (
                    <div className="flex items-center justify-between bg-white border border-blue-600 rounded-lg p-1">
                      <button
                        onClick={() => onRemoveFromCart(med.id)}
                        className="w-8 h-8 flex items-center justify-center text-blue-700 hover:bg-blue-50 rounded font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold text-blue-900 tabular-nums px-2">
                        {quantityInCart} in bag
                      </span>
                      <button
                        onClick={() => onAddToCart(med)}
                        className="w-8 h-8 flex items-center justify-center text-blue-700 hover:bg-blue-50 rounded font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(med)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-2xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Medicine Bag</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-6">
            <div className="max-w-md mx-auto space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No medicines found for your criteria
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If the specific salt is not listed online, Govind Joshi can arrange any Jan Aushadhi generic within hours at the Lucknow Kendra.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setDosageFilter('All');
                    onSearchChange('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
                <button
                  onClick={onOpenPrescriptionModal}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  Send Prescription to Kendra
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
