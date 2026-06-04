import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FREE_DELIVERY_THRESHOLD } from '../context/CartContext';

export default function CartPanel() {
  const {
    items, isCartOpen, closeCart,
    removeItem, updateQuantity,
    itemCount, subtotal, deliveryFee, total, clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[110]" onClick={closeCart}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"></div>

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-gradient-to-b from-gray-950 via-gray-950 to-black border-l border-red-500/10 shadow-2xl shadow-red-900/20 flex flex-col animate-slideInRight"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div>
            <h2 className="text-white font-bold text-xl">Your Cart</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {itemCount === 0 ? 'Empty' : `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/80 hover:border-red-500/50 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-4xl mb-4">
                🛒
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">
                Browse our delicious menu and add your favorites to cart
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-red-500/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/[0.05]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x200/1a1a1a/dc2626?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-white font-bold text-sm line-clamp-1 flex-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors duration-200 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                        </svg>
                      </button>
                    </div>

                    {/* Size + Extras */}
                    <div className="text-[11px] text-gray-500 mb-2 line-clamp-2">
                      {item.size && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white/[0.05] mr-1">
                          {item.sizeLabel}
                        </span>
                      )}
                      {item.extras.map((ex) => (
                        <span key={ex.name} className="inline-flex items-center px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 mr-1 mt-0.5">
                          + {ex.name}
                        </span>
                      ))}
                    </div>

                    {/* Qty + Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:bg-red-600/30 hover:border-red-500/40 hover:text-white transition-all duration-200 text-sm font-bold"
                        >
                          −
                        </button>
                        <span className="text-white font-bold text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:bg-red-600/30 hover:border-red-500/40 hover:text-white transition-all duration-200 text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-orange-400 font-bold text-sm">
                        GH₵ {(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full text-xs text-gray-500 hover:text-red-400 transition-colors duration-200 py-2"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/5 p-5 bg-black/40">
            {/* Free delivery progress */}
            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1.5">
                  Add <span className="text-orange-400 font-bold">GH₵ {(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)}</span> more for <span className="text-green-400 font-bold">FREE delivery</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
            {subtotal >= FREE_DELIVERY_THRESHOLD && (
              <div className="mb-4 flex items-center gap-2 text-xs text-green-400 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                You've unlocked FREE delivery!
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1.5 mb-4 text-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span>Subtotal</span>
                <span>GH₵ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-green-400 font-semibold' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `GH₵ ${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-orange-400 text-xl">GH₵ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={closeCart}
              className="group w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
