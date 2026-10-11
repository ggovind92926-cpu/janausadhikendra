import React, { useState, useRef } from 'react';
import { X, Upload, MessageCircle, FileText, CheckCircle2, Phone, AlertCircle, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/medicines';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let text = `*PRADHAN MANTRI BHARTIYA JANAUSHADHI KENDRA - PRESCRIPTION ORDER*\n`;
    text += `*Store Owner:* Govind Joshi (9616699394)\n`;
    text += `*Location:* Khargapur, Gomti Nagar, Lucknow\n\n`;
    text += `*Patient Name:* ${patientName || 'Not specified'}\n`;
    text += `*Contact Phone:* ${patientPhone || 'Same as WhatsApp'}\n`;
    text += `*Order Type:* ${deliveryType === 'delivery' ? 'Home Delivery in Lucknow' : 'Counter Pickup at Kendra'}\n`;
    if (deliveryType === 'delivery' && deliveryAddress) {
      text += `*Delivery Address:* ${deliveryAddress}\n`;
    }
    if (notes) {
      text += `*Patient Notes:* ${notes}\n`;
    }
    if (selectedFile) {
      text += `\n📎 *Doctor Prescription Attached:* Yes (Sending photo in next message)\n`;
    }
    text += `\nPlease check medicine availability, calculate Jan Aushadhi total bill and confirm.`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Quick Doctor Prescription Order
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Send Prescription to Govind Joshi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSendToWhatsApp} className="p-5 space-y-4">
          
          {/* Prescription Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Doctor Prescription Photo / Document
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/50 rounded-xl p-4 text-center cursor-pointer transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {previewUrl ? (
                <div className="space-y-2">
                  <img
                    src={previewUrl}
                    alt="Prescription preview"
                    className="max-h-40 mx-auto rounded-lg object-contain border border-slate-200"
                  />
                  <div className="text-xs text-blue-700 font-semibold">
                    ✓ {selectedFile?.name} (Click to change)
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 py-2">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                  <div className="text-xs font-semibold text-slate-800">
                    Click to select doctor's prescription photo
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Supports JPG, PNG or PDF from your mobile camera or gallery
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Patient / Customer Name
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Contact Mobile Number
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Delivery or Pickup Segmented Control */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Pickup or Delivery Option
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Store Counter Pickup (Khargapur)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Home Delivery (Lucknow)
              </button>
            </div>
          </div>

          {deliveryType === 'delivery' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Delivery Address in Lucknow
              </label>
              <textarea
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="House No, Street, Landmark in Gomti Nagar / Lucknow..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Any Special Instructions / Required Quantity
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Need 1 month supply for BP and Sugar"
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white"
            />
          </div>

          {/* Pharmacist Note */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
            <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Govind Joshi and our registered pharmacist will verify the doctor prescription, calculate Jan Aushadhi generic discount, and send a confirmation invoice on WhatsApp.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order to Govind Joshi on WhatsApp</span>
            </button>
            <div className="text-center mt-2 text-[11px] text-slate-500">
              Direct connection to +91 96166 99394
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
