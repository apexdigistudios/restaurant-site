import { useState, useEffect, useRef, useCallback } from 'react';
import { menuData } from '../data/menuData';
import type { MenuItem } from '../data/menuData';
import OrderModal from './OrderModal';

/* ────────────────── Scroll-reveal hook ────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ────────────────── Product Card ────────────────── */
function ProductCard({ item, onOrder, delay }: { item: MenuItem; onOrder: () => void; delay: number }) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden transition-all duration-700 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-44 md:w-52 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x300/1a1a1a/dc2626?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950/30 hidden sm:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent sm:hidden"></div>

          {item.tag && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30">
                {item.tag}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-w-0">
          <div>
            <h4 className="text-white font-bold text-lg sm:text-xl mb-1.5 group-hover:text-orange-300 transition-colors duration-300 line-clamp-1">
              {item.name}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {item.description}
            </p>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              {item.hasSizes && item.prices ? (
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium block mb-0.5">from</span>
                  <span className="text-orange-400 font-extrabold text-xl sm:text-2xl">GH₵ {item.prices.small}</span>
                </div>
              ) : (
                <span className="text-orange-400 font-extrabold text-xl sm:text-2xl">GH₵ {item.price}</span>
              )}
            </div>
            <button
              onClick={onOrder}
              className="flex-shrink-0 group/btn relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2"
            >
              <span>Order Now</span>
              <svg
                className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-xl animate-ping-slow bg-red-600/20 pointer-events-none opacity-0 group-hover:opacity-100"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── Pizza Card (special) ────────────────── */
function PizzaCard({ item, onOrder, delay }: { item: MenuItem; onOrder: () => void; delay: number }) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-950/20 via-white/[0.03] to-transparent overflow-hidden transition-all duration-700 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x300/1a1a1a/dc2626?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950/30 hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent md:hidden"></div>

          {item.tag && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30">
                {item.tag}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-white font-bold text-xl sm:text-2xl mb-2 group-hover:text-orange-300 transition-colors duration-300">
              {item.name}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{item.description}</p>
          </div>

          {/* Size Pricing Table */}
          {item.hasSizes && item.prices && (
            <div className="mb-5">
              <div className="grid grid-cols-4 gap-2">
                {(['small', 'medium', 'large', 'family'] as const).map((size) => (
                  <div
                    key={size}
                    className="text-center py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-red-500/40 hover:bg-red-950/20 transition-all duration-300"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-0.5">
                      {size}
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">
                      GH₵ {item.prices![size]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onOrder}
            className="group/btn relative w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2"
          >
            <span>Order Now</span>
            <svg
              className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── Category Section ────────────────── */
function CategorySection({ category, onOrderItem }: {
  category: typeof menuData[number];
  onOrderItem: (item: MenuItem) => void;
}) {
  const { ref, visible } = useReveal(0.08);
  const isPizza = category.id === 'pizzas';

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow for pizza */}
      {isPizza && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/[0.06] rounded-full blur-[100px] pointer-events-none"></div>
      )}

      <div
        className={`transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-3xl sm:text-4xl">{category.icon}</span>
          <h3 className={`font-bold text-white ${isPizza ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
            {category.name}
          </h3>
        </div>
        <div className={`h-[2px] mb-2 rounded-full bg-gradient-to-r ${category.accent} opacity-60 ${isPizza ? 'w-40' : 'w-28'}`}></div>
        <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-xl">{category.description}</p>

        {/* Products */}
        <div className={isPizza ? 'grid grid-cols-1 gap-5' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
          {category.items.map((item, i) =>
            isPizza ? (
              <PizzaCard key={item.id} item={item} onOrder={() => onOrderItem(item)} delay={i * 80} />
            ) : (
              <ProductCard key={item.id} item={item} onOrder={() => onOrderItem(item)} delay={i * 80} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────── Main Menu Section ────────────────── */
export default function MenuSection() {
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lockScroll = useCallback(() => { document.body.style.overflow = 'hidden'; }, []);
  const unlockScroll = useCallback(() => { document.body.style.overflow = ''; }, []);

  const openModal = (item: MenuItem) => { setModalItem(item); lockScroll(); };
  const closeModal = () => { setModalItem(null); unlockScroll(); };

  return (
    <section id="menu" className="relative bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top fade connecting to hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>

      {/* Ambient glows */}
      <div className="absolute top-[10%] -left-40 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[50%] -right-40 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-1/3 w-[300px] h-[300px] bg-red-700/[0.03] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 text-xs font-semibold tracking-[3px] uppercase">Daddy's Menu</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Explore Our
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Menu
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
            Browse Daddy's Pizza favorites and order instantly.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-600/60"></div>
            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-600/60"></div>
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-24 sm:space-y-32">
          {menuData.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onOrderItem={openModal}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/30 via-gray-900/50 to-orange-950/30 border border-red-500/15 backdrop-blur-sm">
            <div className="text-left">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                Ready to order?
              </h3>
              <p className="text-gray-400 text-sm">
                Call us or order online for fast delivery in Kasoa
              </p>
            </div>
            <a
              href="tel:+233200000000"
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call to Order
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {modalItem && <OrderModal item={modalItem} onClose={closeModal} />}
    </section>
  );
}
