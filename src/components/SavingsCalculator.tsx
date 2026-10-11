import React, { useState } from 'react';
import { Calculator, Check, ShoppingBag, MessageCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { MEDICINES_DATA, Medicine, STORE_INFO } from '../data/medicines';

interface SavingsCalculatorProps {
  onAddMultipleToCart: (medicineIds: string[]) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  onAddMultipleToCart,
}) => {
  // Pre-selected chronic medicines for demo
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'med-006', // Metformin 500mg
    'med-011', // Telmisartan 40mg
    'med-013', // Atorvastatin 10mg
    'med-017', // Pantoprazole 40mg
    'med-030', // Calcium + D3
  ]);

  const toggleMedicine = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate costs based on monthly usage (assuming 3 strips of 10 = 30 tablets per month)
  const monthlyData = selectedIds.map((id) => {
    const med = MEDICINES_DATA.find((m) => m.id === id);
    if (!med) return { med: null, janCost: 0, mktCost: 0, savings: 0 };
    // Assuming 30 tablets/month for chronic daily drugs, ~3 packs
    const packsPerMonth = med.dosageForm === 'Tablet' || med.dosageForm === 'Capsule' ? 3 : 1;
    const janCost = med.janAushadhiPrice * packsPerMonth;
    const mktCost = med.marketPrice * packsPerMonth;
    const savings = mktCost - janCost;
    return { med, packsPerMonth, janCost, mktCost, savings };
  }).filter((item) => item.med !== null);

  const totalJanCost = monthlyData.reduce((acc, curr) => acc + curr.janCost, 0);
  const totalMktCost = monthlyData.reduce((acc, curr) => acc + curr.mktCost, 0);
  const totalMonthlySavings = totalMktCost - totalJanCost;
  const totalAnnualSavings = totalMonthlySavings * 12;
  const overallSavingsPercent = totalMktCost > 0 ? Math.round((totalMonthlySavings / totalMktCost) * 100) : 0;

  const selectableChronicMedicines = MEDICINES_DATA.filter((m) => 
    ['Diabetes Care', 'Cardiac & BP', 'Acidity & Digestion', 'Vitamins & Supplements'].includes(m.category)
  );

  return (
    <section id="savings-calculator" className="py-12 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Household Savings Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Calculate How Much Your Family Saves Every Month
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Select the regular medications your family takes every month for diabetes, hypertension, acid reflux, or vitamins. See the real difference between market branded medicines and Jan Aushadhi generic prices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selectable Medicines Checklist */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Monthly Regular Medications:
              </span>
              <button
                onClick={() => setSelectedIds(selectableChronicMedicines.map((m) => m.id))}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
              >
                Select All
              </button>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-2">
              {selectableChronicMedicines.map((med) => {
                const isSelected = selectedIds.includes(med.id);
                const packSavings = med.marketPrice - med.janAushadhiPrice;

                return (
                  <div
                    key={med.id}
                    onClick={() => toggleMedicine(med.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-400 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-blue-700 border-blue-700 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {med.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {med.genericSalt} · <span className="text-slate-400">Like {med.popularBrandEquivalent}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-blue-700 tabular-nums">
                        ₹{med.janAushadhiPrice} <span className="text-[10px] text-slate-400 font-normal">/pack</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium tabular-nums">
                        Save ₹{packSavings}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Results Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-2xl p-6 shadow-md space-y-6">
            
            <div className="flex items-center justify-between border-b border-blue-800/80 pb-4">
              <div>
                <div className="text-xs text-blue-200 font-medium">Calculation for</div>
                <div className="text-base font-bold text-white">
                  {selectedIds.length} Selected Medicines / Month
                </div>
              </div>
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                Save {overallSavingsPercent}%
              </div>
            </div>

            {/* Side-by-side cost summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-800/40 rounded-xl p-3.5 border border-blue-700/50">
                <div className="text-xs text-blue-300">Branded Market Cost</div>
                <div className="text-2xl font-bold text-slate-300 line-through tabular-nums mt-1">
                  ₹{totalMktCost}
                </div>
                <div className="text-[11px] text-blue-300 mt-0.5">Approx. private chemist</div>
              </div>

              <div className="bg-emerald-950/60 rounded-xl p-3.5 border border-emerald-600/40">
                <div className="text-xs text-emerald-300 font-semibold">Jan Aushadhi Cost</div>
                <div className="text-2xl font-extrabold text-emerald-300 tabular-nums mt-1">
                  ₹{totalJanCost}
                </div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Kendra price</div>
              </div>
            </div>

            {/* Savings Highlights */}
            <div className="space-y-3 pt-2">
              <div className="bg-blue-800/60 rounded-xl p-4 border border-blue-700/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-200 font-medium">Monthly Direct Savings:</span>
                  <span className="text-xl font-extrabold text-emerald-300 tabular-nums">
                    ₹{totalMonthlySavings.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-700/60">
                  <span className="text-xs text-blue-200 font-medium">Yearly (12 Months) Savings:</span>
                  <span className="text-2xl font-extrabold text-white tabular-nums text-emerald-400">
                    ₹{totalAnnualSavings.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-blue-200/90 leading-relaxed">
                Money saved can pay for healthy groceries, school fees, or essential family needs!
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onAddMultipleToCart(selectedIds)}
                disabled={selectedIds.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-blue-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Selected Pack to Medicine Bag</span>
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                  `Namaste Govind ji, I calculated my monthly medicines on your Jan Aushadhi website. I would like to order this regular monthly supply (Monthly estimated cost: ₹${totalJanCost}). Please check availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-blue-800 hover:bg-blue-700 rounded-xl border border-blue-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Inquire this Pack on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
