import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Medicine, STORE_INFO } from '../data/medicines';

interface OrderCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [id: string]: number };
  medicines: Medicine[];
  onAddToCart: (medicine: Medicine) => void;
  onRemoveFromCart: (medicineId: string) => void;
  onClearCart: () => void;
}

export const OrderCartDrawer: React.FC<OrderCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  medicines,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  if (!isOpen) return null;

  // Compute items in cart
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const med = medicines.find((m) => m.id === id);
      return { med, qty };
    })
    .filter((item): item is { med: Medicine; qty: number } => Boolean(item.med) && item.qty > 0);

  const totalJanCost = cartItems.reduce(
    (sum, item) => sum + item.med.janAushadhiPrice * item.qty,
    0
  );
  const totalMarketCost = cartItems.reduce(
    (sum, item) => sum + item.med.marketPrice * item.qty,
    0
  );
  const totalSavings = totalMarketCost - totalJanCost;
  const savingsPercent =
    totalMarketCost > 0 ? Math.round((totalSavings / totalMarketCost) * 100) : 0;

  const handleWhatsAppCheckout = () => {
    let msg = `*PRADHAN MANTRI BHARTIYA JANAUSHADHI KENDRA ORDER*\n`;
    msg += `*Store Owner:* Govind Joshi (9616699394)\n`;
    msg += `*Dispensary:* Khargapur, Gomti Nagar, Lucknow\n\n`;
    msg += `*Customer:* ${customerName || 'Inquiry Customer'}\n`;
    if (deliveryNote) {
      msg += `*Delivery / Pickup Note:* ${deliveryNote}\n`;
    }
    msg += `\n*Selected Medicines:*\n`;

    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.med.name}*\n`;
      msg += `   Composition: ${item.med.genericSalt}\n`;
      msg += `   Quantity: ${item.qty} pack(s) @ ₹${item.med.janAushadhiPrice} = ₹${item.qty * item.med.janAushadhiPrice}\n`;
      msg += `   (Market Brand equivalent: ${item.med.popularBrandEquivalent})\n\n`;
    });

    msg += `*TOTAL JAN AUSHADHI BILL:* ₹${totalJanCost}\n`;
    msg += `*Market Equivalent Value:* ₹${totalMarketCost}\n`;
    msg += `*TOTAL SAVINGS:* ₹${totalSavings} (${savingsPercent}% saved!)\n\n`;
    msg += `Please confirm availability and dispatch from your Gomti Nagar Kendra.`;

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-blue-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Your Medicine Bag</h3>
              <p className="text-xs text-slate-500">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-800">Your medicine bag is empty</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore the Jan Aushadhi catalog and add generic medicines to calculate your savings and place an order.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <span>Browse Medicines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Items in your list</span>
                <button
                  onClick={onClearCart}
                  className="text-red-600 hover:text-red-700 font-medium text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {cartItems.map(({ med, qty }) => (
                <div
                  key={med.id}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        {med.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {med.genericSalt} · {med.packSize}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-blue-700 tabular-nums">
                        ₹{med.janAushadhiPrice * qty}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through tabular-nums">
                        ₹{med.marketPrice * qty}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-emerald-700">
                      Save ₹{(med.marketPrice - med.janAushadhiPrice) * qty}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveFromCart(med.id)}
                        className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 tabular-nums px-1">
                        {qty}
                      </span>
                      <button
                        onClick={() => onAddToCart(med)}
                        className="w-6 h-6 rounded bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-800 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="pt-2 space-y-3">
              <div className="space-y-2 border-t border-slate-200 pt-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Your Name / Contact Info
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar, Gomti Nagar"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Delivery or Store Pickup Note
                </label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Counter pickup at 5 PM / Home delivery"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Equivalent Branded Cost:</span>
                <span className="line-through tabular-nums">₹{totalMarketCost}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Total Jan Aushadhi Savings:</span>
                <span className="tabular-nums">- ₹{totalSavings} ({savingsPercent}%)</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-blue-950 pt-1 border-t border-slate-200">
                <span>You Pay at Kendra:</span>
                <span className="text-xl text-blue-700 tabular-nums">₹{totalJanCost}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order to Govind Joshi (WhatsApp)</span>
            </button>

            <div className="text-center text-[11px] text-slate-500">
              Payment via Cash / UPI at pickup or on delivery · Kendra: 9616699394
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
