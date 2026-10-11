/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandToGenericMatcher } from './components/BrandToGenericMatcher';
import { MedicineCatalog } from './components/MedicineCatalog';
import { SavingsCalculator } from './components/SavingsCalculator';
import { StoreLocationCard } from './components/StoreLocationCard';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { OrderCartDrawer } from './components/OrderCartDrawer';
import { Footer } from './components/Footer';
import { MEDICINES_DATA, Medicine, STORE_INFO } from './data/medicines';
import { Phone, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<{ [id: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('janaushadhi_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('janaushadhi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const handleAddToCart = (medicine: Medicine) => {
    setCart((prev) => ({
      ...prev,
      [medicine.id]: (prev[medicine.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (medicineId: string) => {
    setCart((prev) => {
      const current = prev[medicineId] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[medicineId];
        return updated;
      }
      return {
        ...prev,
        [medicineId]: current - 1,
      };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handleAddMultipleToCart = (medicineIds: string[]) => {
    setCart((prev) => {
      const updated = { ...prev };
      medicineIds.forEach((id) => {
        updated[id] = (updated[id] || 0) + 1;
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleSelectMedicineForCart = (medicineName: string) => {
    // Find matching medicine in catalog
    const target = MEDICINES_DATA.find(
      (m) =>
        m.name.toLowerCase().includes(medicineName.toLowerCase()) ||
        medicineName.toLowerCase().includes(m.name.toLowerCase()) ||
        m.genericSalt.toLowerCase().includes(medicineName.toLowerCase())
    );

    if (target) {
      handleAddToCart(target);
      setIsCartOpen(true);
    } else {
      // Set search query and scroll to catalog
      setSearchQuery(medicineName);
      const elem = document.getElementById('medicines');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const totalCartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
      {/* Navigation Header */}
      <Navbar
        cartItemCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Brand to Generic Salt Matcher */}
        <BrandToGenericMatcher
          onSelectMedicineForCart={handleSelectMedicineForCart}
        />

        {/* Jan Aushadhi Medicines Catalog */}
        <MedicineCatalog
          medicines={MEDICINES_DATA}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Interactive Savings Calculator */}
        <SavingsCalculator
          onAddMultipleToCart={handleAddMultipleToCart}
        />

        {/* Store Location & Govind Joshi Contact */}
        <StoreLocationCard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Prescription Upload & WhatsApp Inquiry Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
      />

      {/* Slide-out Order Cart Drawer */}
      <OrderCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        medicines={MEDICINES_DATA}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Mobile Bottom Quick Action Bar (Sticky cap compliant <= 15% viewport) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-3 py-2 shadow-lg flex items-center justify-between gap-2">
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-blue-50 text-blue-800 rounded-lg text-xs font-bold border border-blue-200"
        >
          <Phone className="w-3.5 h-3.5 text-blue-700" />
          <span>Call Store</span>
        </a>

        <a
          href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
            `Namaste Govind ji, I want to inquire about medicines from your Jan Aushadhi Kendra.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-2xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center justify-center gap-1 py-2 px-3 bg-blue-700 text-white rounded-lg text-xs font-bold"
          aria-label="View bag"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {totalCartItemCount > 0 && (
            <span className="bg-emerald-400 text-slate-900 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {totalCartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
