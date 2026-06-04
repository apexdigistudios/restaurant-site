import { useState } from 'react';
import type { MenuItem } from '../data/menuData';
import { useCart, PIZZA_EXTRAS, type PizzaSize, type CartExtra } from '../context/CartContext';

interface OrderModalProps {
  item: MenuItem;
  onClose: () => void;
  isPizza?: boolean;
}

export default function OrderModal({ item, onClose, isPizza = false }: OrderModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('medium');
  const [selectedExtras, setSelectedExtras] = useState<CartExtra[]>([]);
  const [added, setAdded] = useState(false);

  const basePrice = item.hasSizes && item.prices
    ? item.prices[selectedSize]
    : item.price || 0;

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = basePrice + extrasTotal;
  const total = unitPrice * quantity;

  const toggleExtra = (extra: CartExtra) => {
    setSelectedExtras(prev =>
      prev.some(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    addItem({
      menuId: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      basePrice,
      size: item.hasSizes ? selectedSize : undefined,
      sizeLabel: item.hasSizes ? selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1) : undefined,
      extras: selectedExtras,
      quantity,
    });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fadeIn"></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-white/10 shadow-2xl shadow-red-900/20 animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/80 hover:border-red-500/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/dc2626?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
          {item.tag && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/40">
                {item.tag}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{item.name}</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">{item.description}</p>

          {/* Size Selector (for pizzas) */}
          {item.hasSizes && item.prices && (
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3 block">
                Select Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['small', 'medium', 'large', 'family'] as PizzaSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative py-3 px-2 rounded-xl text-center transition-all duration-300 border ${
                      selectedSize === size
                        ? 'bg-gradient-to-b from-red-600/30 to-red-900/20 border-red-500/60 shadow-lg shadow-red-600/20'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`text-sm font-bold capitalize ${selectedSize === size ? 'text-white' : 'text-gray-300'}`}>
                      {size === 'family' ? 'XL' : size.charAt(0).toUpperCase()}
                    </div>
                    <div className={`text-[10px] mt-0.5 capitalize ${selectedSize === size ? 'text-red-400' : 'text-gray-500'}`}>
                      {size}
                    </div>
                    <div className={`text-xs mt-1 font-semibold ${selectedSize === size ? 'text-orange-400' : 'text-gray-400'}`}>
                      GH₵{item.prices![size]}
                    </div>
                    {selectedSize === size && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pizza Extras */}
          {isPizza && (
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3 block">
                Customize with Extras <span className="text-red-400 normal-case tracking-normal">(optional)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PIZZA_EXTRAS.map((extra) => {
                  const selected = selectedExtras.some(e => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      onClick={() => toggleExtra({ name: extra.name, price: extra.price })}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-300 border ${
                        selected
                          ? 'bg-gradient-to-r from-red-600/20 to-orange-500/10 border-red-500/50'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{extra.icon}</span>
                        <span className={`text-xs font-medium truncate ${selected ? 'text-white' : 'text-gray-300'}`}>
                          {extra.name}
                        </span>
                      </span>
                      <span className={`text-xs font-bold flex-shrink-0 ml-1 ${selected ? 'text-orange-400' : 'text-gray-500'}`}>
                        +{extra.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3 block">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white text-xl font-bold hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-200"
              >
                −
              </button>
              <span className="text-white text-2xl font-bold w-16 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white text-xl font-bold hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Base price</span>
              <span className="text-gray-300 font-medium">GH₵ {basePrice}</span>
            </div>
            {isPizza && selectedExtras.length > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Extras ({selectedExtras.length})</span>
                <span className="text-gray-300 font-medium">+ GH₵ {extrasTotal}</span>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Quantity</span>
              <span className="text-gray-300 font-medium">× {quantity}</span>
            </div>
            <div className="border-t border-white/10 pt-2 mt-2 flex items-center justify-between">
              <span className="text-white font-bold text-base">Total</span>
              <span className="text-orange-400 font-bold text-2xl">GH₵ {total}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:scale-[1.02]'
            }`}
          >
            {added ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Add to Cart — GH₵ {total}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
