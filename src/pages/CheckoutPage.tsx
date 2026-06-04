import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, FREE_DELIVERY_THRESHOLD } from '../context/CartContext';
import SuccessModal from '../components/SuccessModal';

type DeliveryMethod = 'delivery' | 'pickup' | 'drive-through';
type PaymentMethod = 'momo' | 'cash';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const [lastPhone, setLastPhone] = useState('');

  // Redirect to home if cart empty
  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      navigate('/', { replace: true });
    }
  }, [items.length, navigate, showSuccess]);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    deliveryMethod: 'delivery' as DeliveryMethod,
    paymentMethod: 'momo' as PaymentMethod,
    momoNumber: '',
    momoNetwork: 'MTN',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // If pickup or drive-through, no delivery fee
  const finalDeliveryFee =
    form.deliveryMethod === 'delivery' ? deliveryFee : 0;
  const finalTotal = subtotal + finalDeliveryFee;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[0-9+]{10,15}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid phone number';

    if (form.deliveryMethod === 'delivery') {
      if (!form.address.trim()) e.address = 'Delivery address is required';
      if (!form.landmark.trim()) e.landmark = 'Landmark helps our riders find you';
    }

    if (form.paymentMethod === 'momo' && !form.momoNumber.trim())
      e.momoNumber = 'MoMo number is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) {
      // scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      const orderId = 'DP' + Date.now().toString().slice(-8);
      setLastOrderId(orderId);
      setLastPhone(form.phone);
      clearCart();
      setShowSuccess(true);
    }, 1500);
  };

  const handleWhatsAppOrder = () => {
    const lines: string[] = [];
    lines.push(`*🍕 NEW ORDER — Daddy's Pizza Kasoa*`);
    lines.push('');
    lines.push(`*Customer:* ${form.fullName || '[Name]'}`);
    lines.push(`*Phone:* ${form.phone || '[Phone]'}`);
    lines.push(`*Method:* ${form.deliveryMethod.toUpperCase()}`);
    if (form.deliveryMethod === 'delivery') {
      lines.push(`*Address:* ${form.address || '[Address]'}`);
      lines.push(`*Landmark:* ${form.landmark || '[Landmark]'}`);
    }
    lines.push('');
    lines.push('*Order:*');
    items.forEach((i) => {
      const size = i.size ? ` (${i.sizeLabel})` : '';
      const extras = i.extras.length ? ` + ${i.extras.map(e => e.name).join(', ')}` : '';
      lines.push(`• ${i.quantity}× ${i.name}${size}${extras} — GH₵${(i.unitPrice * i.quantity).toFixed(2)}`);
    });
    lines.push('');
    lines.push(`*Subtotal:* GH₵${subtotal.toFixed(2)}`);
    lines.push(`*Delivery:* ${finalDeliveryFee === 0 ? 'FREE' : `GH₵${finalDeliveryFee.toFixed(2)}`}`);
    lines.push(`*TOTAL: GH₵${finalTotal.toFixed(2)}*`);

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/233200000000?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Menu
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Complete your order securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">1</span>
                Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Kwame Mensah"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${errors.fullName ? 'border-red-500/60' : 'border-white/10'} text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.06] transition-all duration-200`}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="0244 123 456"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${errors.phone ? 'border-red-500/60' : 'border-white/10'} text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.06] transition-all duration-200`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">
                    Delivery Address {form.deliveryMethod === 'delivery' ? '*' : '(optional)'}
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="Street name, house number"
                    disabled={form.deliveryMethod !== 'delivery'}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.06] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed`}
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">
                    Landmark {form.deliveryMethod === 'delivery' ? '*' : '(optional)'}
                  </label>
                  <input
                    id="landmark"
                    type="text"
                    value={form.landmark}
                    onChange={(e) => updateField('landmark', e.target.value)}
                    placeholder="Near the main market, etc."
                    disabled={form.deliveryMethod !== 'delivery'}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.06] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed`}
                  />
                  {errors.landmark && <p className="text-red-400 text-xs mt-1">{errors.landmark}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">2</span>
                Delivery Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'delivery', label: 'Delivery', desc: '30-45 min', icon: '🚚' },
                  { value: 'pickup', label: 'Pick-up', desc: '15-20 min', icon: '🛍️' },
                  { value: 'drive-through', label: 'Drive-through', desc: '10-15 min', icon: '🚗' },
                ].map((m) => {
                  const active = form.deliveryMethod === m.value;
                  return (
                    <button
                      key={m.value}
                      onClick={() => updateField('deliveryMethod', m.value)}
                      className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-br from-red-600/20 to-red-900/10 border-red-500/50 shadow-lg shadow-red-600/10'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{m.icon}</div>
                      <div className="text-white font-bold text-sm">{m.label}</div>
                      <div className={`text-xs mt-0.5 ${active ? 'text-red-300' : 'text-gray-500'}`}>
                        {m.desc}
                      </div>
                      {active && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {/* MTN MoMo - highlighted */}
                <button
                  onClick={() => updateField('paymentMethod', 'momo')}
                  className={`w-full relative p-5 rounded-xl border text-left transition-all duration-300 ${
                    form.paymentMethod === 'momo'
                      ? 'bg-gradient-to-br from-yellow-500/15 via-yellow-600/10 to-orange-500/5 border-yellow-400/60 shadow-lg shadow-yellow-500/10'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center font-black text-sm ${
                      form.paymentMethod === 'momo' ? 'bg-yellow-500 text-black' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      MTN
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-white font-bold text-base">MTN Mobile Money</h3>
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500 text-black text-[9px] font-black tracking-wider">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs">Fast, secure, instant confirmation</p>
                    </div>
                  </div>

                  {form.paymentMethod === 'momo' && (
                    <div className="mt-4 pt-4 border-t border-yellow-500/20 space-y-3">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">
                          MoMo Number *
                        </label>
                        <input
                          id="momoNumber"
                          type="tel"
                          value={form.momoNumber}
                          onChange={(e) => updateField('momoNumber', e.target.value)}
                          placeholder="0244 123 456"
                          className={`w-full px-4 py-3 rounded-xl bg-black/40 border ${errors.momoNumber ? 'border-red-500/60' : 'border-yellow-500/30'} text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/60 transition-all duration-200`}
                        />
                        {errors.momoNumber && <p className="text-red-400 text-xs mt-1">{errors.momoNumber}</p>}
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">Network</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['MTN', 'Vodafone', 'AirtelTigo'].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => updateField('momoNetwork', n)}
                              className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                form.momoNetwork === n
                                  ? 'bg-yellow-500/20 border-yellow-500/50 text-white'
                                  : 'bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {form.paymentMethod === 'momo' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={() => updateField('paymentMethod', 'cash')}
                  className={`w-full relative p-5 rounded-xl border text-left transition-all duration-300 ${
                    form.paymentMethod === 'cash'
                      ? 'bg-gradient-to-br from-green-500/10 to-green-900/5 border-green-500/40'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl ${
                      form.paymentMethod === 'cash' ? 'bg-green-500/20' : 'bg-white/[0.05]'
                    }`}>
                      💵
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">Cash on Delivery</h3>
                      <p className="text-gray-400 text-xs">Pay when your order arrives</p>
                    </div>
                  </div>
                  {form.paymentMethod === 'cash' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Order Summary (sticky) */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <h2 className="text-white font-bold text-lg mb-5">
                Order Summary ({itemCount})
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-white/[0.05]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/200x200/1a1a1a/dc2626?text=P`;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm line-clamp-1">{item.name}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">
                        {item.size && <span>{item.sizeLabel}</span>}
                        {item.extras.length > 0 && <span> + {item.extras.length} extras</span>}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-400 text-xs">Qty: {item.quantity}</span>
                        <span className="text-orange-400 font-bold text-sm">
                          GH₵ {(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Delivery</span>
                  <span className={finalDeliveryFee === 0 ? 'text-green-400 font-semibold' : ''}>
                    {finalDeliveryFee === 0 ? 'FREE' : `GH₵ ${finalDeliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {subtotal >= FREE_DELIVERY_THRESHOLD && form.deliveryMethod === 'delivery' && (
                  <div className="text-xs text-green-400">✓ Free delivery unlocked</div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-orange-400 font-bold text-2xl">GH₵ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="group w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* WhatsApp Order */}
              <button
                onClick={handleWhatsAppOrder}
                className="group w-full mt-3 py-3.5 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-500/40 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Order via WhatsApp
              </button>

              <p className="text-gray-500 text-[11px] mt-4 text-center leading-relaxed">
                🔒 Secure checkout · Your details are protected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); navigate('/'); }}
        orderId={lastOrderId}
        customerPhone={lastPhone}
      />
    </div>
  );
}
