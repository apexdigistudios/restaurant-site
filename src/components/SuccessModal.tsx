import { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  customerPhone: string;
}

export default function SuccessModal({ isOpen, onClose, orderId, customerPhone }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi Daddy's Pizza! My order #${orderId} has been placed. Please confirm.`);
    window.open(`https://wa.me/233200000000?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md animate-modalIn">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl blur-2xl opacity-30 animate-pulse-glow"></div>

        {/* Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-red-500/20 shadow-2xl shadow-red-900/30 overflow-hidden">
          {/* Decorative top gradient */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>

          <div className="p-8 sm:p-10 text-center">
            {/* Success Icon */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping-slow"></div>
              <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Order Received
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              Your Daddy's Pizza order has been placed successfully.
              <br />
              We'll contact you shortly to confirm your order.
            </p>

            {/* Order ID */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 mb-8">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Order ID</span>
              <span className="text-white font-bold tracking-wider">#{orderId}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={onClose}
                className="group w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] flex items-center justify-center gap-2"
              >
                Continue Browsing
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={handleWhatsApp}
                className="group w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-500/40 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact on WhatsApp
              </button>
            </div>

            {/* Phone number */}
            <p className="text-gray-500 text-xs mt-6">
              We'll call you at <span className="text-gray-400">{customerPhone}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
