import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { MenuItem } from '../data/menuData';
import OrderModal from '../components/OrderModal';

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Product Card (standard) ── */
function ProductCard({ item, onOrder, delay }: { item: MenuItem; onOrder: () => void; delay: number }) {
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden transition-all duration-700 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.12)] hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col sm:flex-row">
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
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-w-0">
          <div>
            <h4 className="text-white font-bold text-lg sm:text-xl mb-1.5 group-hover:text-orange-300 transition-colors duration-300 line-clamp-1">
              {item.name}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{item.description}</p>
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
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pizza Card (enhanced) ── */
function PizzaCard({ item, onOrder, delay }: { item: MenuItem; onOrder: () => void; delay: number }) {
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-950/20 via-white/[0.03] to-transparent overflow-hidden transition-all duration-700 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.18)] hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col md:flex-row">
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
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-0.5">{size}</div>
                    <div className="text-white font-bold text-sm sm:text-base">GH₵ {item.prices![size]}</div>
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
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Category Page ── */
export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories } = useApp();
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const category = categoryId ? categories.find((c) => c.id === categoryId) : undefined;
  const isPizza = categoryId === 'pizzas';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (modalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalItem]);

  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-8">The menu category you are looking for does not exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm hover:from-red-500 hover:to-red-600 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg shadow-red-900/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm-5 3c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
                  <path d="M12 2L2 7l10 15 10-15L12 2z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Daddy's Pizza
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)]"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative h-[50vh] sm:h-[55vh] min-h-[320px] overflow-hidden">
        <img
          src={category.teaserImage}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/1200x600/1a1a1a/dc2626?text=${encodeURIComponent(category.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 px-4">
          <div className="text-center">
            <span className="text-5xl sm:text-6xl mb-4 block">{category.icon}</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
              {category.name}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto">
              {category.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-orange-400 font-bold">{category.items.length}</span>
              <span className="text-gray-300 text-sm">delicious items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-red-400 font-medium">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <div className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {category.items.length} Items
              </h2>
              <div className={`h-[2px] w-16 rounded-full bg-gradient-to-r ${category.accent}`}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {category.items.map((item, i) =>
              isPizza ? (
                <PizzaCard key={item.id} item={item} onOrder={() => setModalItem(item)} delay={i * 80} />
              ) : (
                <ProductCard key={item.id} item={item} onOrder={() => setModalItem(item)} delay={i * 80} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Other Categories */}
      <div className="border-t border-white/5 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories
              .filter((c) => c.id !== categoryId)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/menu/${c.id}`}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-red-500/30 hover:bg-red-950/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-gray-300 text-xs font-medium text-center group-hover:text-white transition-colors">
                    {c.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {modalItem && <OrderModal item={modalItem} onClose={() => setModalItem(null)} isPizza={isPizza} />}
    </div>
  );
}
