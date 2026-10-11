import React, { useState } from 'react';
import { Search, ArrowRight, Check, TrendingDown, Sparkles } from 'lucide-react';
import { POPULAR_SUBSTITUTES, PopularSubstitute } from '../data/medicines';

interface BrandToGenericMatcherProps {
  onSelectMedicineForCart: (name: string) => void;
}

export const BrandToGenericMatcher: React.FC<BrandToGenericMatcherProps> = ({
  onSelectMedicineForCart,
}) => {
  const [query, setQuery] = useState('');
  const [copiedSalt, setCopiedSalt] = useState<string | null>(null);

  const filteredSubstitutes = POPULAR_SUBSTITUTES.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.brandName.toLowerCase().includes(q) ||
      item.genericSalt.toLowerCase().includes(q) ||
      item.janAushadhiEquivalent.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleCopySalt = (salt: string) => {
    navigator.clipboard?.writeText(salt);
    setCopiedSalt(salt);
    setTimeout(() => setCopiedSalt(null), 2000);
  };

  return (
    <section id="brand-match" className="py-12 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generic Salt & Brand Substitute Finder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Match Your Branded Doctor Prescriptions to Jan Aushadhi Generics
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Doctors often prescribe high-cost brand names. Jan Aushadhi medicines contain the <span className="font-semibold text-slate-800">exact same active chemical salt</span>, manufactured under strict WHO-GMP standards at up to 90% lower prices.
          </p>
        </div>

        {/* Search input for brand name */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand (e.g. Dolo, Pan-D, Telma, Augmentin)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 transition-colors"
            />
          </div>
        </div>

        {/* Quick Brand Pills for rapid lookup */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs no-scrollbar">
          <span className="text-slate-500 font-medium whitespace-nowrap">Try searching:</span>
          {['Dolo 650', 'Pan-D', 'Telma 40', 'Augmentin 625 Duo', 'Glycomet 500 SR', 'Shelcal 500', 'Montair LC', 'Atorva 10'].map((sample) => (
            <button
              key={sample}
              onClick={() => setQuery(sample)}
              className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 font-medium whitespace-nowrap transition-colors"
            >
              {sample}
            </button>
          ))}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="px-2 py-1 text-slate-500 hover:text-slate-700 font-medium whitespace-nowrap"
            >
              Reset
            </button>
          )}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubstitutes.map((item: PopularSubstitute) => (
            <div
              key={item.brandName}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Brand name & category */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {item.brandName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 line-through tabular-nums">
                      Market ₹{item.popularPrice}
                    </span>
                    <div className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-0.5">
                      <TrendingDown className="w-3 h-3" />
                      <span>Save {item.savingsPercent}%</span>
                    </div>
                  </div>
                </div>

                {/* Active Chemical Salt */}
                <div className="bg-slate-50 rounded-lg p-2.5 my-3 border border-slate-100">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                    Active Chemical Salt (100% Same)
                  </div>
                  <div className="text-xs font-semibold text-slate-800 leading-snug">
                    {item.genericSalt}
                  </div>
                </div>

                {/* Equivalent Jan Aushadhi Name & Price */}
                <div className="space-y-1 my-3">
                  <div className="text-xs text-blue-900 font-medium">
                    Jan Aushadhi Generic:
                  </div>
                  <div className="text-sm font-bold text-blue-950">
                    {item.janAushadhiEquivalent}
                  </div>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xl font-extrabold text-blue-700 tabular-nums">
                      ₹{item.janAushadhiPrice}
                    </span>
                    <span className="text-xs text-slate-500">
                      (You save ₹{item.savings} per pack)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopySalt(item.genericSalt)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  {copiedSalt === item.genericSalt ? '✓ Copied' : 'Copy Salt'}
                </button>
                <button
                  onClick={() => onSelectMedicineForCart(item.janAushadhiEquivalent)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
                >
                  <span>Add to Bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSubstitutes.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-600 text-sm">No direct match found for "{query}".</p>
            <p className="text-xs text-slate-500 mt-1">
              You can contact store owner Govind Joshi directly at 9616699394 to verify your doctor's salt prescription!
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-3 text-xs font-semibold text-blue-700 hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
